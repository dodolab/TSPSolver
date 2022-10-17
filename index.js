let WIDTH = 30;
let HEIGHT = 20;

let arr = [];
const BLOCK_EMPTY = 0;
const BLOCK_WALL = 1;
const BLOCK_CITY = 2;

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
            arr.push(BLOCK_EMPTY);
        }
    }
}*/

WIDTH = HEIGHT = 6;
arr = [
    0,0,0,0,0,0,
    0,1,0,2,0,0,
    2,0,0,0,0,1,
    1,1,1,1,0,1,
    0,0,0,0,0,2,
    2,0,1,0,0,0,
];

const print = () => {
    let otp = "";
    arr.forEach((val, index) => {
        otp += `${val}`;
        if(index !== 0 && ((index + 1) % WIDTH) === 0) {
            otp +='\n';
        }
    });
    console.log(otp);
}

const coordToIndex = (x, y) => {
    return y * WIDTH + x;
}

const indexToCoord = (x) => {
    return [x % WIDTH, Math.floor(x / WIDTH)];
}

const putSalesmanIntoMap = () => {
    console.log('Put into map');
    const zeroes = arr.filter(a => a === 0).length;
    console.log('Zeroes: ' + zeroes);
    //const randomLoc = Math.floor(Math.random() * zeroes);
    const randomLoc = 14;
    console.log('Random loc: ' + randomLoc);
    let cnt = 0;
    const index = arr.findIndex((val, index) => {
        if(val === BLOCK_EMPTY && ++cnt === randomLoc) {
            return true;
        }
        //cnt++;
    });
    const coord = indexToCoord(index);
    salesman.x = coord[0];
    salesman.y = coord[1];
    console.log('Found pos: ', index, salesman.x, salesman.y);
}

print();
putSalesmanIntoMap();