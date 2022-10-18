import { Coord, makeCoord } from './Coord';

// https://www.interviewbit.com/blog/travelling-salesman-problem/

export type TSPEvent = {
	currentCity: number;
	nextCity: number;
}

/**
 * Travelling Salesman Problem Solver
 * Since this is a NP problem solver, it uses Dynamic Programming and a bit array
 * The maximum number of cities is the number of bits in JS Number type = 64
 * 
 * Distance array example (the array doesn't need to be symmetric):
 * 
 *         London    Paris    Prague
 * London    0        342      1267
 * Paris    342        0       1032
 * Prague   1267      1032       0
 * 
 */
export class TSP {
	startCityIndex = 0;
	// a symmetric 2D array of city-city min distances
	distances: number[] = [];
	// found tour when the algorithm ends
	tour: number[];
	minTourCost: number;
	citiesNum: number;
	// sparse 2D array for memoizing permutations for each city
	memoizer: number[][];

	solve(startCityIndex: number, citiesNum: number, distances: number[]) {
		const generator = this.solveIteratively(startCityIndex, citiesNum, distances);
		let val = generator.next();
		while (!val.done) {
			val = generator.next();
		}
		return this.tour; 
	}

	*solveIteratively(startCityIndex: number, citiesNum: number, distances: number[]): Generator<TSPEvent, TSPEvent, void> {
		this.distances = distances;
		this.citiesNum = citiesNum;
		this.startCityIndex = startCityIndex;
		this.reset(citiesNum);

		// add all outgoing edges from the starting node to memo table.
		for (let cityIndex = 0; cityIndex < this.citiesNum; cityIndex++) {
			if (cityIndex == this.startCityIndex) {
				continue;
			}
			// permutation with the start city and all neighbours as the second city
			const permutation = (1 << cityIndex) | (1 << this.startCityIndex);
			this.memoize(cityIndex, permutation, this.distances[this.coordToIndex(this.startCityIndex, cityIndex)]);
		}

		// 1st loop: starting from the 3rd city, as the 2nd is already memoized
		for (let cityIndex = 3; cityIndex <= this.citiesNum; cityIndex++) {
			const permutations = this.generatePermutations(cityIndex);
			// 2nd loop: go over each permutation for this city and memoize the promising ones
			for (let permutation of permutations) {
				if (this.notIn(this.startCityIndex, permutation)) {
					// invalid permutation
					continue;
				}
				// 3rd loop: find the promising next city
				for (let nextCityIndex = 0; nextCityIndex < this.citiesNum; nextCityIndex++) {
					if (nextCityIndex == this.startCityIndex || this.notIn(nextCityIndex, permutation)) {
						// invalid permutation
						continue;
					}

					// report to the observers
					yield {
						currentCity: cityIndex,
						nextCity: nextCityIndex,
					}
					
					let permutationWithoutNextCity = permutation ^ (1 << nextCityIndex);
					let minDist = Infinity;
					// 4th loop: find the min distance from permutations that don't include the next city
					// and add the min distance to the next city
					for (let endCityIndex = 0; endCityIndex < this.citiesNum; endCityIndex++) {
						if (endCityIndex == this.startCityIndex || endCityIndex == nextCityIndex || this.notIn(endCityIndex, permutation)) {
							// invalid permutation
							continue;
						}
						let newDistance = this.getMemoized(endCityIndex, permutationWithoutNextCity) 
							+ this.distances[this.coordToIndex(endCityIndex, nextCityIndex)];
						minDist = Math.min(minDist, newDistance);
					}
					this.memoize(nextCityIndex, permutation, minDist);
				}
			}
		}

		// ending subset -> all bits are set to 1 
		const END_STATE = (1 << this.citiesNum) - 1;

		// backtrack the output tour  and minimize cost.
		for (let i = 0; i < this.citiesNum; i++) {
			if (i == this.startCityIndex) {
				continue;
			}
			let tourCost = this.getMemoized(i, END_STATE) + this.distances[this.coordToIndex(i, this.startCityIndex)];
			if (tourCost < this.minTourCost) {
				this.minTourCost = tourCost;
			}
		}

		let lastIndex = this.startCityIndex;
		let state = END_STATE;
		this.tour.push(this.startCityIndex);

		// reconstruct TSP path from the memorizer table.
		for (let i = 1; i < this.citiesNum; i++) {
			let index = -1;
			for (let j = 0; j < this.citiesNum; j++) {
				if (j == this.startCityIndex || this.notIn(j, state)) {
					continue;
				}
				if (index == -1) {
					// first valid index of the second loop
					index = j;
				}
				let prevDist = this.getMemoized(index, state) + this.distances[this.coordToIndex(index, lastIndex)];
				let newDist = this.getMemoized(j, state) + this.distances[this.coordToIndex(j, lastIndex)];
				if (newDist < prevDist) {
					index = j;
				}
			}

			this.tour.push(index);
			state = state ^ (1 << index);
			lastIndex = index;
		}

		this.tour.push(this.startCityIndex);
		this.tour.reverse();
		return null;
	}

	private generatePermutations(cityIndex: number) {
		const permutations: number[] = [];
		this.generatePermutationsRec(0, 0, this.citiesNum, cityIndex, permutations);
		return permutations;
	}

	/**
	 * Generates all bit sets where r bits are set to one. Returns a list of integer masks
	 * We start with "r" elements and recurse down until r = 0 
	 * @param set - bit mask to which the permutations are generated
	 * @param from - first bit from which the permutations are generated
	 * @param to - last bit from which the permutations are generated
	 * @param r - the number of "bits" to select. If r == (to - from),  we get a full permutation
	 * @param permutations output array of integer masks
	 */
	private generatePermutationsRec(set: number, from: number, to: number, r: number, permutations: number[]) {

		// return early if there are more elements left to select than what is available
		if ((to - from) < r) {
			return;
		}

		// We selected 'r' elements so we found a valid subset!
		if (r == 0) {
			permutations.push(set);
		} else {
			for (let i = from; i < to; i++) {
				// try to include this bit
				set |= 1 << i;
				// generate other bits when bit i is 1
				this.generatePermutationsRec(set, i + 1, to, r - 1, permutations);
				// revert back and go to the next instance where we did not include this element
				set &= ~(1 << i);
			}
		}
	}
	
	private reset(citiesNum: number) {
		this.memoizer = [];
		this.tour = [];
		this.minTourCost = Infinity;

		// init 2D array
		for(let i = 0; i < citiesNum; i++) {
			this.memoizer[i] = [];
		}
	}

	private memoize(cityIndex: number, permutation: number, distance: number) {
		this.memoizer[cityIndex][permutation] = distance;
	}

	private getMemoized(cityIndex: number, permutation: number) {
		return this.memoizer[cityIndex][permutation];
	}

	/**
 	* Returns true if the bits of element are inside the bits of the subset param
 	*/
	private notIn(elem: number, subset: number) {
		return ((1 << elem) & subset) == 0;
	}

	private coordToIndex = (x: number, y: number): number => {
		if (x < 0 || y < 0 || x >= this.citiesNum || y >= this.citiesNum) {
			return -1;
		}
		return y * this.citiesNum + x;
	}
}