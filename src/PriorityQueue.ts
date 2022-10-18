import { Coord } from './Coord';

export class PriorityQueue {
	collection: [Coord, number] [] = [];

	// we store [index, priority]
    // todo we only have 2 priorities: 0, 1
	enqueue(element: Coord, priority: number = 0) {
		if (this.isEmpty) {
			this.collection.push([element, priority]);
		} else {
			let added = false;
			for (let i = 1; i <= this.collection.length; i++) {
				if (priority < this.collection[i - 1][1]) {
					this.collection.splice(i - 1, 0, [element, priority]);
					added = true;
					break;
				}
			}
			if (!added) {
				this.collection.push([element, priority]);
			}
		}
	}

	dequeue() {
		let value = this.collection.shift();
		return value;
	}

	get isEmpty() {
		return (this.collection.length === 0)
	}
}