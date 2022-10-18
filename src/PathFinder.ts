import { Coord } from './Coord';
import { MapGrid } from './MapGrid';
import { PriorityQueue } from './PriorityQueue';

export class PathFinder {

	findPath(startCoord: Coord, endCoord: Coord, map: MapGrid) {
		console.log(`Running Dijkstra: [${startCoord.x},${startCoord.y}] -> [${endCoord.x},${endCoord.y}]`);

		let steps = {};
		let backtrace = {};
		let pq = new PriorityQueue();

		const startIndex = map.coordToIndex(startCoord);
		const endIndex = map.coordToIndex(endCoord);

		steps[startIndex] = 0;

		map.mapArray.forEach((val) => {
			// todo we could use index from the iterator as well
			const index = map.coordToIndex(val.coord);
			if (index !== startIndex) {
				steps[index] = Infinity;
			}
		});

		pq.enqueue(startCoord, 0);

		while (!pq.isEmpty) {
			let currentCoord = pq.dequeue()[0];
			let currentIndex = map.coordToIndex(currentCoord);
			const neighbors = map.getTile(currentCoord).directionalNeighbors;
			neighbors.forEach((val) => {
				if (val && val.isWalkable) {
					const neighbourIndex = map.coordToIndex(val.coord);
					let price = steps[currentIndex] + 1;
					if (price < steps[neighbourIndex]) {
						steps[neighbourIndex] = price;
						backtrace[neighbourIndex] = currentIndex;
						pq.enqueue(val.coord, price);
					}
				}
			});
		}

		let path: Coord[] = [endCoord];
		let lastStep = endIndex;

		// print backtrace:
		Object.keys(backtrace).forEach(key => {
			const val = backtrace[key];
			const fromCoord = map.indexToCoord(parseInt(key));
			const toCoord = map.indexToCoord(val);
			console.log(`[${fromCoord.x},${fromCoord.y}] -> [${toCoord.x}, ${toCoord.y}]`);
		});

		while (lastStep && lastStep !== startIndex) {
			path.unshift(map.indexToCoord(backtrace[lastStep]));
			lastStep = backtrace[lastStep];
		}
		console.log('\nFinal path:');
		path.forEach(c => c.print());
	}
}