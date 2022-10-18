import { MapGrid } from './MapGrid';
import { Coord, makeCoord, coordEq } from './Coord';
import { MapExplorer, ExploreEvent } from './MapExplorer';
import { PathFinder, PathFinderEvent } from './PathFinder';
import { TSP, TSPEvent } from './TSP';
import Renderer from './Renderer';


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
		switch (arr[(10 * (i % 10)) + j % 10]) {
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
const pathFinder = new PathFinder();

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let lastCoord: Coord = null;

let exploreGenerator: Generator<ExploreEvent, ExploreEvent, void> = null;
let dijkstraGenerator: Generator<PathFinderEvent, PathFinderEvent, void> = null;

const tsp = new TSP();

let tspGenerator: Generator<TSPEvent, TSPEvent, void> = null;

let state: 'EXPLORE' | 'DIJKSTRA' | 'TSP_PREPARE' | 'TSP' | 'TSP_WALKTHROUGH' = 'EXPLORE';

let distanceArray: number[] = null;

let currentTourIndex = 0;

new Renderer().init(canvas, () => {

	if (state === 'EXPLORE') {
		if (!exploreGenerator) {
			exploreGenerator = explorer.exploreMapIteratively(originalCoord.coord, realMap);
		}
		const status = exploreGenerator.next();
		if (!status.done && status.value) {
			return {
				map: explorer.blindMap,
				highlights: [explorer.current],
				backtrace: explorer.backTrace,
				milestones: explorer.checkpointStack.getNodes()
			}
		} else {
			state = 'DIJKSTRA';
		}
	}

	if (state === 'DIJKSTRA') {
		if (!dijkstraGenerator) {
			dijkstraGenerator = pathFinder.findPathIteratively(explorer.current, originalCoord.coord, realMap);
		}
		const status = dijkstraGenerator.next();
		if (!status.done && status.value) {
			return {
				map: realMap,
				highlights: [status.value.currentCoord],
				backtrace: pathFinder.backTrace,
				milestones: pathFinder.queue.getNodes()
			}
		} else {
			state = 'TSP_PREPARE';
		}
	}

	if (state === 'TSP_PREPARE') {
		if(!distanceArray) {
			distanceArray = [];
		}
		// now for the salesman problem:
		// 1) for each city, run dijkstra
		const cities = realMap.mapArray.filter(a => a.type === 'CITY');
		const refPoint = realMap.mapArray.find(a => a.type === 'ROAD');
		const pathFinder = new PathFinder();

		let cityIndex = 0;
		let citiesCnt = cities.length;

		for (let city of cities) {
			pathFinder.findPath(city.coord, refPoint.coord, realMap);
			const minSteps = pathFinder.steps;
			let city2Index = 0;
			for (let city2 of cities) {
				// distance between CITY and CITY2
				const distIndex = city2Index * citiesCnt + cityIndex;
				distanceArray[distIndex] = minSteps[realMap.coordToIndex(city2.coord)];
				city2Index++;
			}
			cityIndex++;
		}
		state = 'TSP';
	}

	if (state === 'TSP') {
		const cities = realMap.mapArray.filter(a => a.type === 'CITY');
		
		if (!tspGenerator) {
			const cityWhereWeAre = cities.findIndex(c => coordEq(c.coord, originalCoord.coord));
			tspGenerator = tsp.solveIteratively(cityWhereWeAre, cities.length, distanceArray);
		}

		const status = tspGenerator.next();
		if (!status.done && status.value) {
			return {
				map: realMap,
				highlights: [cities[status.value.currentCity].coord, cities[status.value.nextCity].coord],
			}
		} else {
			state = 'TSP_WALKTHROUGH';
		}
	}


	if(state === 'TSP_WALKTHROUGH') {
		
	}

	return null;
});



const initResizeHandler = () => {
	resizeHandler();
	window.addEventListener('resize', resizeHandler);
}

const resizeHandler = () => {
	if (window.innerWidth > window.innerHeight) {
		canvas.height = window.innerHeight;
		canvas.width = canvas.height * (HEIGHT / WIDTH);
	} else {
		canvas.width = window.innerWidth;
		canvas.height = canvas.width * (HEIGHT / WIDTH);
	}
}

initResizeHandler();

(function () {
	const parent = document.querySelector('.range-slider');

	const rangeS = parent.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>,
		numberS = parent.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;

	rangeS.forEach((el: HTMLElement) => {
		el.oninput = () => {
			let slide1 = parseFloat(rangeS[0].value),
				slide2 = parseFloat(rangeS[1].value);

			if (slide1 > slide2) {
				[slide1, slide2] = [slide2, slide1];
			}

			numberS[0].value = `${slide1}`;
			numberS[1].value = `${slide2}`;
		}
	});

	numberS.forEach((el) => {
		el.oninput = () => {
			let number1 = parseFloat(numberS[0].value),
				number2 = parseFloat(numberS[1].value);

			if (number1 > number2) {
				let tmp = number1;
				numberS[0].value = `${number2}`;
				numberS[1].value = `${tmp}`;
			}

			rangeS[0].value = `${number1}`;
			rangeS[1].value = `${number2}`;
		}
	});
})();

// another ideas:
// https://en.wikipedia.org/wiki/Flood_fill
// https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

