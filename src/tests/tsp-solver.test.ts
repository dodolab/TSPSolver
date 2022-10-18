import { TSPSolver } from '../algorithms/tsp-solver';

test('Will find cycle for trivial solution', () => {
	const citiesNum = 1;
	const arr = [
		0
	];

	const tsp = new TSPSolver();
	const tour = tsp.solve(0, citiesNum, arr);
	expect(tour).toStrictEqual([0, 0]);
	expect(tsp.minTourCost).toBe(0);
});

test('Will find cycle for 2 cities', () => {
	const citiesNum = 2;
	const arr = [
		0,1,
		1,0
	];

	const tsp = new TSPSolver();
	const tour = tsp.solve(0, citiesNum, arr);
	expect(tour).toStrictEqual([0, 1, 0]);
	expect(tsp.minTourCost).toBe(2);
});

test('Will find cycle for 3 cities', () => {
	const citiesNum = 3;
	// 2 units from City#0 to City#2
	// 1 unit from City#0 to City#1
	// 2 units from City#1 to City#2
	const arr = [
		0,3,2,
		3,0,4,
		2,4,0
	];

	const tsp = new TSPSolver();
	const tour = tsp.solve(0, citiesNum, arr);
	expect(tour).toStrictEqual([0, 2, 1, 0]);
	expect(tsp.minTourCost).toBe(9);
});

test('Will find cycle for 4 cities', () => {
	const citiesNum = 4;
	const arr = [
		0, 5, 1, 2,
		5, 0, 10,6,
		1, 10,0, 4,
		2, 6, 4, 0
	];

	const tsp = new TSPSolver();
	const tour = tsp.solve(0, citiesNum, arr);
	// 1 + 4 + 6 + 5
	expect(tour).toStrictEqual([0, 2, 3, 1, 0]);
	expect(tsp.minTourCost).toBe(16);
});

test('Will find cycle for 10 cities', () => {
	const citiesNum = 10;
	const arr = [
		0, 5, 1, 2, 4, 4, 3, 5, 6, 5,
		5, 0, 10,6, 2, 3, 5, 9, 8, 6,
		1, 10,0, 4, 1, 1, 2, 5, 8, 4,
		2, 6, 4, 0, 2, 3, 2, 4, 4, 6,
		4, 2, 1, 2, 0, 1, 8, 7, 3, 5,
		4, 3, 1, 3, 1, 0, 1, 1, 1, 5,
		3, 5, 2, 2, 8, 1, 0, 2, 2, 3,
		5, 9, 5, 4, 7, 1, 2, 0, 1, 5,
		6, 8, 8, 4, 3, 1, 2, 1, 0, 4,
		5, 6, 4, 6, 5, 5, 3, 5, 4, 0,
	];

	const tsp = new TSPSolver();
	const tour = tsp.solve(0, citiesNum, arr);
	expect(tour).toStrictEqual([0, 3, 6, 9, 8, 7, 5, 1, 4, 2, 0]);
	expect(tsp.minTourCost).toBe(20);
});