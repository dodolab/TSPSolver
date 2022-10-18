class PriorityQueue {
    constructor() {
        this.collection = [];
    }
    // we store [index, priority]
    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    };
    dequeue() {
        let value = this.collection.shift();
        return value;
    }; isEmpty() {
        return (this.collection.length === 0)
    };
}


let WIDTH = 30;
let HEIGHT = 20;

let arr = [];
const BLOCK_UNDEFINED = 0;
const BLOCK_ROAD = 1;
const BLOCK_WALL = 2;
const BLOCK_CITY = 3;

const salesman = {
    x: 0,
    y: 0
}

for(let i = 0; i < WIDTH; i++) {
    for(let j = 0; j < HEIGHT; j++) {
        const rand = Math.random();
        if(rand > 0.75) {
            if(rand > 0.9) {
                arr.push(BLOCK_CITY);
            } else {
                arr.push(BLOCK_WALL);
            }
        } else {
            arr.push(BLOCK_ROAD);
        }
    }
}



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

const print = (array = arr) => {
    let otp = "";
    array.forEach((val, index) => {
        otp += `${val}`;
        if (index !== 0 && ((index + 1) % WIDTH) === 0) {
            otp += '\n';
        }
    });
    console.log(otp);
}

const coordToIndex = (x, y) => {
    if(x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) {
        return -1;
    }
    return y * WIDTH + x;
}

const indexToCoord = (x) => {
    return {x: x % WIDTH, y: Math.floor(x / WIDTH)};
}

const putSalesmanIntoMap = () => {
    console.log('Put into map');
    const cities = arr.filter(a => a === BLOCK_CITY).length;
    console.log('Cities: ' + cities);
    //const randomLoc = Math.floor(Math.random() * cities);
    const randomLoc = 2;
    console.log('Random loc: ' + randomLoc);
    let cnt = 0;
    const index = arr.findIndex((val, index) => {
        if (val === BLOCK_CITY && ++cnt === randomLoc) {
            return true;
        }
        //cnt++;
    });
    const coord = indexToCoord(index);
    salesman.x = coord.x;
    salesman.y = coord.y;
    console.log('Found pos: ', index, salesman.x, salesman.y);
}

const getNeighbors = (x, y, diagonal = true) => {
    if(diagonal) {
        return [
            arr[coordToIndex(x - 1, y - 1)], arr[coordToIndex(x, y - 1)], arr[coordToIndex(x + 1, y - 1)],
            arr[coordToIndex(x - 1, y)], arr[coordToIndex(x, y)], arr[coordToIndex(x + 1, y)],
            arr[coordToIndex(x - 1, y + 1)], arr[coordToIndex(x, y + 1)], arr[coordToIndex(x + 1, y + 1)]
        ].map(v => v ?? BLOCK_UNDEFINED)
    } else {
        return [
            BLOCK_UNDEFINED, arr[coordToIndex(x, y - 1)], BLOCK_UNDEFINED,
            arr[coordToIndex(x - 1, y)], arr[coordToIndex(x, y)], arr[coordToIndex(x + 1, y)],
            BLOCK_UNDEFINED, arr[coordToIndex(x, y + 1)], BLOCK_UNDEFINED
        ].map(v => v ?? BLOCK_UNDEFINED)
    }
}

const exploreMap = () => {
    let exarr = [];
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            exarr.push(BLOCK_UNDEFINED);
        }
    }

    exarr[coordToIndex(salesman.x, salesman.y)] = BLOCK_CITY;
    print(exarr);

    const NODE_NEW = 0;
    const NODE_EXPLORED = 1;
    const helpArray = [...exarr].map(val => NODE_NEW);
    const stack = [];
    stack.push(salesman);

    console.log('Searching');
    print(helpArray);
    while(stack.length !== 0) {
        // pop
        const qCoord = stack[stack.length - 1];
        stack.splice(stack.length - 1, 1);
        const qCoordIndex = coordToIndex(qCoord.x, qCoord.y);

        if(helpArray[qCoordIndex] !== NODE_EXPLORED) {
            helpArray[qCoordIndex] = NODE_EXPLORED;
            // explore map
            exarr[qCoordIndex] = arr[qCoordIndex];

            // get all neighbors including diagonals
            const neighbors = getNeighbors(qCoord.x, qCoord.y, true);
            neighbors.forEach((val, index) => {
                // get neighbor coord
                const coord = {x: index % 3, y: Math.floor(index / 3) };
                const isDiagonal = index === 0 || index === 2 || index === 6 || index === 8;
                const isCurrent = index === 4; // we can skip the current node

                if(!isCurrent && val !== BLOCK_UNDEFINED) {
                    const bigMapCoord = { // [1, 1] is the center
                        x: qCoord.x + coord.x - 1,
                        y: qCoord.y + coord.y - 1
                    };
                    const bigMapIndex = coordToIndex(bigMapCoord.x, bigMapCoord.y);
                    if(!isDiagonal && helpArray[bigMapIndex] !== NODE_EXPLORED) {
                        if(val !== BLOCK_WALL) {
                            stack.push(bigMapCoord);
                        }
                    }
                    // we can look diagonally, but can't go there
                    // if there is a wall, we can ignore it
                    if(isDiagonal && val === BLOCK_WALL) {
                        helpArray[bigMapIndex] = NODE_EXPLORED;
                        salesman.x = bigMapCoord.x;
                        salesman.y = bigMapCoord.y;
                        exarr[bigMapIndex] = arr[bigMapIndex];
                    }
                }
            });
        }

        print(helpArray);
    }
    print(exarr);

    // at this moment, the salesman knows the map
    // let's use dijsktra to find the shortest path from A to B

}


const findPathWithDijkstra = (startCoord, endCoord, arr) => {
    console.log('Running Dijkstra', startCoord, endCoord);
    let steps = {};
    let backtrace = {};
    let pq = new PriorityQueue();

    const startIndex = coordToIndex(startCoord.x, startCoord.y);
    const endIndex = coordToIndex(endCoord.x, endCoord.y);

    steps[startIndex] = 0;

    arr.forEach((val, index) => {
        if(index !== startIndex) {
            steps[index] = Infinity;
        }
    });

    pq.enqueue([startIndex, 0]);

    while (!pq.isEmpty()) {
        let currentIndex = pq.dequeue()[0]; 
        let currentCoord = indexToCoord(currentIndex);
        
        const neighbors = getNeighbors(currentCoord.x, currentCoord.y, false);
        // skip the point where we actually are
        neighbors.forEach((val, index) => {
            if (index !== 4 && val !== BLOCK_UNDEFINED && val !== BLOCK_WALL) {
                const coord = {x: index % 3, y: Math.floor(index / 3) };
                const bigMapCoord = { // [1, 1] is the center
                    x: currentCoord.x + coord.x - 1,
                    y: currentCoord.y + coord.y - 1
                };
                const bigMapIndex = coordToIndex(bigMapCoord.x, bigMapCoord.y);

                let price = steps[currentIndex] + 1;
                if(price < steps[bigMapIndex]) {
                    steps[bigMapIndex] = price;
                    backtrace[bigMapIndex] = currentIndex;
                    pq.enqueue([bigMapIndex, price]);
                }
            }
        });
    }
    let path = [indexToCoord(endIndex)];
    let lastStep = endIndex; 
    while (lastStep && lastStep !== startIndex) {
        path.unshift(indexToCoord(backtrace[lastStep]));
        lastStep = backtrace[lastStep];
    }
    console.log(path);
    console.log(steps[endIndex]);
}

print();
putSalesmanIntoMap();
const firstSalesmanLoc = { ...salesman };
exploreMap();
findPathWithDijkstra(salesman, firstSalesmanLoc, arr);