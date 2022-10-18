import { Coord, coordEq, MapGrid } from './structs';
import { 
	MapExplorer, 
	ExploreEvent, 
	PathFinder, 
	PathFinderEvent, 
	TSPSolver, 
	TSPEvent, 
	MSTFinder, 
	MSTFinderEvent, 
	MapGenerator, 
	MapGeneratorEvent } from './algorithms';
import { selectRandomCity } from './utils';
import { CanvasRenderer, CanvasRendererData, UIRenderer } from './renderers';
import { StateMachine, State } from './structs/state-machine';


type StateName = 'GENERATE' | 'EXPLORE' | 'SEARCH_BACK' | 'WALK_BACK' | 'TSP_PREPARE' | 'TSP_SOLVE' | 'TSP_WALK';

type ContextState = {
	name: StateName;
};

class Context {
	mapWidth: number;
	mapHeight: number;
	mapCities: number;
	mapWalls: number;

	map: MapGrid;
	salesmanStart: Coord;
	state: ContextState;

	generator = new MapGenerator();
	generatorGenerator: Generator<MapGeneratorEvent, MapGeneratorEvent, void> = null;

	explorer = new MapExplorer();
	exploreGenerator: Generator<ExploreEvent, ExploreEvent, void> = null;
	
	pathFinder = new PathFinder();
	pathFinderGenerator: Generator<PathFinderEvent, PathFinderEvent, void> = null;
	
	walkBack: Coord[];
	walkBackIndex: number;

	mst = new MSTFinder();
	mstGenerator: Generator<MSTFinderEvent, MSTFinderEvent, void> = null;

	tsp = new TSPSolver();
	tspGenerator: Generator<TSPEvent, TSPEvent, void> = null;
	
	completeTour: Coord[];
	completeTourIndex: number;

	baseSpeed = 2;

	renderer: CanvasRenderer<Context>;
}

class Runner {
	start(renderer: CanvasRenderer<Context>, width: number, height: number, cities: number, walls: number) {
		const context = new Context();
		context.mapWidth = width;
		context.mapHeight = height;
		context.mapCities = cities;
		context.mapWalls = walls;

		context.renderer = renderer;
		context.exploreGenerator = context.pathFinderGenerator = context.tspGenerator = context.mstGenerator = null;
		context.completeTour = null;

		const machine = new StateMachine<Context, CanvasRendererData>();
		machine
			.addState(GenerateState)
			.addState(ExploreState)
			.addTransition(GenerateState.name, ExploreState.name)
			.addState(SearchBackState)
			.addTransition(ExploreState.name, SearchBackState.name)
			.addState(WalkBackState)
			.addTransition(SearchBackState.name, WalkBackState.name)
			.addState(TSPPrepareState)
			.addTransition(WalkBackState.name, TSPPrepareState.name)
			.addState(TSPSolveState)
			.addTransition(TSPPrepareState.name, TSPSolveState.name)
			.addState(TSPWalkState)
			.addTransition(TSPSolveState.name, TSPWalkState.name)
			.setInitialState(GenerateState.name);

		renderer.start(machine, context);
	}
}


const GenerateState: State<Context, CanvasRendererData> & ContextState = {
	name: 'GENERATE',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed;
		context.generatorGenerator = context.generator.generateMapIteratively(context.mapWidth, context.mapHeight, context.mapCities, context.mapWalls);
	},
	handlerFunc: (context) => {
		const status = context.generatorGenerator.next();
		if (!status.done && status.value) {
			return {
				map: context.generator.generatedMap,
				currentNode: status.value.currentTile.coord,
			}
		} else {
			context.map = context.generator.generatedMap;
			context.salesmanStart = selectRandomCity(context.map).coord;
			return null;
		}
	}
}

const ExploreState: State<Context, CanvasRendererData> & ContextState = {
	name: 'EXPLORE',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed;
		context.exploreGenerator = context.explorer.exploreMapIteratively(context.salesmanStart, context.map);
	},
	handlerFunc: (context) => {
		const status = context.exploreGenerator.next();
		if (!status.done && status.value) {
			return {
				map: context.explorer.blindMap,
				currentNode: context.explorer.current,
				backtrace: context.explorer.backTrace,
				milestones: context.explorer.checkpointStack.getNodes()
			}
		} else {
			return null;
		}
	}
}

const SearchBackState: State<Context, CanvasRendererData> & ContextState = {
	name: 'SEARCH_BACK',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed;
		context.pathFinderGenerator = context.pathFinder.findPathIteratively(context.explorer.current, context.salesmanStart, context.map);
	},
	handlerFunc: (context) => {
		const status = context.pathFinderGenerator.next();
		if (!status.done && status.value) {
			return {
				map: context.map,
				currentNode: context.explorer.current,
				backtrace: context.pathFinder.backTrace,
				milestones: context.pathFinder.queue.getNodes()
			}
		} else {
			context.walkBack = context.pathFinder.closestPath;
			context.walkBackIndex = 0;
			return null;
		}
	}
}

const WalkBackState: State<Context, CanvasRendererData> & ContextState = {
	name: 'WALK_BACK',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed / 10;
	},
	handlerFunc: (context) => {
		if(context.walkBackIndex < context.walkBack.length) {
			return {
				map: context.map,
				currentNode: context.walkBack[context.walkBackIndex++],
				backtrace: context.pathFinder.backTrace
			}
		} else {
			return null;
		}
	}
}

const TSPPrepareState: State<Context, CanvasRendererData> & ContextState = {
	name: 'TSP_PREPARE',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed / 10;
		const cities = context.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
		context.mstGenerator = context.mst.findMSTIteratively(cities, context.map);
	},
	handlerFunc: (context) => {
		const status = context.mstGenerator.next();
		if (!status.done && status.value) {
			return {
				map: context.map,
				highlights: [status.value.currentCoord],
				backtrace: status.value.minPath,
			}
		} else {
			return null;
		}
	}
}

const TSPSolveState: State<Context, CanvasRendererData> & ContextState = {
	name: 'TSP_SOLVE',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed * 10;
		const cities = context.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
		const salesmanCity = cities.findIndex(c => coordEq(c, context.salesmanStart));
		context.tspGenerator = context.tsp.solveIteratively(salesmanCity, cities.length, context.mst.spanningTree);
	},
	handlerFunc: (context) => {
		const cities = context.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
		const status = context.tspGenerator.next();
		if (!status.done && status.value) {
			return {
				map: context.map,
				highlights: [cities[status.value.currentCity], cities[status.value.nextCity]],
			}
		} else {
			return null;
		}
	}
}

const TSPWalkState: State<Context, CanvasRendererData> & ContextState = {
	name: 'TSP_WALK',
	firstRun: (context) => {
		context.renderer.speed = context.baseSpeed / 2;
		context.completeTour = [];
		context.completeTourIndex = 0;
		const cities = context.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
		
		for(let i = 0; i < context.tsp.tour.length; i++) {
			const cityFrom = cities[context.tsp.tour[i]];
			const cityTo = cities[context.tsp.tour[(i !== (context.tsp.tour.length - 1)) ? (i + 1) : 0]];
			const path = context.pathFinder.findPath(cityFrom, cityTo, context.map);
			context.completeTour.push(...path);
		}
	},
	handlerFunc: (context) => {
		const output = {
			map: context.map,
			currentNode: context.completeTour[context.completeTourIndex],
		}
		context.completeTourIndex = (context.completeTourIndex + 1) % context.completeTour.length;
		return output;
	}
}


const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const renderer = new CanvasRenderer<Context>(canvas);
const runner = new Runner();
runner.start(renderer, 10, 10, 10, 80);

const ui = new UIRenderer();
ui.init(canvas, 10, 10);

// another ideas:
// https://en.wikipedia.org/wiki/Flood_fill
// https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

