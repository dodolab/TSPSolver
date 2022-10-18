import { MapGrid, makeCoord } from './structs';

export const loadMapFromString = (arr: string[], width: number, height: number) => {
	const map = new MapGrid(width, height);

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			// repeat pattern from the map above
			switch (arr[(i * width) + j]) {
				case '.':
					map.setTile(makeCoord(j, i), 'ROAD');
					break;
				case 'x':
					map.setTile(makeCoord(j, i), 'WALL');
					break;
				case 'o':
					map.setTile(makeCoord(j, i), 'CITY');
					break;
				default:
					throw new Error('Unknown map tile');
			}
		}
	}
	map.generateNeighbors();
	return map;
};

export const generateDefaultMap = (width: number, height: number) => {

	// if the width or height > 10, the pattern below will repeat
	let arr = [
		'.', 'o', '.', '.', 'o', 'x', '.', 'o', 'x', 'x',
		'.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.',
		'.', 'x', 'x', '.', 'x', '.', '.', '.', '.', '.',
		'o', '.', 'x', 'x', '.', 'x', '.', '.', '.', '.',
		'.', '.', '.', 'x', 'o', '.', 'x', '.', '.', 'o',
		'.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.',
		'.', '.', 'o', 'x', 'x', '.', '.', 'x', '.', '.',
		'.', '.', '.', '.', 'x', '.', 'x', 'x', '.', '.',
		'.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
		'o', '.', '.', '.', 'x', '.', 'x', 'o', '.', '.',
	];

	const map = new MapGrid(width, height);

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			// repeat pattern from the map above
			switch (arr[(10 * (i % 10)) + j % 10]) {
				case '.':
					map.setTile(makeCoord(j, i), 'ROAD');
					break;
				case 'x':
					map.setTile(makeCoord(j, i), 'WALL');
					break;
				case 'o':
					map.setTile(makeCoord(j, i), 'CITY');
					break;
				default:
					throw new Error('Unknown map tile');
			}
		}
	}
	map.generateNeighbors();
	return map;
}

export const selectRandomCity = (map: MapGrid) => {
	const cities = map.mapArray.filter(a => a.type === 'CITY').length;
	const randomLoc = Math.ceil(cities / 2); 

	let cnt = 0;
	const cityTile = map.mapArray.find((val) => val.type === 'CITY' && ++cnt === randomLoc);
	return cityTile;
}