import { MapGrid } from "../structs/map-grid";
import { makeCoord, manhattanDist } from '../structs/coord';
import { MapTile } from '../structs/map-tile';
import { MapExplorer } from './map-explorer';
import Random from "./random-generator";

export type MapGeneratorEvent = {
	currentTile: MapTile;
}

export class MapGenerator {
	generatedMap: MapGrid;
	randomSeed: number;

	constructor(randomSeed: number = 2^20-1) {
		this.randomSeed = randomSeed;
	}

	generateMap(width: number, height: number, cities: number, walls: number) {
		const generator = this.generateMapIteratively(width, height, cities, walls);
		let val = generator.next();
		while (!val.done) {
			val = generator.next();
		}
		return this.generatedMap;
	}

	*generateMapIteratively(width: number, height: number, cities: number, walls: number): Generator<MapGeneratorEvent, MapGeneratorEvent, void> {
		this.generatedMap = new MapGrid(width, height);

		const random = new Random(this.randomSeed);

		// start with roads
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.generatedMap.setTile(makeCoord(i, j), 'ROAD');
				yield {
					currentTile: this.generatedMap.getTile(makeCoord(i, j))
				}
			}
		}

		this.generatedMap.generateNeighbors();

		// put walls
		let wallsPut = 0;
		let iteration = 0;

		while(wallsPut < walls) {
			const tilesWithoutWalls = this.generatedMap.mapArray.filter(tile => tile.type !== 'WALL');

			if(tilesWithoutWalls.length === 0) {
				// safety check
				break;
			}

			const randomTile = tilesWithoutWalls[Math.floor(random.float() * tilesWithoutWalls.length)];
			const wallsNearby = randomTile.directionalNeighbors.filter(neigh => neigh && neigh.type === 'WALL').length;

			// the more walls nearby, the higher the probability to put it exactly here
			// 93% for 8 neighbours, 83% for 7, ... 33% for 2, 23% for 1, 13% for 0
			const putWall = Math.floor(random.float() * 10) <= (wallsNearby * 1.5 + 2) / 1.5;
			if(putWall) {
				this.generatedMap.setTile(randomTile.coord, 'WALL');
				this.generatedMap.generateNeighbors(); // regenerate links
				wallsPut++;
				yield {
					currentTile: this.generatedMap.getTile(randomTile.coord)
				}
			}

			if(iteration++ > (width * height * 4)) {
				// another safety check
				break;
			}
		}

		// put cities
		let citiesPut = 0;
		iteration = 0;

		while(citiesPut < cities) {
			const tilesWithoutCities = this.generatedMap.mapArray.filter(tile => tile.type !== 'CITY' && tile.type !== 'WALL');

			if(tilesWithoutCities.length === 0) {
				// safety check, yet this should be really weird if the map would be full of cities...
				break;
			}

			const randomTile = tilesWithoutCities[Math.floor(random.float() * tilesWithoutCities.length)];
			const citiesNearby = randomTile.directionalNeighbors.filter(neigh => neigh && neigh.type === 'CITY').length;

			// the more cities nearby, the lower the probability to put it exactly here
			// 100% for 0 neighbours, 40% for 1 neighbour, 0% for 2 and more 
			const putCity = Math.floor(random.float() * 10) >= (citiesNearby * 6);
			if(putCity) {
				this.generatedMap.setTile(randomTile.coord, 'CITY');
				this.generatedMap.generateNeighbors(); // regenerate links
				citiesPut++;
				yield {
					currentTile: this.generatedMap.getTile(randomTile.coord)
				}
			}

			if(iteration++ > (width * height)) {
				// another safety check
				break;
			}
		}

		// brute-force test if all cities can be visited
		const explorer = new MapExplorer();
		const firstCityCoord = this.generatedMap.mapArray.filter(tile => tile.type === 'CITY')[0].coord;
		const cityTiles = this.generatedMap.mapArray.filter(tile => tile.type === 'CITY');
		
		explorer.exploreMap(firstCityCoord, this.generatedMap);
		let lockedCities = cityTiles.filter(tile => !explorer.visitedNodes.has(this.generatedMap.coordToIndex(tile.coord)));
		
		while(lockedCities.length !== 0) {
			// search for walls that have neighbours that were not visited
			// and sort them from closest to the starting node
			const allWalls = this.generatedMap.mapArray.filter(tile => tile.type === 'WALL');
			const suspiciousWalls = allWalls.filter(wall => wall.neighborsArr
				.find(neigh => neigh && neigh.isWalkable 
					&& !explorer.visitedNodes.has(this.generatedMap.coordToIndex(neigh.coord))))
				.sort((a, b) => manhattanDist(a.coord, firstCityCoord) - manhattanDist(b.coord, firstCityCoord));


			if(suspiciousWalls.length > 0) {
				// remove the closest suspicious wall
				const wallToRemove = suspiciousWalls[0];
				// transform to roads
				this.generatedMap.setTile(wallToRemove.coord, 'ROAD');
				yield {
					currentTile: this.generatedMap.getTile(wallToRemove.coord)
				}

				// refresh
				this.generatedMap.generateNeighbors();
				explorer.exploreMap(firstCityCoord, this.generatedMap);
				lockedCities = cityTiles.filter(tile => !explorer.visitedNodes.has(this.generatedMap.coordToIndex(tile.coord)));
			} else {
				// should not happen, but if it does, we will just remove the cities
				for(let lockedCity of lockedCities) {
					this.generatedMap.setTile(lockedCity.coord, 'ROAD');
					this.generatedMap.generateNeighbors();
					yield {
						currentTile: this.generatedMap.getTile(lockedCity.coord)
					}
				}
			}
		}

		this.generatedMap.generateNeighbors();
		return null;
	}
}