import { makeCoord } from '../structs/coords';
import { loadMapFromString } from '../utils';
import { MSTFinder } from '../algorithms/mst-finder';

test('Will find MST for trivial case', () => {
	const width = 1;
	const height = 1;
	const arr = [
		'o'
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new MSTFinder();
	const tree = finder.findMST([makeCoord(0, 0)], map);
	expect(tree).toStrictEqual([0]);
});

test('Will find MST for 2 nodes', () => {
	const width = 2;
	const height = 2;
	const arr = [
		'o', '.',
		'.', 'o',
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new MSTFinder();
	const tree = finder.findMST([makeCoord(0, 0), makeCoord(1, 1)], map);
	const expectedResult = [
		0, 2,
		2, 0
	]
	expect(tree).toStrictEqual(expectedResult);
});

test('Will find MST for 3 nodes', () => {
	const width = 4;
	const height = 10;
	const arr = [
		'o', 'x', '.', '.',
		'.', 'x', '.', '.',
		'.', 'x', 'o', '.',
		'.', 'x', 'x', '.',
		'.', '.', '.', '.',
		'.', '.', 'x', '.',
		'.', 'x', '.', '.',
		'.', '.', '.', 'o',
		'.', 'x', '.', '.',
		'.', '.', '.', '.',
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new MSTFinder();
	const tree = finder.findMST([makeCoord(0, 0), makeCoord(2, 2), makeCoord(3, 7)], map);
	const expectedResult = [
		0, 10, 10,
		10, 0, 6,
		10, 6, 0
	]
	expect(tree).toStrictEqual(expectedResult);
});
