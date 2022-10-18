import { Coord } from './Coord';
import { MapGrid } from './MapGrid';

export const loadMapFromString = (arr: string[], width: number, height: number) => {
	const map = new MapGrid(width, height);

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			// repeat pattern from the map above
			switch (arr[(i * width) + j]) {
				case '.':
					map.setTile(new Coord(j, i), 'ROAD');
					break;
				case 'x':
					map.setTile(new Coord(j, i), 'WALL');
					break;
				case 'o':
					map.setTile(new Coord(j, i), 'CITY');
					break;
				default:
					throw new Error('Unknown map tile');
			}
		}
	}
	map.generateNeighbors();
	return map;
};