import { makeCoord, StateMachine } from '../structs';
import { Looper, LooperData } from '../runner';

/**
 * Looper that runs the engine
 */
 export abstract class BaseRenderer implements Looper {
	lastFrameTime = 0;
	lastTickTime = 0;
	baseSpeed: number = 1;
	speedMultiplier: number = 1;
	stateMachine: StateMachine<unknown, LooperData>;

	isPaused: boolean;

	startLoop(stateMachine: StateMachine<unknown, LooperData>) {
		this.stateMachine = stateMachine;
		this.lastFrameTime = this.lastTickTime = performance.now();
		this.loop(performance.now());
	}

	pause(ms: number) {
		this.isPaused = true;
		setTimeout(() => {
			this.isPaused = false;
		}, ms);
	}

	private loop(time: number) {
		this.lastFrameTime = time;

		// for a lower speed, not every loop will make a tick
		// for a higher speed, every loop can make more ticks
		// these magic numbers (0.1 and 16) are there for the correction of the base speed
		const iterations = Math.min(Math.floor(this.baseSpeed * this.speedMultiplier 
			* 0.1 * (this.lastFrameTime - this.lastTickTime) / 16), 10);

		if(iterations > 0) {
			let data: LooperData = null;
			for (let i = 0; i < iterations; i++) {
				const now = performance.now();
				// pause has to be here. Otherwise the timer would then render 1000x iterations at once 
				if(!this.isPaused) {
					data = this.stateMachine.run();
				}
				if((performance.now() - now) > 20) {
					// too slow.. do not continue with other iterations
					break;
				}
				this.lastTickTime = this.lastFrameTime;
			}
			// render only last data
			this.renderData(data);
		}
			

		requestAnimationFrame((time) => this.loop(time));
	}

	protected abstract renderData(data: LooperData);
}

export class CanvasRenderer extends BaseRenderer {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		super();
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	}

	protected renderData(data?: LooperData) {
		
		if (!data) {
			return;
		}

		const displayDetails = data.map.width <= 20 && data.map.height <= 20;

		const blockSize = this.canvas.width / data.map.width;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let cityIndexCnt = 0;
		// go from left to right, from top to bottom
		for (let j = 0; j < data.map.height; j++) {
			for (let i = 0; i < data.map.width; i++) {
				const coord = makeCoord(i, j);
				const tile = data.map.getTile(coord);
				switch (tile?.type) {
					case 'UNKNOWN':
						this.ctx.fillStyle = '#00000066';
						break;
					case 'ROAD':
						this.ctx.fillStyle = '#22992266';
						break;
					case 'WALL':
						this.ctx.fillStyle = '#55555566';
						break;
					case 'CITY':
						this.ctx.fillStyle = '#fafc4888';
						break;
					default:
						// if undefined, it's treated like unknown
						this.ctx.fillStyle = '#00000066';
						break;
				}

				// render cell
				this.ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);

				// render coordinates (only for small maps)
				if (displayDetails) {
					this.ctx.font = `${blockSize * 0.25}px courier new`;
					this.ctx.fillStyle = '#FFFFFF55';
					this.ctx.fillText(`[${i},${j}]`, i * blockSize + blockSize * 0.10 - ((i >= 10 || j >= 10) ? blockSize * 0.1 : 0), j * blockSize + blockSize * 0.55);
				}

				// render city number
				if(displayDetails && tile?.type === 'CITY') {
					this.ctx.font = `${blockSize * 0.25}px courier new`;
					this.ctx.fillStyle = '#f2ecc3';
					this.ctx.fillText(`${cityIndexCnt + 1}`, 
						i * blockSize + blockSize * 0.40, j * blockSize + blockSize * 0.25);
					cityIndexCnt++;
				}
			}
		}
		
		// current node is a circle 
		if(data.currentNode) {
			this.ctx.fillStyle = '#FFFFFF';
			this.ctx.beginPath();
			this.ctx.arc(data.currentNode.x * blockSize + blockSize / 2, 
				data.currentNode.y * blockSize + blockSize / 2, blockSize / 6, 0, 2 * Math.PI);
			this.ctx.fill(); 
		}

		// context nodes are somewhat interesting nodes that should be highlighted
		if(data.contextNodes) {
			this.ctx.fillStyle = '#EFEFEF';
			for(let highlight of data.contextNodes) {
				this.ctx.fillRect(highlight.x * blockSize, highlight.y * blockSize, blockSize - 1, blockSize - 1);
			}
		}

		if (displayDetails && data.backtrace) {
			this.ctx.fillStyle = '#FFFF00';
			this.ctx.font = `${blockSize * 0.5}px courier new`;
			for (let index of data.backtrace.keys()) {
				const fromCoord = data.map.indexToCoord(index);
				const toCoord = data.map.indexToCoord(data.backtrace.get(index));

				const isLeft = toCoord.x === fromCoord.x - 1;
				const isRight = toCoord.x === fromCoord.x + 1;
				const isTop = toCoord.y === fromCoord.y - 1;
				const isBottom = toCoord.y === fromCoord.y + 1;
				const symbol = isLeft ? '←' : isRight ? '→' : isTop ? '↑' : isBottom ? '↓' : '';
				this.ctx.fillText(symbol, fromCoord.x * blockSize + blockSize * 0.35, fromCoord.y * blockSize + blockSize * 0.85);
			}
		}

		if (data.milestones) {
			this.ctx.fillStyle = '#ADADAD';
			for (let milestone of data.milestones) {
				this.ctx.fillRect(milestone.x * blockSize, milestone.y * blockSize, blockSize * 0.15, blockSize * 0.15);
			}
		}
	}
}