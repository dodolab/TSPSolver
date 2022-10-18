import { 
	makeCoord, 
	coordLeft, 
	coordBottom, 
	coordBottomLeft,
	coordBottomRight, 
	coordEq,
	coordRight, 
	coordTop, 
	coordTopLeft, 
	coordTopRight,
} from '../structs';


test('Generates left neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordLeft(coord);
	expect(coord2).toStrictEqual(makeCoord(-1, 0));
});

test('Generates right neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordRight(coord);
	expect(coord2).toStrictEqual(makeCoord(1, 0));
});

test('Generates top neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordTop(coord);
	expect(coord2).toStrictEqual(makeCoord(0, -1));
});

test('Generates bottom neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordBottom(coord);
	expect(coord2).toStrictEqual(makeCoord(0, 1));
});

test('Generates topLeft neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordTopLeft(coord);
	expect(coord2).toStrictEqual(makeCoord(-1, -1));
});

test('Generates topRight neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordTopRight(coord);
	expect(coord2).toStrictEqual(makeCoord(1, -1));
});

test('Generates bottomLeft neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordBottomLeft(coord);
	expect(coord2).toStrictEqual(makeCoord(-1, 1));
});

test('Generates bottomRight neighbor', () => {
	const coord = makeCoord(0, 0);
	const coord2 = coordBottomRight(coord);
	expect(coord2).toStrictEqual(makeCoord(1, 1));
});

test('Is Equal to other coord', () => {
	const coord = makeCoord(20, 20);
	const coord2 = makeCoord(20, 20);
	const coord3 = makeCoord(30, 20);
	const coord4 = makeCoord(20, 30);
	expect(coordEq(coord, coord2)).toBe(true);
	expect(coordEq(coord, coord3)).toBe(false);
	expect(coordEq(coord, coord4)).toBe(false);
	expect(coordEq(coord3, coord4)).toBe(false);
});