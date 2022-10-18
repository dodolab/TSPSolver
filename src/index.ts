type Neighbor = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

class Coord {
	private _x: number;
	private _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	add(coord: Coord) {
		return new Coord(this.x + coord.x, this.y + coord.y);
	}

	left() {
		return new Coord(this.x - 1, this.y);
	}

	right() {
		return new Coord(this.x + 1, this.y);
	}

	top() {
		return new Coord(this.x, this.y-1);
	}

	bottom() {
		return new Coord(this.x, this.y + 1);
	}

	topLeft() {
		return new Coord(this.x - 1, this.y - 1);
	}

	topRight() {
		return new Coord(this.x + 1, this.y - 1);
	}

	bottomLeft() {
		return new Coord(this.x - 1, this.y + 1);
	}

	bottomRight() {
		return new Coord(this.x + 1, this.y + 1);
	}
}

type TileType = 'UNKNOWN' | 'ROAD' | 'WALL' | 'CITY';


class MapTile {
	neighbors: Record<Neighbor, MapTile>;
	// directional neighbors in an array. Can be null if there is no such neighbour!
	directionalNeighbors: [MapTile, MapTile, MapTile, MapTile];
	coord: Coord;
	type: TileType;

	constructor(coord: Coord, type: TileType) {
		this.coord = coord;
		this.type = type;
	}

	get isWalkable() {
		return this.type === 'ROAD' || this.type === 'CITY';
	}
}

class MapGrid {
	mapArray: MapTile[] = [];
	width: number;
	height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
		
	coordToIndex = (coord: Coord): number => {
		const { x, y } = coord;
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return -1;
		}
		return y * this.width + x;
	}

	indexToCoord = (x: number): Coord => {
		return new Coord(x % this.width, Math.floor(x / this.width));
	}

	isInside = (coord: Coord) => {
		return coord.x >= 0 && coord.y >= 0 && coord.x < this.width && coord.y < this.height;
	}

	setTile(coord: Coord, type: TileType) {
		this.mapArray[this.coordToIndex(coord)] = new MapTile(coord, type);
	}

	getTile(coord: Coord) {
		if(!this.isInside(coord)) {
			return null;
		}
		return this.mapArray[this.coordToIndex(coord)];
	}

	generateNeighbors() {
		for(let tile of this.mapArray) {
			// tile will contain links to all neighbors
			tile.neighbors = {
				left: this.getTile(tile.coord.left()),
				right: this.getTile(tile.coord.right()),
				top: this.getTile(tile.coord.top()),
				bottom: this.getTile(tile.coord.bottom()),
				topLeft: this.getTile(tile.coord.topLeft()),
				topRight: this.getTile(tile.coord.topRight()),
				bottomLeft: this.getTile(tile.coord.bottomLeft()),
				bottomRight: this.getTile(tile.coord.bottomRight()),
			}
			// this order is very important!!!
			tile.directionalNeighbors = [tile.neighbors.top, tile.neighbors.right, tile.neighbors.bottom, tile.neighbors.left]
		}
	}

	print = () => {
		let otp = "";
		this.mapArray.forEach((val, index) => {
			switch(val.type) {
				case 'CITY':
					otp += 'o';
				break;
				case 'WALL':
					otp += 'x';
				break;
				case 'ROAD':
					otp += '.';
				break;
				case 'UNKNOWN':
					otp += '?';
				break;
			}
			if (index !== 0 && ((index + 1) % this.width) === 0) {
				otp += '\n';
			}
		});
		console.log(otp);
	}
}


// todo we only have priorities 0 and 1 ...
class PriorityQueue {
	collection: [Coord, number] [] = [];

	// we store [index, priority]
	enqueue(element: Coord, priority: number = 0) {
		if (this.isEmpty) {
			this.collection.push([element, priority]);
		} else {
			let added = false;
			for (let i = 1; i <= this.collection.length; i++) {
				if (priority < this.collection[i - 1][1]) {
					this.collection.splice(i - 1, 0, [element, priority]);
					added = true;
					break;
				}
			}
			if (!added) {
				this.collection.push([element, priority]);
			}
		}
	}

	dequeue() {
		let value = this.collection.shift();
		return value;
	}

	get isEmpty() {
		return (this.collection.length === 0)
	}
}

const WIDTH = 30;
const HEIGHT = 20;

class Salesman {
	coord: Coord;
	map: MapGrid;

	constructor(width: number, height: number) {
		this.map = new MapGrid(width, height);
		for(let i = 0; i < width; i++) {
			for(let j = 0; j < height; j++) {
				this.map.setTile(new Coord(i, j), 'UNKNOWN');
			}
		}
	}

	isExplored(coord: Coord) {
		return this.map.getTile(coord).type !== 'UNKNOWN';
	}

	setInitialCoord(coord: Coord, tile: MapTile) {
		this.coord = coord;
		// must be unexplored!
		//this.map.setTile(coord, tile.type);
	}
	
	exploreTile(tile: MapTile) {
		this.map.setTile(tile.coord, tile.type);
	}

	goto(newCoord: Coord) {
		if(!this.map.getTile(newCoord).isWalkable) {
			throw new Error('I can\'t go there!');
		}
		this.coord = newCoord;
	}
}

const salesman = new Salesman(WIDTH, HEIGHT);
const realMap = new MapGrid(WIDTH, HEIGHT);

for (let i = 0; i < WIDTH; i++) {
	for (let j = 0; j < HEIGHT; j++) {
		const rand = Math.random();
		if (rand > 0.75) {
			if (rand > 0.9) {
				realMap.setTile(new Coord(i, j), 'CITY');
			} else {
				realMap.setTile(new Coord(i, j), 'WALL');
			}
		} else {
			realMap.setTile(new Coord(i, j), 'ROAD');
		}
	}
}
realMap.generateNeighbors();
realMap.print();


/*
WIDTH = HEIGHT = 6;
arr = [
	1, 1, 1, 1, 1, 1,
	1, 2, 1, 3, 1, 1,
	3, 1, 1, 1, 1, 2,
	2, 2, 2, 2, 1, 2,
	1, 1, 1, 1, 1, 3,
	3, 1, 2, 1, 1, 1,
];*/


const putSalesmanIntoMap = () => {
	console.log('Put into map');
	const cities = realMap.mapArray.filter(a => a.type === 'CITY').length;
	console.log('Cities: ' + cities);
	//const randomLoc = Math.floor(Math.random() * cities);
	const randomLoc = 2;
	console.log('Random loc: ' + randomLoc);
	let cnt = 0;
	const cityTile = realMap.mapArray.find((val) => {
		if (val.type === 'CITY' && ++cnt === randomLoc) {
			return true;
		}
	});
	salesman.setInitialCoord(cityTile.coord, cityTile);
	console.log('Found pos: ', salesman.coord);
}


const exploreMap = () => {
	salesman.map.print();

	// todo use better structure
	const stack: Coord[] = [];
	stack.push(salesman.coord);

	console.log('Searching');
	while (stack.length !== 0) {
		// pop
		const qCoord = stack[stack.length - 1];
		stack.splice(stack.length - 1, 1);

		if (!salesman.isExplored(qCoord)) {
			const tile = realMap.getTile(qCoord);
			salesman.exploreTile(tile);

			// get all neighbors, for now without diagonals
			const neighbors = tile.directionalNeighbors;
			neighbors.forEach((val, index) => {
				if(val && !salesman.isExplored(val.coord)) {
					stack.push(val.coord);
				}
			});
		}
	}

	salesman.map.generateNeighbors();
	salesman.map.print();

	// at this moment, the salesman knows the map
	// let's use dijsktra to find the shortest path from A to B
}


const findPathWithDijkstra = (startCoord: Coord, endCoord: Coord, map: MapGrid) => {
	console.log('Running Dijkstra', startCoord, endCoord);
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
	while (lastStep && lastStep !== startIndex) {
		path.unshift(map.indexToCoord(backtrace[lastStep]));
		lastStep = backtrace[lastStep];
	}
	console.log(path);
	console.log(steps[endIndex]);
}

putSalesmanIntoMap();
const originalCoord = salesman.coord;
exploreMap();
findPathWithDijkstra(originalCoord, salesman.coord, salesman.map);