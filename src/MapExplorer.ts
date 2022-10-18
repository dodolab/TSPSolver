import { Coord } from './Coord';
import { MapGrid } from './MapGrid';
import { Stack } from './Stack';
import { TileType, MapTile } from './MapTile';

export type MapExploreStatus = {
	type: 'GOTO' | 'EXPLORE';
	tile: MapTile;
}

export interface MapExplorerObserver {
	onGoto(coord: Coord);
	onExplore(coord: Coord, tileType: TileType);
}

export class MapExplorer {
	current: Coord;
	blindMap: MapGrid;
	backTrack: { [key: number]: number} = {};
	checkpointStack: Stack<Coord>;
	visitedNodes = new Set();
	exploredNodes = new Set();

	constructor(width: number, height: number) {
		this.blindMap = new MapGrid(width, height);
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.blindMap.setTile(new Coord(i, j), 'UNKNOWN');
			}
		}
	}

	*exploreMap(startCoord: Coord, map: MapGrid): Generator<MapExploreStatus, MapExploreStatus, MapExploreStatus> {
		this.backTrack = {};
		this.visitedNodes = new Set();
		this.exploredNodes = new Set();
		this.blindMap.generateNeighbors();
		this.current = startCoord;
		console.log(this.blindMap.print());


		this.exploreTile(startCoord, map.getTile(startCoord).type);

		this.checkpointStack = new Stack<Coord>();
		this.checkpointStack.push(this.current);
		console.log('Searching');

		let canWalkForward = false;

		while (!this.checkpointStack.isEmpty() || canWalkForward) {
			// 1) walk to the last checkpoint
			let currentTile: MapTile = null;

			if(!canWalkForward) {	
				let lastCheckpoint = this.checkpointStack.pop();

				// a little twist -> this will ignore milestones around which all cells have already been discovered
				while(!map.getTile(lastCheckpoint).directionalNeighbors.find(neigh => neigh && neigh.isWalkable && !this.isVisited(neigh.coord))) {
					if(this.checkpointStack.isEmpty()) {
						return null;
					}
					lastCheckpoint = this.checkpointStack.pop();
				}

				console.log('Going to checkpoint [' + lastCheckpoint.x + ',' + lastCheckpoint.y+']');
				const backTrace = this.backTrace(lastCheckpoint);
	
				for(let coord of backTrace) {
					this.current = coord;
					currentTile = map.getTile(coord);
					yield {
						type: 'GOTO',
						tile: currentTile
					}
				}
			} else {
				currentTile = map.getTile(this.current); 
			}

			// 2) walk to the first walkable neighbour
			const neighbors = currentTile.directionalNeighbors; // this order is important!
			let neighbourToWalk: Coord = null;
			let neighboursToWalk = 0;

			for (let neigh of neighbors) {
				if (neigh) {
					if(!this.isExplored(neigh.coord)) {
						this.exploreTile(neigh.coord, neigh.type);
						yield {
							type: 'EXPLORE',
							tile: neigh
						}
					}
					if(!this.isVisited(neigh.coord) && neigh.isWalkable) {
						neighbourToWalk = neigh.coord;
						neighboursToWalk++;
					}
				}
			}

			if(neighboursToWalk > 1) {
				// we push the CROSSROAD to the stack (not the neighbour)
				// due to backtracking to the last milestone
				this.checkpointStack.push(this.current);
			}

			if(neighbourToWalk) {
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

		this.blindMap.generateNeighbors();
		console.log(this.blindMap.print());
		// at this moment, the salesman knows the map
		// let's use dijsktra to find the shortest path from A to B
		return null;
	}

	private updateBackTrack(from: Coord, to: Coord) {
		this.backTrack[this.coordToIndex(to)] = this.coordToIndex(from);
	}

	private backTrace(newCoord: Coord): Coord[] {
		// first run
		if(newCoord.eq(this.current)) {
			return [newCoord];
		}

		if (this.blindMap.getTile(newCoord).type === 'UNKNOWN') {
			throw new Error('I don\'t know what is there!');
		}
		if (!this.blindMap.getTile(newCoord).isWalkable) {
			throw new Error('I can\'t go there!');
		}

		const distX = Math.abs(newCoord.x - this.current.x);
		const distY = Math.abs(newCoord.y - this.current.y);
		const isNeighbor = distX <= 1 && distY <= 1 && distX !== distY; // ignore diagonal 
		if(isNeighbor) {
			return [newCoord]
		} else {
			// we need to backtrack
			//console.log(`Need to go from [${this.current.x},${this.current.y}] to [${newCoord.x}, ${newCoord.y}]`);
			
			const output = [];
			let step = this.backTrack[this.coordToIndex(this.current)];

			const toIndex = this.coordToIndex(newCoord);

			while(true) {
				const stepCoord = this.blindMap.indexToCoord(step);
				output.push(stepCoord);
				if(step === toIndex) {
					break;
				}
				step = this.backTrack[step];
			}
			return output;
		}
	}

	coordToIndex = (coord: Coord): number => this.blindMap.coordToIndex(coord);
	indexToCoord = (index: number): Coord => this.blindMap.indexToCoord(index);

	private isVisited(coord: Coord) {
		return this.visitedNodes.has(this.coordToIndex(coord));
	}

	private visitNewNode(coord: Coord) {
		this.visitedNodes.add(this.coordToIndex(coord));
		if(!this.current.eq(coord)) {
			this.updateBackTrack(this.current, coord);
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