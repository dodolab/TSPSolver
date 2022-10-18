import { Coord } from './Coord';
import { MapTile, TileType } from './MapTile';

export type Neighbor = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';


export class MapGrid {
	mapArray: MapTile[] = [];
	width: number;
	height: number;
    neighborsGenerated = false;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
		
	coordToIndex = (coord: Coord): number => {
		const { x, y } = coord;
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return -1;
		}
		return y * this.width + x;
	}

	indexToCoord = (x: number): Coord => {
		return new Coord(x % this.width, Math.floor(x / this.width));
	}

	isInside = (coord: Coord) => {
		return coord.x >= 0 && coord.y >= 0 && coord.x < this.width && coord.y < this.height;
	}

	setTile(coord: Coord, type: TileType) {
		this.mapArray[this.coordToIndex(coord)] = new MapTile(coord, type);
	}

	getTile(coord: Coord) {
		if(!this.isInside(coord)) {
			return null;
		}
		return this.mapArray[this.coordToIndex(coord)];
	}

	generateNeighbors() {
		for(let tile of this.mapArray) {
			// tile will contain links to all neighbors
			tile.neighbors = {
				left: this.getTile(tile.coord.left()),
				right: this.getTile(tile.coord.right()),
				top: this.getTile(tile.coord.top()),
				bottom: this.getTile(tile.coord.bottom()),
				topLeft: this.getTile(tile.coord.topLeft()),
				topRight: this.getTile(tile.coord.topRight()),
				bottomLeft: this.getTile(tile.coord.bottomLeft()),
				bottomRight: this.getTile(tile.coord.bottomRight()),
			}
			// this order is very important!!!
			tile.directionalNeighbors = [tile.neighbors.top, tile.neighbors.right, tile.neighbors.bottom, tile.neighbors.left]
		}
        this.neighborsGenerated = true;
	}

	print = () => {
		let otp = "";
		this.mapArray.forEach((val, index) => {
			switch(val.type) {
				case 'CITY':
					otp += 'o';
				break;
				case 'WALL':
					otp += 'x';
				break;
				case 'ROAD':
					otp += '.';
				break;
				case 'UNKNOWN':
					otp += '?';
				break;
			}
			if (index !== 0 && ((index + 1) % this.width) === 0) {
				otp += '\n';
			}
		});
		console.log(otp);
	}
}