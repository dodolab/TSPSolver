import { Looper, LooperData, Runner, StateName, RunnerParams } from '../runner';
import { StateMachine } from '../structs';

class PerformanceLooper implements Looper {
	speedMultiplier: number = 1;
	baseSpeed: number = 1;
	runner: Runner;
	currTime: number;
	startTime: number;
	finishToken = false;

	pause(ms: number) {
		// no-op
	}

	start(params: RunnerParams) {
		console.log('......................................')
		console.log(`Map:    ${params.mapWidth}x${params.mapHeight}`);
		console.log(`Cities: ${params.citiesNum}`);
		console.log(`Walls:  ${params.wallsNum}`);
		console.log('');
		this.runner = new Runner();
		this.runner.stateMachine.addOnStateChangeObserver((previous, next) => this.onStateChange(previous, next));
		this.runner.start(params);
		console.log('......................................')
	}

	startLoop(machine: StateMachine<unknown, LooperData>) {
		do {
			machine.run();
		} while (machine.isRunning && !this.finishToken);

		this.finishToken = false;
	}

	private onStateChange(previous: string, next: string) {
		const diff = Math.round(performance.now() - this.currTime);
		switch (next as StateName) {
			case 'GENERATE':
				this.currTime = this.startTime = performance.now();
				break;
			case 'EXPLORE':
				console.log(`Map generator:      ${diff}ms`);
				this.currTime = performance.now();
				break;
			case 'SEARCH_BACK':
				console.log(`Map explore:        ${diff}ms`);
				this.currTime = performance.now();
				break;
			case 'WALK_BACK':
				// not interesting
				break;
			case 'TSP_PREPARE':
				console.log(`Searching way back: ${diff}ms`);
				this.currTime = performance.now();
				break;
			case 'TSP_SOLVE':
				console.log(`Spanning tree:      ${diff}ms`);
				this.currTime = performance.now();
				break;
			case 'TSP_WALK':
				console.log(`TSP solver:         ${diff}ms`);
				console.log(`Total               ${Math.round(performance.now() - this.startTime)}ms`);
				console.log(`Memory used:        ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`)
				this.finishToken = true;
				break;
		}

	}
}


// performance tester
// runs 4x3x3 = 36 tests for various map configurations
const runPerformanceTest = () => {
	const looper = new PerformanceLooper();
	const defaultParams: Partial<RunnerParams> = {
		randomSeed: 123,
		startCityIndex: 0,
		visualSpeed: 1,
		looper,
	}

	const mapSizes = [5, 10, 20, 30];
	mapSizes.forEach((size) => {	
		for(let i = 0; i < 3; i++) {
			const cities = Math.ceil(size * (i + 1) / 5) + 1;

			for(let j = 0; j < 3; j++) {
				const walls = (size * size) * (j / 2) * 0.8;

				looper.start({
					...defaultParams,
					citiesNum: cities,
					wallsNum: walls,
					mapWidth: size,
					mapHeight: size,
				} as RunnerParams);
			}

		}

	});
};

runPerformanceTest();