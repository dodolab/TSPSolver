import { PriorityQueue } from '../PriorityQueue';

test('Will maintain the LIFO order for items with the same priority', () => {
	const queue = new PriorityQueue<number>();
	queue.enqueue(1);
	queue.enqueue(2);
	queue.enqueue(3);
	queue.enqueue(4);
	queue.enqueue(5);

	expect(queue.dequeue()).toBe(1);
	expect(queue.dequeue()).toBe(2);
	expect(queue.dequeue()).toBe(3);
	expect(queue.dequeue()).toBe(4);
	expect(queue.dequeue()).toBe(5);
});

test('Will prioritize items with higher priority (lower number)', () => {
	const queue = new PriorityQueue<number>();
	queue.enqueue(1, 5);
	queue.enqueue(2, 2);
	queue.enqueue(3, 1);
	queue.enqueue(4, 5);
	queue.enqueue(5, 5);

	expect(queue.dequeue()).toBe(3);
	expect(queue.dequeue()).toBe(2);
	expect(queue.dequeue()).toBe(1);
	expect(queue.dequeue()).toBe(4);
	expect(queue.dequeue()).toBe(5);
});