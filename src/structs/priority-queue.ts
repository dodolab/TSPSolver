
/**
 * Priority queue that stores generic nodes and their priorities
 */;
export class PriorityQueue<T> {
	collection: [T, number] [] = [];

	enqueue(element: T, priority: number = 0) {
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

	getNodes(): T[] {
		return this.collection.map(c => c[0]);
	}

	dequeue(): T {
		let value = this.collection.shift();
		return value[0];
	}

	get isEmpty() {
		return (this.collection.length === 0)
	}
}