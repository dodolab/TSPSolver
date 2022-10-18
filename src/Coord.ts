export class Coord {
	private _x: number;
	private _y: number;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	eq(other: Coord) {
		return this.x === other.x && this.y === other.y;
	}

	left() {
		return new Coord(this.x - 1, this.y);
	}

	right() {
		return new Coord(this.x + 1, this.y);
	}

	top() {
		return new Coord(this.x, this.y - 1);
	}

	bottom() {
		return new Coord(this.x, this.y + 1);
	}

	topLeft() {
		return new Coord(this.x - 1, this.y - 1);
	}

	topRight() {
		return new Coord(this.x + 1, this.y - 1);
	}

	bottomLeft() {
		return new Coord(this.x - 1, this.y + 1);
	}

	bottomRight() {
		return new Coord(this.x + 1, this.y + 1);
	}

	print() {
        console.log(`[${this.x},${this.y}]`);
    }
}