import { Coord } from './Coord';

// https://www.interviewbit.com/blog/travelling-salesman-problem/
export class TSP {

	width: number;
	height: number;

	N = 0;
	start = 0;
	distance: number[] = [];
	tour: number[] = [];
	minTourCost = Infinity;

	constructor(distance: number[], width: number, height: number) {
		this.distance = distance;
		this.width = width;
		this.height = height;

		/*this.width = this.height = 6;
		this.distance = [];
		for(let i = 0; i < this.width * this.height; i++) {
			this.distance[i] = 10000;
		}
		this.distance[this.coordToIndex(5, 0)] = 10;
		this.distance[this.coordToIndex(1, 5)] = 12;
		this.distance[this.coordToIndex(4, 1)] = 2;
		this.distance[this.coordToIndex(2, 4)] = 4;
		this.distance[this.coordToIndex(3, 2)] = 6;
		this.distance[this.coordToIndex(0, 3)] = 8;*/
	}

	coordToIndex = (x: number, y: number): number => {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return -1;
		}
		return y * this.width + x;
	}

	indexToCoord = (x: number): Coord => {
		return new Coord(x % this.width, Math.floor(x / this.width));
	}

	notIn = (elem: number, subset: number) => {
		return ((1 << elem) & subset) == 0;
	}

	// This method generates all bit sets of size n where r bits 
	// are set to one. The result is returned as a list of integer masks.
	combinations = (r: number, n: number) => {
		const subsets: number[] = [];
		this.combinations2(0, 0, r, n, subsets);
		return subsets;
	}

	// To find all the combinations of size r we need to recurse until we have
	// selected r elements (aka r = 0), otherwise if r != 0 then we still need to select
	// an element which is found after the position of our last selected element
	combinations2 = (set: number, at: number, r: number, n: number, subsets: number[]) => {

		// Return early if there are more elements left to select than what is available.
		let elementsLeftToPick = n - at;
		if (elementsLeftToPick < r) return;

		// We selected 'r' elements so we found a valid subset!
		if (r == 0) {
			subsets.push(set);
		} else {
			for (let i = at; i < n; i++) {
				// Try including this element
				set |= 1 << i;

				this.combinations2(set, i + 1, r - 1, n, subsets);

				// Backtrack and try the instance where we did not include this element
				set &= ~(1 << i);
			}
		}
	}

	solve = () => {
		let END_STATE = (1 << this.N) - 1;
		let memo: number[] = [];
		const memoWidth = this.N;
		const memoHeight = 1 << this.N;

		const memoIndex = (x: number, y: number) => y * memoWidth + x;

		// Add all outgoing edges from the starting node to memo table.
		for (let end = 0; end < this.N; end++) {
			if (end == this.start) continue;
			memo[memoIndex(end, (1 << this.start) | (1 << end))] = this.distance[this.coordToIndex(this.start, end)];
		}

		for (let r = 3; r <= this.N; r++) {
			const combinations = this.combinations(r, this.N);

			for (let subset of combinations) {
				if (this.notIn(this.start, subset)) {
					continue;
				}
				for (let next = 0; next < this.N; next++) {
					if (next == this.start || this.notIn(next, subset)) continue;
					let subsetWithoutNext = subset ^ (1 << next);
					let minDist = Infinity;
					for (let end = 0; end < this.N; end++) {
						if (end == this.start || end == next || this.notIn(end, subset)) continue;
						let newDistance = memo[memoIndex(end, subsetWithoutNext)] + this.distance[this.coordToIndex(end, next)];
						if (newDistance < minDist) {
							minDist = newDistance;
						}
					}
					memo[memoIndex(next, subset)] = minDist;
				}
			}
		}

		// Connect tour back to starting node and minimize cost.
		for (let i = 0; i < this.N; i++) {
			if (i == this.start) continue;
			let tourCost = memo[memoIndex(i, END_STATE)] + this.distance[this.coordToIndex(i, this.start)];
			if (tourCost < this.minTourCost) {
				this.minTourCost = tourCost;
			}
		}

		let lastIndex = this.start;
		let state = END_STATE;
		this.tour.push(this.start);

		// Reconstruct TSP path from memo table.
		for (let i = 1; i < this.N; i++) {

			let index = -1;
			for (let j = 0; j < this.N; j++) {
				if (j == this.start || this.notIn(j, state)) continue;
				if (index == -1) index = j;
				let prevDist = memo[memoIndex(index, state)] + this.distance[this.coordToIndex(index, lastIndex)];
				let newDist = memo[memoIndex(j, state)] + this.distance[this.coordToIndex(j, lastIndex)];
				if (newDist < prevDist) {
					index = j;
				}
			}

			this.tour.push(index);
			state = state ^ (1 << index);
			lastIndex = index;
		}

		this.tour.push(this.start);
		this.tour.reverse();
	}


	TSP = (startCity: number) => {
		this.N = this.width;
		this.start = startCity;
		this.solve();
		console.log(this.tour);
		console.log(this.minTourCost);
		return this.tour;
	}
}