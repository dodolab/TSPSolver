import { MapGenerator } from '../algorithms/map-generator';
import { makeCoord } from '../structs/coord';
import { MapExplorer } from '../algorithms/map-explorer';

const SEED = 1001;

test('Will generate a trivial 1x1 map', () => {
	const generator = new MapGenerator(SEED);
	generator.generateMap(1, 1, 1, 0);

	expect(generator.generatedMap.width).toBe(1);
	expect(generator.generatedMap.height).toBe(1);
	expect(generator.generatedMap.getTile(makeCoord(0, 0)).type).toBe('CITY');
});

test('Will generate a 5x10 map with 3 walls and 5 cities', () => {
	const generator = new MapGenerator(SEED);
	generator.generateMap(5, 10, 5, 3);

	expect(generator.generatedMap.width).toBe(5);
	expect(generator.generatedMap.height).toBe(10);
	expect(generator.generatedMap.mapArray.filter(t => t.type === 'CITY')).toHaveLength(5);
	expect(generator.generatedMap.mapArray.filter(t => t.type === 'WALL')).toHaveLength(3);
});

test('Will generate a 10x10 map with dense amount of walls', () => {
	const generator = new MapGenerator(SEED);
	generator.generateMap(10, 10, 5, 80);

	expect(generator.generatedMap.width).toBe(10);
	expect(generator.generatedMap.height).toBe(10);

	// it will probably not contain all 80 walls due to the nature of the algorithm, but we 
	// definitely expect that there will be lots of walls
	expect(generator.generatedMap.mapArray.filter(t => t.type === 'WALL').length).toBeGreaterThan(50);
});

test('Will generate a 10x10 dense map where all cities can be explored', () => {
	const generator = new MapGenerator(SEED);
	generator.generateMap(10, 10, 5, 80);


	const firstCityCoord = generator.generatedMap.mapArray.find(c => c.type === 'CITY').coord;
	const explorer = new MapExplorer();
	explorer.exploreMap(firstCityCoord, generator.generatedMap);
	
	const notExploredWalkable = generator.generatedMap.mapArray.filter(tile => 
		tile.type === 'CITY' && !explorer.exploredNodes.has(generator.generatedMap.coordToIndex(tile.coord)));
	expect(notExploredWalkable).toHaveLength(0);
});
