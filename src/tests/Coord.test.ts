import { Coord } from '../Coord';


test('Generates left neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.left();
	expect(coord2.x).toBe(-1);
	expect(coord2.y).toBe(0);
});

test('Generates right neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.right();
	expect(coord2.x).toBe(1);
	expect(coord2.y).toBe(0);
});

test('Generates top neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.top();
	expect(coord2.x).toBe(0);
	expect(coord2.y).toBe(-1);
});

test('Generates bottom neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.bottom();
	expect(coord2.x).toBe(0);
	expect(coord2.y).toBe(+1);
});

test('Generates topLeft neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.topLeft();
	expect(coord2.x).toBe(-1);
	expect(coord2.y).toBe(-1);
});

test('Generates topRight neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.topRight();
	expect(coord2.x).toBe(1);
	expect(coord2.y).toBe(-1);
});

test('Generates bottomLeft neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.bottomLeft();
	expect(coord2.x).toBe(-1);
	expect(coord2.y).toBe(1);
});

test('Generates bottomRight neighbor', () => {
	const coord = new Coord(0, 0);
	const coord2 = coord.bottomRight();
	expect(coord2.x).toBe(1);
	expect(coord2.y).toBe(1);
});

test('Is Equal to other coord', () => {
	const coord = new Coord(20, 20);
	const coord2 = new Coord(20, 20);
	const coord3 = new Coord(30, 20);
	const coord4 = new Coord(20, 30);
	expect(coord.eq(coord2)).toBe(true);
	expect(coord.eq(coord3)).toBe(false);
	expect(coord.eq(coord4)).toBe(false);
	expect(coord3.eq(coord4)).toBe(false);
});