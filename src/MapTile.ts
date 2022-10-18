import { Coord } from './Coord';
import { Neighbor } from './MapGrid';

export type TileType = 'UNKNOWN' | 'ROAD' | 'WALL' | 'CITY';

/**
 * Structure for map tiles, keeping references to all neighbours
 */
export class MapTile {
	neighbors: Record<Neighbor, MapTile>;
	neighborsArr: MapTile[];
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