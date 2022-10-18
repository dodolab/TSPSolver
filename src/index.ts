import { MapGrid } from './MapGrid';
import { Coord, makeCoord, coordEq } from './Coord';
import { MapExplorer } from './MapExplorer';
import { PathFinder } from './PathFinder';
import { TSP } from './TSP';


// if bigger than 10x10, it will repeat the pattern from the map below
let WIDTH = 10;
let HEIGHT = 10;

let arr = [
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
		// repeat pattern from the map above
		switch(arr[(10 * (i % 10)) + j % 10]) {
			case '.':
				realMap.setTile(makeCoord(j, i), 'ROAD');
				break;
			case 'x':
				realMap.setTile(makeCoord(j, i), 'WALL');
				break;
			case 'o':
				realMap.setTile(makeCoord(j, i), 'CITY');
				break;
			default:
				throw new Error('Unknown map tile');
		}
	}
}
realMap.generateNeighbors();

const getStartingCity = () => {
	console.log('Finding a starting city:');
	const cities = realMap.mapArray.filter(a => a.type === 'CITY').length;
	console.log('Cities: ' + cities);
	const randomLoc = Math.floor(cities / 2);

	let cnt = 0;
	const cityTile = realMap.mapArray.find((val) => val.type === 'CITY' && ++cnt === randomLoc);
	return cityTile;
}

const originalCoord = getStartingCity();
const explorer = new MapExplorer(WIDTH, HEIGHT);

const gen = explorer.exploreMapIteratively(originalCoord.coord, realMap);
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
canvas.height = canvasWidth * (HEIGHT / WIDTH);

const drawCanvas = () => {
	const stack = explorer.checkpointStack.getNodes();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < WIDTH; i++) {
		for (let j = 0; j < HEIGHT; j++) {
			const coord = makeCoord(i, j);
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
			if(coordEq(explorer.current, tile.coord)) {
				ctx.fillStyle = '#EFEFEF';
			}
			const blockSize = canvasWidth / WIDTH;
			ctx.fillRect(i * blockSize, j * blockSize, blockSize - 1, blockSize - 1);
			const ratio = (WIDTH / 10);

			if(WIDTH < 30) {
				ctx.font = `${18/ratio}px courier new`;
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(`[${i},${j}]`, i * blockSize + 10 / ratio, j * blockSize + 45 / ratio);

				const backTrace = explorer.backTrack[realMap.coordToIndex(coord)];
				
				if(backTrace) {
					const toCoord = realMap.indexToCoord(backTrace);
					const isLeft = toCoord.x === coord.x - 1;
					const isRight = toCoord.x === coord.x + 1;
					const isTop = toCoord.y === coord.y - 1;
					const isBottom = toCoord.y === coord.y + 1;
					ctx.fillStyle = '#FFFF00';
					const symbol = isLeft ? '←' : isRight ? '→' : isTop ? '↑' : '↓';
					ctx.font = `${30/ratio}px courier new`;
					ctx.fillText(symbol, i * blockSize + 30/ratio, j * blockSize + 70/ratio);
				}
	
				const isInStack = stack.find(t => coordEq(t, coord));
				if(isInStack) {
					ctx.fillStyle = '#ADADAD';
					ctx.fillRect(i * blockSize, j * blockSize, 10/ratio, 10/ratio);
				}
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
		
		// render dijkstra
		const path = new PathFinder().findPath(lastCoord, originalCoord.coord, realMap)
		const blockSize = canvasWidth / WIDTH;
		path.forEach(coord => {
			ctx.fillStyle = '#FF555522';
			ctx.fillRect(coord.x * blockSize, coord.y * blockSize, blockSize - 1, blockSize - 1);
		});

		// now for the salesman problem:
		// 1) for each city, run dijkstra
		const cities = realMap.mapArray.filter(a => a.type === 'CITY');
		const refPoint = realMap.mapArray.find(a => a.type === 'ROAD');
		const pathFinder = new PathFinder();

		const distanceArray = [];
		let cityIndex = 0;
		const citiesCnt = cities.length;

		for(let city of cities) {
			pathFinder.findPath(city.coord, refPoint.coord, realMap);
			const minSteps = pathFinder.steps;
			let city2Index = 0;
			for(let city2 of cities) {
				// distance between CITY and CITY2
				const distIndex = city2Index * citiesCnt + cityIndex;
				distanceArray[distIndex] = minSteps[realMap.coordToIndex(city2.coord)];
				city2Index++;
			}
			cityIndex++;
		}

		let print = '';
		for(let i = 0; i < citiesCnt; i++) {
			for(let j = 0; j < citiesCnt; j++) {
				let index = i * citiesCnt + j;
				print += `[${distanceArray[index]}] `;
			}
			print += '\n';
		}
		console.log(print);
		// 2) find solution for that spanning tree
		const cityWhereWeAre = cities.findIndex(c => coordEq(c.coord, originalCoord.coord));
		const tsp = new TSP();
		const tour = tsp.solve(cityWhereWeAre, citiesCnt, distanceArray);
	} else {
		lastCoord = status.value.tile.coord;
	}
}, 20);


// another ideas:
// https://en.wikipedia.org/wiki/Flood_fill
// https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

