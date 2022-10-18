import { Coord } from '../structs/coord';
import { MapGrid } from '../structs/map-grid';
import { PriorityQueue } from '../structs/priority-queue';

/**
 * Reporting structure for the generator
 */
export type PathFinderEvent = {
	currentCoord: Coord;
}

/**
 * Dijkstra algorithm that uses priority queue to find the shortest
 * path from start node to all other nodes
 */
export class PathFinder {

	// stores min amount of steps (min price) from start to each other node)
	steps: Map<number, number>;
	// helper for backtracing to the start (used when generating the path)
	backTrace: Map<number, number>;
	queue: PriorityQueue<Coord>;
	closestPath: Coord[];

	findPath(start: Coord, end: Coord, map: MapGrid): Coord[] {
		const generator = this.findPathIteratively(start, end, map);
		let val = generator.next();
		while (!val.done) {
			val = generator.next();
		}
		return this.closestPath;
	}

	*findPathIteratively(start: Coord, end: Coord, map: MapGrid): Generator<PathFinderEvent, PathFinderEvent, void> {
		this.reset();

		const startIndex = map.coordToIndex(start);

		// steps to all nodes are initialized to infinity, except the starting node
		for(let i = 0; i < (map.width * map.height); i++) {
			this.steps.set(i, Infinity);
		}

		this.steps.set(startIndex, 0);
		this.queue.enqueue(start, 0);

		while (!this.queue.isEmpty) {
			let currentCoord = this.queue.dequeue();
			yield {
				currentCoord
			};

			let currentIndex = map.coordToIndex(currentCoord);
			let currentPrice = this.steps.get(currentIndex);
			// explore all neighbors and ignore diagonals
			const neighbors = map.getTile(currentCoord).directionalNeighbors;
			neighbors.forEach((neigh) => {
				if (neigh && neigh.isWalkable) {
					const neighbourIndex = map.coordToIndex(neigh.coord);
					let price = currentPrice + 1;
					if (price < this.steps.get(neighbourIndex)) {
						// we found a better path -> store the backtrace
						this.steps.set(neighbourIndex, price);
						this.backTrace.set(neighbourIndex, currentIndex);
						this.queue.enqueue(neigh.coord, price);
					}
				}
			});
		}

		// backtrack and fill the output path
		this.backtracePath(start, end, map);
		return null;
	}

	private backtracePath(start: Coord, end: Coord, map: MapGrid) {
		const startIndex = map.coordToIndex(start);
		const endIndex = map.coordToIndex(end);

		this.closestPath.push(end);
		let currentStep = endIndex;

		// omg... I had there while(currentStep) and when currentStep
		// referred to the topleft corner of the map where the index is 0,
		// this shizzle stopped working... it took me ages to figure out
		while ((currentStep !== undefined) && currentStep !== startIndex) {
			const nextStep = this.backTrace.get(currentStep);
			this.closestPath.push(map.indexToCoord(nextStep))
			currentStep = nextStep;
		}
		this.closestPath.reverse();
	}

	private reset() {
		this.steps = new Map();
		this.backTrace = new Map();
		this.queue = new PriorityQueue<Coord>();
		this.closestPath = [];
	}
}