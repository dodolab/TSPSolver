import { MapGrid } from "../structs/map-grid";
import { Coord, coordEq } from '../structs/coords';
import { PathFinder } from './path-finder';

export type MSTFinderEvent = {
	currentCoord: Coord;
	minPath: Map<number, number>;
}

export class MSTFinder {    
	spanningTree: number[] = [];
	
	findMST(coords: Coord[], map: MapGrid): number[] {
		const generator = this.findMSTIteratively(coords, map);
		let val = generator.next();
		while (!val.done) {
			val = generator.next();
		}
		return this.spanningTree;
	}

	*findMSTIteratively(coords: Coord[], map: MapGrid): Generator<MSTFinderEvent, MSTFinderEvent, void> {
		this.spanningTree = [];
		const pathFinder = new PathFinder();

		let coordsCnt = coords.length;

		for(let i = 0; i < coords.length; i++) {
			const coord = coords[i];
			// referrential coordinate is a coordinate different from coord
			// it can be anything. Dijkstra will search the whole map regardless of how
			// close the refCoord is. It mustn't be te same coordinate, though
			let refCoord = coords.find(c => !coordEq(c, coord));
			if(!refCoord) {
				// trivial solution -> only one node
				refCoord = coords[0];
			}
			// the path itself doesn't interests us...
			pathFinder.findPath(coord, refCoord, map);
			
			yield {
				currentCoord: coord,
				minPath: pathFinder.steps,
			}
			// now we know min steps from coord to each other coord
			const minPath = pathFinder.steps;

			// let's save this into the spanning tree
			for(let j = 0; j < coords.length; j++) {
				const coord2 = coords[j];
				const distIndex = i * coordsCnt + j;
				this.spanningTree[distIndex] = minPath.get(map.coordToIndex(coord2));
			}
		}
		return null;
	}
}