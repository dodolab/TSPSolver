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
import { StateMachine, State } from './structs/state-machine';


/**
 * Names for all states
 * GENERATE = generating map
 * EXPLORE = exploring map
 * SEARCH_BACK = searching the path to the first city
 * WALK_BACK = walking back to the first city
 * TSP_PREPARE = preparing spanning tree
 * TSP_SOLVE = solving TSP
 * TSP_WALK = walking between cities
 */
export type StateName = 'GENERATE' | 'EXPLORE' | 'SEARCH_BACK' | 'WALK_BACK' | 'TSP_PREPARE' | 'TSP_SOLVE' | 'TSP_WALK';

/**
 * A global mutable context for all states
 */
export type RunnerContext = RunnerParams & Partial<{
	map: MapGrid;
	startCityCoord: Coord;

	generator: MapGenerator;
	generatorGenerator: Generator<MapGeneratorEvent, MapGeneratorEvent, void>;

	explorer: MapExplorer;
	exploreGenerator: Generator<ExploreEvent, ExploreEvent, void>;

	pathFinder: PathFinder;
	pathFinderGenerator: Generator<PathFinderEvent, PathFinderEvent, void>;

	walkBack: Coord[];
	walkBackIndex: number;

	mst: MSTFinder;
	mstGenerator: Generator<MSTFinderEvent, MSTFinderEvent, void>;

	spanningTree: number[];

	tsp: TSPSolver;
	tspGenerator: Generator<TSPEvent, TSPEvent, void>;
	tspCurrentCityIndex: number; // just for UI info message

	allCities: Coord[];

	completeTour: Coord[];
	completeTourCost: number;
	completeTourIndices: number[];
	completeTourWalkIndex: number;
}>

/**
 * Input parameters for the runner
 */
export type RunnerParams = {
	mapWidth: number,
	mapHeight: number,
	randomSeed: number,
	startCityIndex: number,
	visualSpeed: number,
	citiesNum: number,
	wallsNum: number
	looper: Looper;
}

/**
 * Output parameters for looper (the ones that will be rendered)
 */
export type LooperData = {
	map: MapGrid;
	contextNodes?: Coord[];
	currentNode?: Coord;
	backtrace?: Map<number, number>;
	milestones?: Coord[];
}

/**
 * Looper interface that uses EventLoop to run the runner
 * Can be easily mocked
 */
export interface Looper {
	speedMultiplier: number;
	baseSpeed: number;
	pause(ms: number);
	startLoop(machine: StateMachine<unknown, LooperData>);
}

export class Runner {
	stateMachine = new StateMachine<RunnerContext, LooperData>();;
	context: RunnerContext;

	start(params: RunnerParams) {
		this.context = {
			...params
		}

		// initialize state machine with all transitions
		this.stateMachine
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
			.setInitialState(GenerateState.name)
			.setContext(this.context);

		// and run the whole thing!
		this.context.looper.startLoop(this.stateMachine);
	}
}


// ============================================================================================
//                             IMPLEMENTATION OF ALL STATES
// ============================================================================================

// typecheck helper
export type ContextState = {
	name: StateName;
};

const GenerateState: State<RunnerContext, LooperData> & ContextState = {
	name: 'GENERATE',
	firstRun: (context) => {
		context.generator = new MapGenerator(context.randomSeed);
		context.generatorGenerator = context.generator.generateMapIteratively(
			context.mapWidth, 
			context.mapHeight, 
			context.citiesNum, 
			context.wallsNum
		);
	},
	handlerFunc: (context): LooperData => {
		const status = context.generatorGenerator.next();
		if (!status.done && status.value) {
			// report to the looper
			return {
				map: context.generator.generatedMap,
				contextNodes: [status.value.currentTile.coord],
			}
		} else {
			// finish -> update context
			context.map = context.generator.generatedMap;
			context.allCities = context.map.mapArray.filter(a => a.type === 'CITY').map(a => a.coord);
			// generator could have decreased the total number of cities
			// we need to fix a few attributes
			context.startCityIndex = Math.min(context.startCityIndex, context.allCities.length - 1);
			context.startCityCoord = context.allCities[context.startCityIndex];
			// set the right city number
			context.citiesNum = context.allCities.length;
			return null;
		}
	}
}

const ExploreState: State<RunnerContext, LooperData> & ContextState = {
	name: 'EXPLORE',
	firstRun: (context) => {
		context.explorer = new MapExplorer();
		context.exploreGenerator = context.explorer.exploreMapIteratively(context.startCityCoord, context.map);
	},
	handlerFunc: (context): LooperData => {
		const status = context.exploreGenerator.next();
		if (!status.done && status.value) {
			// report to the looper
			return {
				map: context.explorer.blindMap,
				currentNode: context.explorer.current,
				backtrace: context.explorer.backTrace,
				milestones: context.explorer.checkpointStack.getNodes()
			}
		} else {
			return null;
		}
	},
}

const SearchBackState: State<RunnerContext, LooperData> & ContextState = {
	name: 'SEARCH_BACK',
	firstRun: (context) => {
		context.pathFinder = new PathFinder();
		context.pathFinderGenerator = context.pathFinder.findPathIteratively(
			context.explorer.current, 
			context.startCityCoord, 
			context.map);
	},
	handlerFunc: (context): LooperData => {
		const status = context.pathFinderGenerator.next();
		if (!status.done && status.value) {
			// report to the looper
			return {
				map: context.explorer.blindMap,
				currentNode: context.explorer.current,
				backtrace: context.pathFinder.backTrace,
				milestones: context.pathFinder.queue.getNodes()
			}
		} else {
			// finish and set some attributes
			context.walkBack = context.pathFinder.closestPath;
			context.walkBackIndex = 0;
			return null;
		}
	}
}

const WalkBackState: State<RunnerContext, LooperData> & ContextState = {
	name: 'WALK_BACK',
	handlerFunc: (context): LooperData => {
		if (context.walkBackIndex < context.walkBack.length) {
			// report to the looper
			return {
				map: context.explorer.blindMap,
				currentNode: context.walkBack[context.walkBackIndex++],
				backtrace: context.pathFinder.backTrace
			}
		} else {
			return null;
		}
	}
}

const TSPPrepareState: State<RunnerContext, LooperData> & ContextState = {
	name: 'TSP_PREPARE',
	firstRun: (context) => {
		context.mst = new MSTFinder();
		context.mstGenerator = context.mst.findMSTIteratively(context.allCities, context.map);
	},
	handlerFunc: (context): LooperData => {
		const status = context.mstGenerator.next();
		if (!status.done && status.value) {
			// report to the looper
			return {
				map: context.explorer.blindMap,
				contextNodes: [status.value.currentCoord],
				backtrace: status.value.backTrace,
			}
		} else {
			context.spanningTree = context.mst.spanningTree;
			return null;
		}
	},
	cleanUp: (context) => {
		// get rid of some memory
		context.mst = context.mstGenerator = null;
	}
}

const TSPSolveState: State<RunnerContext, LooperData> & ContextState = {
	name: 'TSP_SOLVE',
	firstRun: (context) => {
		// initialize TSP generator
		const salesmanCity = context.allCities.findIndex(c => coordEq(c, context.startCityCoord));
		context.tsp = new TSPSolver();
		context.tspGenerator = context.tsp.solveIteratively(salesmanCity, context.allCities.length, context.spanningTree);
	},
	handlerFunc: (context): LooperData => {
		const status = context.tspGenerator.next();
		if (!status.done && status.value) {
			context.tspCurrentCityIndex = status.value.currentCity;
			// report to the looper
			return {
				map: context.explorer.blindMap,
				contextNodes: [context.allCities[status.value.currentCity], context.allCities[status.value.nextCity]],
			}
		} else {
			return null;
		}
	},
	cleanUp: (context) => {
		// generate output data
		context.completeTour = [];
		context.completeTourWalkIndex = 0;
		context.completeTourCost = context.tsp.minTourCost;
		context.completeTourIndices = context.tsp.tour;

		for (let i = 0; i < context.completeTourIndices.length; i++) {
			const cityFrom = context.allCities[context.tsp.tour[i]];
			const cityTo = context.allCities[context.tsp.tour[(i !== (context.tsp.tour.length - 1)) ? (i + 1) : 0]];
			const path = context.pathFinder.findPath(cityFrom, cityTo, context.map);
			context.completeTour.push(...path);
		}

		// get rid of some memory
		context.tsp = context.tspGenerator = context.pathFinder = context.pathFinderGenerator = null;
	}
}

const TSPWalkState: State<RunnerContext, LooperData> & ContextState = {
	name: 'TSP_WALK',
	handlerFunc: (context): LooperData => {
		// infinite loop...
		const output = {
			map: context.map,
			currentNode: context.completeTour[context.completeTourWalkIndex],
		}
		context.completeTourWalkIndex = (context.completeTourWalkIndex + 1) % context.completeTour.length;
		return output;
	}
}