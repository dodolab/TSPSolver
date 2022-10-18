import { makeCoord } from '../Coord';
import { MapExplorer } from '../MapExplorer';
import { loadMapFromString } from '../utils';

test('Will explore trivial solution', () => {
	const width = 1;
	const height = 1;
	const arr = [
		'o'
	];

	const map = loadMapFromString(arr, width, height);
	const explorer = new MapExplorer(width, height);
	explorer.exploreMap(makeCoord(0, 0), map);
	// no unknown tiles
	const unknownTiles = explorer.blindMap.mapArray.filter(arr => arr.type === 'UNKNOWN');
	expect(unknownTiles).toHaveLength(0);
	expect(explorer.visitedNodes.size).toBe(1);
	expect(explorer.exploredNodes.size).toBe(1);
});

test('Will explore 2x2 solution', () => {
	const width = 2;
	const height = 2;
	const arr = [
		'o', '.',
		'.', 'o'
	];

	const map = loadMapFromString(arr, width, height);
	const explorer = new MapExplorer(width, height);
	explorer.exploreMap(makeCoord(0, 0), map);
	// no unknown tiles
	const unknownTiles = explorer.blindMap.mapArray.filter(arr => arr.type === 'UNKNOWN');
	expect(unknownTiles).toHaveLength(0);
	expect(explorer.visitedNodes.size).toBe(4);
	expect(explorer.exploredNodes.size).toBe(4);
});

test('Will explore 3x3 solution with walls', () => {
	const width = 3;
	const height = 3;
	const arr = [
		'o', 'x', '.',
		'.', 'o', '.',
		'x', '.', 'o',
	];

	const map = loadMapFromString(arr, width, height);
	const explorer = new MapExplorer(width, height);
	explorer.exploreMap(makeCoord(0, 0), map);
	// no unknown tiles
	const unknownTiles = explorer.blindMap.mapArray.filter(arr => arr.type === 'UNKNOWN');
	expect(unknownTiles).toHaveLength(0);
	expect(explorer.visitedNodes.size).toBe(7); // 2 cells are walls
	expect(explorer.exploredNodes.size).toBe(9);
});

test('Will explore 4x4 solution with inaccessible corner', () => {
	const width = 4;
	const height = 4;
	const arr = [
		'o', 'x', 'x', '.',
		'.', 'o', '.', 'x',
		'x', 'x', '.', '.',
		'x', 'o', '.', '.',
	];

	const map = loadMapFromString(arr, width, height);
	const explorer = new MapExplorer(width, height);
	explorer.exploreMap(makeCoord(0, 0), map);
	const unknownTiles = explorer.blindMap.mapArray.filter(arr => arr.type === 'UNKNOWN');
	expect(unknownTiles).toHaveLength(0); // no unknown tiles, as we explored it diagonally
	expect(explorer.visitedNodes.size).toBe(9);
	expect(explorer.exploredNodes.size).toBe(16);
});

test('Will explore 5x5 solution with unexploreable parts', () => {
	const width = 5;
	const height = 5;
	const arr = [
		'o', 'x', 'x', '.', '.',
		'.', 'o', '.', 'x', 'x',
		'x', 'x', '.', 'x', '.',
		'x', 'o', '.', 'x', '.',
		'x', 'o', '.', 'x', '.',
	];

	const map = loadMapFromString(arr, width, height);
	const explorer = new MapExplorer(width, height);
	explorer.exploreMap(makeCoord(0, 0), map);
	const unknownTiles = explorer.blindMap.mapArray.filter(arr => arr.type === 'UNKNOWN');
	expect(unknownTiles).toHaveLength(5);
	expect(explorer.visitedNodes.size).toBe(9);
	expect(explorer.exploredNodes.size).toBe(20);
});

test('Will explore 10x10 solution', () => {
	const width = 10;
	const height = 10;
	const arr = [
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

	const map = loadMapFromString(arr, width, height);
	const explorer = new MapExplorer(width, height);
	explorer.exploreMap(makeCoord(0, 0), map);
	const unknownTiles = explorer.blindMap.mapArray.filter(arr => arr.type === 'UNKNOWN');
	expect(unknownTiles).toHaveLength(0);
	expect(explorer.visitedNodes.size).toBe(77);
	expect(explorer.exploredNodes.size).toBe(100);
	// final location
	expect(explorer.current).toStrictEqual(makeCoord(0, 4));
});