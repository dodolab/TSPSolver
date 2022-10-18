import { MapGrid } from '../structs/map-grid';
import { Coord, makeCoord } from '../structs/coord';
import { StateMachine } from '../structs/state-machine';

export type CanvasRendererData = {
	map: MapGrid;
	highlights?: Coord[];
	currentNode?: Coord;
	backtrace?: Map<number, number>;
	milestones?: Coord[];
}

export class CanvasRenderer<Context> {
	lastFrameTime = 0;
	lastTickTime = 0;
	time = 0;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	speed: number = 0.5;

	stateMachine: StateMachine<Context, CanvasRendererData>;
	context: Context;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	}

	start(stateMachine: StateMachine<Context, CanvasRendererData>, context: Context) {
		this.stateMachine = stateMachine;
		this.context = context;
		this.loop(performance.now());
	}


	private loop(time: number) {
		const delta = (time - this.lastFrameTime);
		this.lastFrameTime = time;
		this.time += delta;

		// for a lower speed, not each loop will make a tick
		// for a higher speed, each loop can make more ticks
		const iterations = Math.floor(this.speed * (this.lastFrameTime - this.lastTickTime) / 16);

		if(iterations > 0) {
			let data = null;
			for (let i = 0; i < iterations; i++) {
				data = this.stateMachine.run(this.context);
				this.lastTickTime = this.lastFrameTime;
			}
			// render only last data
			this.renderData(data);
		}
			

		requestAnimationFrame((time) => this.loop(time));
	}

	private renderData(data?: CanvasRendererData) {
		if (!data) {
			return;
		}

		const blockSize = this.canvas.width / data.map.width;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0; i < data.map.width; i++) {
			for (let j = 0; j < data.map.height; j++) {
				const coord = makeCoord(i, j);
				const tile = data.map.getTile(coord);
				switch (tile?.type) {
					case 'UNKNOWN':
						this.ctx.fillStyle = '#11111155';
						break;
					case 'ROAD':
						this.ctx.fillStyle = '#22992255';
						break;
					case 'WALL':
						this.ctx.fillStyle = '#55555555';
						break;
					case 'CITY':
						this.ctx.fillStyle = '#CDCD4466';
						break;
					default:
						// if undefined, it's treated like unknown
						this.ctx.fillStyle = '#11111155';
						break;
				}

				this.ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);

				if (data.map.width < 30) {
					this.ctx.font = `${blockSize * 0.25}px courier new`;
					this.ctx.fillStyle = '#FFFFFF55';
					this.ctx.fillText(`[${i},${j}]`, i * blockSize + blockSize * 0.10, j * blockSize + blockSize * 0.55);
				}
			}
		}
		
		if(data.currentNode) {
			this.ctx.fillStyle = '#EFEFEF';
			this.ctx.fillRect(data.currentNode.x * blockSize, data.currentNode.y * blockSize, blockSize - 1, blockSize - 1);
		}

		if(data.highlights) {
			this.ctx.fillStyle = '#0000FFAA';
			for(let highlight of data.highlights) {
				this.ctx.fillRect(highlight.x * blockSize, highlight.y * blockSize, blockSize - 1, blockSize - 1);
			}
		}

		if (data.backtrace) {
			for (let index of data.backtrace.keys()) {
				const fromCoord = data.map.indexToCoord(index);
				const toCoord = data.map.indexToCoord(data.backtrace.get(index));

				const isLeft = toCoord.x === fromCoord.x - 1;
				const isRight = toCoord.x === fromCoord.x + 1;
				const isTop = toCoord.y === fromCoord.y - 1;
				const isBottom = toCoord.y === fromCoord.y + 1;
				this.ctx.fillStyle = '#FFFF00';
				const symbol = isLeft ? '←' : isRight ? '→' : isTop ? '↑' : '↓';
				this.ctx.font = `${blockSize * 0.5}px courier new`;
				this.ctx.fillText(symbol, fromCoord.x * blockSize + blockSize * 0.35, fromCoord.y * blockSize + blockSize * 0.85);
			}
		}

		if (data.milestones) {
			for (let milestone of data.milestones) {
				this.ctx.fillStyle = '#ADADAD';
				this.ctx.fillRect(milestone.x * blockSize, milestone.y * blockSize, blockSize * 0.15, blockSize * 0.15);
			}
		}
	}
}