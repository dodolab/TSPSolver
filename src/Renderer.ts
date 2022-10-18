import { MapGrid } from './MapGrid';
import { Coord, makeCoord, coordEq } from './Coord';

export type RendererData = {
	map: MapGrid;
	highlights: Coord[];
	backtrace?: Map<number, number>;
	milestones?: Coord[];
}

export default class Renderer {
	lastFrameTime = 0;
	lastTickTime = 0;
	time = 0;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	speed: number = 0.5;
	tickHandler: () => RendererData;

	init(canvas: HTMLCanvasElement, tickHandler: () => RendererData) {
		this.canvas = canvas;
		this.tickHandler = tickHandler;
		this.ctx = canvas.getContext('2d');
		this.loop(performance.now());
	}


	private loop(time: number) {
		const delta = (time - this.lastFrameTime);
		this.lastFrameTime = time;
		this.time += delta;

		// for a lower speed, not each loop will make a tick
		// for a higher speed, each loop can make more ticks
		const iterations = Math.floor(this.speed * (this.lastFrameTime - this.lastTickTime) / 16);

		for (let i = 0; i < iterations; i++) {
			const data = this.tickHandler();
			this.renderData(data);
			this.lastTickTime = this.lastFrameTime;
		}

		requestAnimationFrame((time) => this.loop(time));
	}

	private renderData(data: RendererData) {
		if (!data) {
			return;
		}

		const blockSize = this.canvas.width / data.map.width;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0; i < data.map.width; i++) {
			for (let j = 0; j < data.map.height; j++) {
				const coord = makeCoord(i, j);
				const tile = data.map.getTile(coord);
				switch (tile.type) {
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
						this.ctx.fillStyle = '#CD444455';
						break;
				}

				this.ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);

				if (data.map.width < 30) {
					this.ctx.font = `${blockSize * 0.25}px courier new`;
					this.ctx.fillStyle = '#FFFFFF';
					this.ctx.fillText(`[${i},${j}]`, i * blockSize + blockSize * 0.10, j * blockSize + blockSize * 0.55);
				}
			}
		}
		
		if(data.highlights) {
			this.ctx.fillStyle = '#EFEFEF';
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