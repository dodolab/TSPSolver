import { MapGrid } from './MapGrid';
import { Coord } from './Coord';
import { MapExplorer } from './MapExplorer';
import { PathFinder } from './PathFinder';


const WIDTH = 10;
const HEIGHT = 10;
// todo CR mapa
const arr = [
	'.', 'o', '.', '.', 'o', 'x', '.', 'o', 'x', 'x', 
	'.', '.', '.', '.', 'x', 'x', '.', '.', '.', '.', 
	'.', 'x', 'x', '.', 'x', '.', '.', '.', '.', '.', 
	'o', '.', 'x', 'x', '.', 'x', '.', '.', '.', '.', 
	'.', '.', '.', 'x', 'o', '.', 'x', '.', '.', 'o', 
	'.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.', 
	'.', '.', 'o', 'x', 'x', '.', '.', 'x', '.', '.', 
	'.', '.', '.', '.', 'x', '.', 'x', 'x', '.', '.', 
	'.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 
	'o', '.', '.', '.', 'x', '.', 'x', 'o', '.', '.', 
];

const realMap = new MapGrid(WIDTH, HEIGHT);

for (let i = 0; i < HEIGHT; i++) {
	for (let j = 0; j < WIDTH; j++) {
		switch(arr[WIDTH * i + j]) {
			case '.':
				realMap.setTile(new Coord(j, i), 'ROAD');
				break;
			case 'x':
				realMap.setTile(new Coord(j, i), 'WALL');
				break;
			case 'o':
				realMap.setTile(new Coord(j, i), 'CITY');
				break;
			default:
				throw new Error('Unknown map tile');
		}
	}
}
realMap.generateNeighbors();
realMap.print();


const getStartingCity = () => {
	console.log('Finding a starting city:');
	const cities = realMap.mapArray.filter(a => a.type === 'CITY').length;
	console.log('Cities: ' + cities);
	const randomLoc = Math.floor(cities / 2);

	let cnt = 0;
	const cityTile = realMap.mapArray.find((val) => val.type === 'CITY' && ++cnt === randomLoc);
	console.log('Initial pos: ');
	cityTile.coord.print()
	return cityTile;
}

const originalCoord = getStartingCity();
const explorer = new MapExplorer(WIDTH, HEIGHT);

const gen = explorer.exploreMap(originalCoord.coord, realMap);
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const width = canvas.width;

const drawCanvas = () => {
	const stack = explorer.checkpointStack.getNodes();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < WIDTH; i++) {
		for (let j = 0; j < HEIGHT; j++) {
			const coord = new Coord(i, j);
			const tile = explorer.blindMap.getTile(coord);
			switch(tile.type) {
				case 'UNKNOWN':
					ctx.fillStyle = '#11111155';	
				break;
				case 'ROAD':
					ctx.fillStyle = '#22992255';	
				break;
				case 'WALL':
					ctx.fillStyle = '#55555555';	
				break;
				case 'CITY':
					ctx.fillStyle = '#CD444455';	
				break;
			}
			if(explorer.current.eq(tile.coord)) {
				ctx.fillStyle = '#EFEFEF';
			}
			const blockSize = width / WIDTH;
			ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);
			ctx.font = '18px courier new';
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(`[${i},${j}]`, i * blockSize + 10, j * blockSize + 45);

			const backTrace = explorer.backTrack[explorer.coordToIndex(coord)];
			if(backTrace) {
				const toCoord = explorer.indexToCoord(backTrace);
				const isLeft = toCoord.x === coord.x - 1;
				const isRight = toCoord.x === coord.x + 1;
				const isTop = toCoord.y === coord.y - 1;
				const isBottom = toCoord.y === coord.y + 1;
				ctx.fillStyle = '#FFFF00';
				const symbol = isLeft ? '←' : isRight ? '→' : isTop ? '↑' : '↓';
				ctx.font = '30px courier new';
				ctx.fillText(symbol, i * blockSize + 30, j * blockSize + 70);
			}

			const isInStack = stack.find(t => t.eq(coord));
			if(isInStack) {
				ctx.fillStyle = '#ADADAD';
				ctx.fillRect(i * blockSize, j * blockSize, 10, 10);
			}
		}

	}

}

let lastCoord: Coord = null;

let interval = setInterval(() => {
	const status = gen.next();
	drawCanvas();
	if(status.done) {
		clearInterval(interval);
	} else {
		lastCoord = status.value.tile.coord;
	}
}, 20);


// new PathFinder().findPath(lastCoord, originalCoord.coord, realMap)

// another ideas:
// https://en.wikipedia.org/wiki/Flood_fill
// https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

