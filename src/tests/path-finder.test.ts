import { makeCoord } from '../structs/coord';
import { loadMapFromString } from './utils';
import { PathFinder } from '../algorithms/path-finder';

test('Will find path for trivial solution', () => {
	const width = 1;
	const height = 1;
	const arr = [
		'o'
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new PathFinder();
	const path = finder.findPath(makeCoord(0, 0), makeCoord(0, 0), map);
	expect(path).toHaveLength(1);
	expect(path[0]).toStrictEqual(makeCoord(0, 0));
});

test('Will find path for 2x2 solution', () => {
	const width = 2;
	const height = 2;
	const arr = [
		'o', '.',
		'.', 'o',
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new PathFinder();
	const path = finder.findPath(makeCoord(0, 0), makeCoord(1, 1), map);
	expect(path.map(p => [p.x, p.y])).toStrictEqual([[0,0],[0,1],[1,1]]);
});

test('Will find path for 3x3 solution', () => {
	const width = 3;
	const height = 3;
	const arr = [
		'o', '.', '.',
		'.', 'x', '.',
		'.', 'x', 'o'
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new PathFinder();
	const path = finder.findPath(makeCoord(0, 0), makeCoord(2, 2), map);
	expect(path.map(p => [p.x, p.y])).toStrictEqual([[0,0],[1,0],[2,0],[2,1],[2,2]]);
});

test('Will find path for 4x10 solution', () => {
	const width = 4;
	const height = 10;
	const arr = [
		'o', 'x', '.','.',
		'.', 'x', '.','.',
		'.', 'x', 'o','.',
		'.', 'x', 'x','.',
		'.', '.', '.','.',
		'.', '.', 'x','.',
		'.', 'x', '.','.',
		'.', '.', '.','.',
		'.', 'x', '.','.',
		'.', '.', '.','.',
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new PathFinder();
	const path = finder.findPath(makeCoord(0, 0), makeCoord(2, 2), map);
	expect(path.map(p => [p.x, p.y])).toStrictEqual([[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[3,3],[3,2],[2,2]]);
});

test('Will find path for 10x10 solution', () => {
	const width = 10;
	const height = 10;
	const arr = [
		'.', 'o', '.', '.', 'o', 'x', '.', 'o', 'x', 'x', 
		'.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', 
		'.', 'x', 'x', '.', 'x', '.', '.', '.', '.', '.', 
		'o', '.', 'x', '.', '.', '.', '.', '.', '.', '.', 
		'.', '.', '.', 'x', 'o', '.', 'x', '.', '.', 'o', 
		'.', '.', '.', 'x', '.', '.', 'x', '.', '.', '.', 
		'.', '.', 'o', 'x', 'x', '.', 'x', '.', '.', '.', 
		'.', '.', '.', '.', 'x', 'x', 'x', '.', '.', '.', 
		'.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 
		'o', '.', '.', '.', 'x', '.', 'x', 'o', '.', '.', 
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new PathFinder();
	const path = finder.findPath(makeCoord(4, 4), makeCoord(2, 6), map);
	expect(path.map(p => [p.x, p.y])).toStrictEqual([
		[4,4],[4,3],[3,3],[3,2],[3,1],[2,1],[1,1],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,6],[2,6]]);
});