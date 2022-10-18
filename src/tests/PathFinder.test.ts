import { Coord } from '../Coord';
import { loadMapFromString } from '../utils';
import { PathFinder } from '../PathFinder';

test('Will find path for trivial solution', () => {
	const width = 1;
	const height = 1;
	const arr = [
		'o'
	];

	const map = loadMapFromString(arr, width, height);
	const finder = new PathFinder();
	const path = finder.findPath(new Coord(0, 0), new Coord(0, 0), map);
	expect(path).toHaveLength(1);
	expect(path[0].x).toBe(0);
	expect(path[0].y).toBe(0);
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
	const path = finder.findPath(new Coord(0, 0), new Coord(1, 1), map);
	expect(path).toHaveLength(3);
	expect(path.map(p => [p.x, p.y])).toStrictEqual([[0,0],[0,1],[1,1]]);

});
