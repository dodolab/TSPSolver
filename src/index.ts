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


type ContextState = 'GENERATE' | 'EXPLORE' | 'SEARCH_BACK' | 'WALK_BACK' | 'TSP_PREPARE' | 'TSP_SOLVE' | 'TSP_WALK';



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

	start(renderer: CanvasRenderer, width: number, height: number, cities: number, walls: number) {
		this.mapWidth = width;
		this.mapHeight = height;
		this.mapCities = cities;
		this.mapWalls = walls;

		this.exploreGenerator = this.pathFinderGenerator = this.tspGenerator = this.mstGenerator = null;
		this.completeTour = null;
		this.state = 'GENERATE';
		const baseSpeed = renderer.speed;

		renderer.start(() => {
			switch(this.state) {
				case 'GENERATE':
					renderer.speed = baseSpeed;
					return this.handleGenerate();
				case 'EXPLORE':
					renderer.speed = baseSpeed;
					return this.handleExplore();
				case 'SEARCH_BACK':
					renderer.speed = baseSpeed;
					return this.handleSearchBack();
				case 'WALK_BACK':
					renderer.speed = baseSpeed / 10;
					return this.handleWalkBack();
				case 'TSP_PREPARE':
					renderer.speed = baseSpeed / 10;
					return this.handleTSPPrepare();
				case 'TSP_SOLVE':
					renderer.speed = baseSpeed * 10;
					return this.handleTSPSolve();
				case 'TSP_WALK':
					renderer.speed = baseSpeed / 2;
					return this.handleTSPWalk();
			}
		});
	}

	handleGenerate(): CanvasRendererData {
		if (!this.generatorGenerator) {
			this.generatorGenerator = this.generator.generateMapIteratively(this.mapWidth, this.mapHeight, this.mapCities, this.mapWalls);
		}
		const status = this.generatorGenerator.next();
		if (!status.done && status.value) {
			return {
				map: this.generator.generatedMap,
				currentNode: status.value.currentTile.coord,
			}
		} else {
			this.map = this.generator.generatedMap;
			this.salesmanStart = selectRandomCity(this.map).coord;
			this.state = 'EXPLORE';
		}
	}

	handleExplore(): CanvasRendererData {
		if (!this.exploreGenerator) {
			this.exploreGenerator = this.explorer.exploreMapIteratively(this.salesmanStart, this.map);
		}
		const status = this.exploreGenerator.next();
		if (!status.done && status.value) {
			return {
				map: this.explorer.blindMap,
				currentNode: this.explorer.current,
				backtrace: this.explorer.backTrace,
				milestones: this.explorer.checkpointStack.getNodes()
			}
		} else {
			this.state = 'SEARCH_BACK';
		}
	}

	handleSearchBack(): CanvasRendererData {
		if (!this.pathFinderGenerator) {
			this.pathFinderGenerator = this.pathFinder.findPathIteratively(this.explorer.current, this.salesmanStart, this.map);
		}
		const status = this.pathFinderGenerator.next();
		if (!status.done && status.value) {
			return {
				map: this.map,
				currentNode: this.explorer.current,
				backtrace: this.pathFinder.backTrace,
				milestones: this.pathFinder.queue.getNodes()
			}
		} else {
			this.walkBack = this.pathFinder.closestPath;
			this.walkBackIndex = 0;
			this.state = 'WALK_BACK';
		}
	}

	handleWalkBack(): CanvasRendererData {
		if(this.walkBackIndex < this.walkBack.length) {
			return {
				map: this.map,
				currentNode: this.walkBack[this.walkBackIndex++],
				backtrace: this.pathFinder.backTrace
			}
		} else {
			this.state = 'TSP_PREPARE';
		}
	}

	handleTSPPrepare(): CanvasRendererData {
		if (!this.mstGenerator) {
			const cities = this.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
			this.mstGenerator = this.mst.findMSTIteratively(cities, this.map);
		}
		const status = this.mstGenerator.next();
		if (!status.done && status.value) {
			return {
				map: this.map,
				highlights: [status.value.currentCoord],
				backtrace: status.value.minPath,
			}
		} else {
			this.state = 'TSP_SOLVE';
		}
	}

	handleTSPSolve(): CanvasRendererData {
		const cities = this.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
		if (!this.tspGenerator) {
			
			const salesmanCity = cities.findIndex(c => coordEq(c, this.salesmanStart));
			this.tspGenerator = this.tsp.solveIteratively(salesmanCity, cities.length, this.mst.spanningTree);
		}
		const status = this.tspGenerator.next();
		if (!status.done && status.value) {
			return {
				map: this.map,
				highlights: [cities[status.value.currentCity], cities[status.value.nextCity]],
			}
		} else {
			this.state = 'TSP_WALK';
		}
	}

	handleTSPWalk(): CanvasRendererData {
		if(!this.completeTour) {
			this.completeTour = [];
			this.completeTourIndex = 0;
			const cities = this.map.mapArray.filter(a => a.type === 'CITY').map(city => city.coord);
			
			for(let i = 0; i < this.tsp.tour.length; i++) {
				const cityFrom = cities[this.tsp.tour[i]];
				const cityTo = cities[this.tsp.tour[(i !== (this.tsp.tour.length - 1)) ? (i + 1) : 0]];
				const path = this.pathFinder.findPath(cityFrom, cityTo, this.map);
				this.completeTour.push(...path);
			}
		}

		const output = {
			map: this.map,
			currentNode: this.completeTour[this.completeTourIndex],
		}
		this.completeTourIndex = (this.completeTourIndex + 1) % this.completeTour.length;
		return output;
	}
}


const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);
const context = new Context();
context.start(renderer, 10, 10, 10, 80);

const ui = new UIRenderer();
ui.init(canvas, 10, 10);

// another ideas:
// https://en.wikipedia.org/wiki/Flood_fill
// https://gamedev.stackexchange.com/questions/55344/algorithm-for-exploring-filling-grid-map

