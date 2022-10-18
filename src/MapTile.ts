import { Coord } from './Coord';
import { Neighbor } from './MapGrid';

export type TileType = 'UNKNOWN' | 'ROAD' | 'WALL' | 'CITY';

export class MapTile {
	neighbors: Record<Neighbor, MapTile>;
	// directional neighbors in an array. Can be null if there is no such neighbour!
	directionalNeighbors: [MapTile, MapTile, MapTile, MapTile];
	coord: Coord;
	type: TileType;

	constructor(coord: Coord, type: TileType) {
		this.coord = coord;
		this.type = type;
	}

	get isWalkable() {
		return this.type === 'ROAD' || this.type === 'CITY';
	}
}