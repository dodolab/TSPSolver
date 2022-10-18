import { CanvasRenderer } from './canvas-renderer';
import { Runner, Looper, StateName } from '../runner';

/**
 * Context for input parameters
 */
type InputContext = {
	mapWidth: number,
	mapHeight: number,
	randomSeed: number,
	startCity: number,
	visualSpeed: number,
	citiesDensity: number,
	wallsDensity: number
}

/**
 * UI Renderer, starts the TSP engine and displays info messages
 */
export class UIRenderer {
	canvas: HTMLCanvasElement;
	mapWidth = 10; // 10x10 is the default setting for canvas sizing
	mapHeight = 10;

	// engine looper (canvas renderer)
	looper: Looper;
	// engine runner
	runner: Runner;

	init() {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.looper = new CanvasRenderer(this.canvas);
		this.initHandlers();
	}

	private initHandlers() {
		const button = document.getElementById('confirmBut') as HTMLButtonElement;
		const visualSpeedEl = document.getElementById('visualSpeed') as HTMLInputElement;

		button.addEventListener('click', () => {
			this.validateAndRun();
		});

		// we can change the speed even when the engine has already started
		visualSpeedEl.addEventListener('change', () => {
			if(this.looper) {
				this.looper.baseSpeed = parseInt(visualSpeedEl.value);
			}
		});

		this.resizeHandler();
		window.addEventListener('resize', this.resizeHandler.bind(this));
	}

	private validateAndRun() {
		const mapWidthEl = document.getElementById('mapWidth') as HTMLInputElement;
		const mapHeightEl = document.getElementById('mapHeight') as HTMLInputElement;
		const randomSeedEl = document.getElementById('seed') as HTMLInputElement;
		const startCityEl = document.getElementById('startCity') as HTMLInputElement;
		const visualSpeedEl = document.getElementById('visualSpeed') as HTMLInputElement;
		const citiesDensityEl = document.getElementById('citiesDensity') as HTMLInputElement;
		const wallsDensityEl = document.getElementById('wallsDensity') as HTMLInputElement;

		let messages = [];
		const regex=/^[0-9]+$/;
		
		// phase 1: type check
		if(!mapWidthEl.value.match(regex)) {
			messages.push('Invalid map width. Only integers are allowed');
		}
		if(!mapHeightEl.value.match(regex)) {
			messages.push('Invalid map height. Only integers are allowed');
		}
		if(!randomSeedEl.value.match(regex)) {
			messages.push('Invalid seed. Only integers are allowed');
		}
		if(!startCityEl.value.match(regex)) {
			messages.push('Invalid starting city. Only integers are allowed');
		}

		if (messages.length !== 0) {
			this.displayError(messages.join('<br>'));
		} else {
			// phase 2: value check
			const mapWidth = parseInt(mapWidthEl.value);
			const mapHeight = parseInt(mapHeightEl.value);
			const randomSeed = parseInt(randomSeedEl.value);
			const startCity = parseInt(startCityEl.value);
			const visualSpeed = parseInt(visualSpeedEl.value);
			const citiesDensity = parseInt(citiesDensityEl.value);
			const wallsDensity = parseInt(wallsDensityEl.value);
	
			if (isNaN(mapWidth) || mapWidth < 2 || mapWidth > 100 || isNaN(mapHeight) 
			|| mapHeight < 2 || mapHeight > 100) {
				messages.push('Invalid map size. The allowed range is 2x2 to 100x100');
			}
			if (isNaN(randomSeed) || randomSeed <= 0) {
				messages.push('Invalid random seed. The value should be greater than 0');
			}
			if (isNaN(startCity) || startCity <= 0) {
				messages.push('Invalid starting city number. The value should be greater than 0');
			}
		
			if (messages.length !== 0) {
				this.displayError(messages.join('<br>'));
			} else {
				this.displayError('');

				this.start({
					mapWidth, mapHeight, randomSeed, startCity, visualSpeed, citiesDensity, wallsDensity
				})
			}
		}
	}

	private start(ctx: InputContext) {
		this.mapWidth = ctx.mapWidth;
		this.mapHeight = ctx.mapHeight;

		// for full density, 10x10 map will get ~20 cities and ~60 walls
		const citiesNum = Math.min(ctx.citiesDensity * 2, 22); // 22 is a maximum that doesn't consume too much memory
		const wallsNum = ctx.wallsDensity === 1 ? 0 : Math.ceil((this.mapWidth * this.mapHeight) * (ctx.wallsDensity / 10) * 0.6);

		this.looper.baseSpeed = ctx.visualSpeed;

		this.runner = new Runner();
		this.runner.stateMachine.addOnStateChangeObserver((previous, next) => this.onStateChange(previous, next));
		this.runner.start(
			{
				mapWidth: ctx.mapWidth,
				mapHeight: ctx.mapHeight,
				randomSeed: ctx.randomSeed,
				startCityIndex: ctx.startCity - 1, // 1st index is 0
				visualSpeed: ctx.visualSpeed,
				looper: this.looper,
				citiesNum,
				wallsNum,
			});

	}

	private onStateChange(previous: string, next: string) {
		const context = this.runner.context;
		// magic.. the bigger the map, the faster the visualization
		const sizeMultiplier = Math.ceil(Math.sqrt(context.mapWidth * context.mapHeight) / 10);
		// each section is solved at a different pace -> we need to adjust the speed multiplier for better experience
		switch(next as StateName) {
			case 'GENERATE':
				this.looper.speedMultiplier = sizeMultiplier;
				this.displayInfo('Generating map...');
				break;
			case 'EXPLORE':
				this.looper.speedMultiplier = sizeMultiplier;
				this.displayInfo('Exploring map...');
				break;
			case 'SEARCH_BACK':
				this.looper.speedMultiplier = sizeMultiplier;
				this.displayInfo('Searching for the shortest path back.');
				break;
			case 'WALK_BACK':
				this.looper.speedMultiplier = sizeMultiplier / 4;
				this.displayInfo(`Going back to [${context.startCityCoord.x}, ${context.startCityCoord.y}]`);
				break;
			case 'TSP_PREPARE':
				this.looper.speedMultiplier = sizeMultiplier / 10;
				this.displayInfo('Generating min spanning tree for TSP');
				break;
			case 'TSP_SOLVE':
				// this is so slow that it can't be sped up
				this.looper.speedMultiplier = 10;
				this.watchTSPStatus();
				break;
			case 'TSP_WALK':
				this.looper.speedMultiplier = 0.5;
				// transform indices to numbers (the first city is #1, but the index is 0)
				this.displayInfo(`Complete! Min tour cost: ${context.completeTourCost}; <br>Indices: ${context.completeTourIndices.map(i => i + 1).join(', ')}`);
				break;
		}

		// pause game for 1s
		this.looper.pause(1000);
	}

	private watchTSPStatus() {
		// a little bit lame, as TSP is the only state where we want to report the progress
		// for all other states, we can do fine with the onStateChange observer
		let interval = setInterval(() => {
			if((this.runner.stateMachine.currentState.name as StateName) === 'TSP_SOLVE') {
				const { context } = this.runner;
				// it starts from the 3rd city
				const progress = Math.floor(((context.tspCurrentCityIndex - 2) / (context.citiesNum - 2)) * 100);
				this.displayInfo(`Solving TSP ${progress}%`);
			} else {
				clearInterval(interval);
			}

		}, 250);
	}

	private resizeHandler = () => {
		if (window.innerWidth > window.innerHeight) {
			this.canvas.height = window.innerHeight - 4; // not sure why, but 100% makes overflow
			this.canvas.width = this.canvas.height * (this.mapHeight / this.mapWidth);
		} else {
			this.canvas.width = window.innerWidth * 0.95; // the same... weird
			this.canvas.height = this.canvas.width * (this.mapHeight / this.mapWidth);
		}
	}

	private displayError(msg: string) {
		document.getElementsByClassName('errorMsg')[0].innerHTML = msg;
	}

	private displayInfo(msg: string) {
		document.getElementsByClassName('infoMsg')[0].innerHTML = msg;
	}

}