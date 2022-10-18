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

/*for(let i = 0; i < WIDTH; i++) {
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
}*/

WIDTH = HEIGHT = 6;
arr = [
    1, 1, 1, 1, 1, 1,
    1, 2, 1, 3, 1, 1,
    3, 1, 1, 1, 1, 2,
    2, 2, 2, 2, 1, 2,
    1, 1, 1, 1, 1, 3,
    3, 1, 2, 1, 1, 1,
];

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
        const qCoord = stack[0];
        stack.splice(0, 1);
        const qCoordIndex = coordToIndex(qCoord.x, qCoord.y);

        if(helpArray[qCoordIndex] !== NODE_EXPLORED) {
            helpArray[qCoordIndex] = NODE_EXPLORED;

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
                    }
                }
            });
        }

        print(helpArray);
    }
}

print();
putSalesmanIntoMap();
exploreMap();