import { Coord, makeCoord, coordEq, isDirectionalNeighbor } from './Coord';
import { MapGrid } from './MapGrid';
import { Stack } from './Stack';
import { TileType, MapTile } from './MapTile';

export type ExploreEvent = {
	type: 'GOTO' | 'EXPLORE';
	tile: MapTile;
}

export class MapExplorer {
	// current position
	current: Coord;
	// blind map that gets gradually explored
	blindMap: MapGrid;
	// helping structure for backtracing to the previous milestone on the stack
	backTrack: Map<number, number>;
	// stack of checkpoints
	checkpointStack: Stack<Coord>;
	visitedNodes: Set<number>;
	exploredNodes: Set<number>;

	constructor(width: number, height: number) {
		this.blindMap = new MapGrid(width, height);
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.blindMap.setTile(makeCoord(i, j), 'UNKNOWN');
			}
		}
	}

	exploreMap(startCoord: Coord, map: MapGrid): MapGrid {
		const generator = this.exploreMapIteratively(startCoord, map);
		let val = generator.next();
		while (!val.done) {
			val = generator.next();
		}
		// return explored map
		return this.blindMap;
	}

	*exploreMapIteratively(startCoord: Coord, map: MapGrid): Generator<ExploreEvent, ExploreEvent, void> {
		this.reset();
		this.current = startCoord;

		// visit the starting node
		this.exploreTile(startCoord, map.getTile(startCoord).type);
		this.visitNewNode(startCoord);
		this.checkpointStack.push(this.current);

		// we go forward and when we need to go back, we will use the stack
		let canWalkForward = false;

		while (!this.checkpointStack.isEmpty() || canWalkForward) {

			if (!canWalkForward) {
				let lastCheckpoint = this.checkpointStack.pop();

				// a little twist -> this will ignore milestones around which all cells have already been discovered
				while (!map.getTile(lastCheckpoint).directionalNeighbors
					.find(neigh => neigh && neigh.isWalkable && !this.isVisited(neigh.coord))) {

					if (this.checkpointStack.isEmpty()) {
						// algorithm termination
						return null;
					}
					lastCheckpoint = this.checkpointStack.pop();
				}

				const pathToLastCheckpoint = this.backTrace(lastCheckpoint);

				//walk to the last checkpoint
				for (let coord of pathToLastCheckpoint) {
					this.current = coord;
					yield {
						type: 'GOTO',
						tile: map.getTile(coord)
					}
				}
			}

			let currentTile = map.getTile(this.current);
			// this order is important!
			const neighbors = currentTile.neighborsArr;

			let neighbourToWalk: Coord = null;
			let neighboursToWalkCnt = 0;

			for (let neigh of neighbors) {
				// if we are close to map boundaries, some neighbours can be undefined 
				if (neigh) {
					if (!this.isExplored(neigh.coord)) {
						this.exploreTile(neigh.coord, neigh.type);
						yield {
							type: 'EXPLORE',
							tile: neigh
						}
					}

					if (neigh.isWalkable && isDirectionalNeighbor(neigh.coord, this.current) && !this.isVisited(neigh.coord)) {
						neighbourToWalk = neigh.coord;
						neighboursToWalkCnt++;
					}
				}
			}

			if (neighboursToWalkCnt > 1) {
				// more than one neighbour -> we need to save a checkpoint
				// for backtracking
				this.checkpointStack.push(this.current);
			}

			if (neighbourToWalk) {
				canWalkForward = true;
				this.visitNewNode(neighbourToWalk);
				yield {
					type: 'GOTO',
					tile: map.getTile(neighbourToWalk)
				}
			} else {
				canWalkForward = false;
			}
		}

		// generate neighbours as we have already discovered all cells
		this.blindMap.generateNeighbors();
		return null;
	}

	private backTrace(target: Coord): Coord[] {

		if (coordEq(target, this.current)) {
			// trivial solution -> staying on the same place
			return [target];
		}

		if (this.blindMap.getTile(target).type === 'UNKNOWN') {
			throw new Error(`Can\'t walk to an unknown area: [${target.x},${target.y}]`);
		}

		if (isDirectionalNeighbor(target, this.current)) {
			// semi-trivial solution - going one cell back
			return [target];
		} else {
			// iterative backtracking
			const path = [];
			let nextStep = this.backTrack.get(this.coordToIndex(this.current));
			const toIndex = this.coordToIndex(target);

			let overFlowCheck = 0;
			while (true) {
				path.push(this.indexToCoord(nextStep));
				if (nextStep === toIndex) {
					break;
				}
				nextStep = this.backTrack.get(nextStep);

				if(overFlowCheck++ >= this.blindMap.width * this.blindMap.height) {
					throw new Error(`Backtrace got in an infinite loop for [${target.x},${target.y}]`);
				}
			}
			return path;
		}
	}

	private coordToIndex = (coord: Coord): number => this.blindMap.coordToIndex(coord);
	private indexToCoord = (index: number): Coord => this.blindMap.indexToCoord(index);

	private reset() {
		this.backTrack = new Map();;
		this.visitedNodes = new Set();
		this.exploredNodes = new Set();
		this.blindMap.generateNeighbors();
		this.checkpointStack = new Stack<Coord>();
	}

	private isVisited(coord: Coord) {
		return this.visitedNodes.has(this.coordToIndex(coord));
	}

	private visitNewNode(coord: Coord) {
		this.visitedNodes.add(this.coordToIndex(coord));
		if (!coordEq(this.current, coord)) {
			// update backtrack
			this.backTrack.set(this.coordToIndex(coord), this.coordToIndex(this.current));
		}
		this.current = coord;
	}

	private isExplored(coord: Coord) {
		return this.exploredNodes.has(this.coordToIndex(coord));
	}

	private exploreTile(coord: Coord, type: TileType) {
		this.blindMap.setTile(coord, type);
		this.exploredNodes.add(this.coordToIndex(coord));
	}
}