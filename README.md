The traveling salesman problems abide by a salesman and a set of cities. 
The salesman has to visit every one of the cities starting from a certain one (e.g., the hometown) and to return to the same city. 
We want the salesman to be as fresh (and as rich) as possible in the end of his trip.

Our newest task is another variation of the traveling salesman problem that is in general solvable by using the graph theory.
Salesman world rules
- There is a random m x n grid (i.e. 30 x 20), consists from 1 x 1 square cells. This is salesman’s world.
- Salesman has no map when he appears in the world. That means he doesn’t know about the cities and walls location in advance and has to explore the map at first
- Salesman is allowed to travel one cell at time - up, down, left and right. Not diagonally.
- Anyway, Salesman can see what is in the all the adjacent cells around him, including diagonal ones.
- Cell represents either the road (grass), the city, or the wall
- Salesman cannot hit the wall, god mode is not allowed
- Salesman will appear in random city at the start

Objectives - those are dependent, so start from #1, then #2 and then #3
- Explore the whole map from the entry city to explore the whole world in the most effective way possible - by this, I mean to make sure every cell is visited.
- When the exploration step is completed, find the shortest path back to the very first city where the salesman appeared.
- When the salesman is back, the ultimate goal is to evaluate all costs (distance) permutations and pick the cheapest one so the salesman can save as much time as possible during his next trip, while visiting all cities again. EACH CITY CAN BE VISITED EXACTLY ONCE.

Additional notes
- There was a discussion about the potential visualisation using some graphical UI. This is completely optional, but nice to have.
- There are no rules what tech stack you have to use. Use whatever you want.
- Use any graph algorithms you believe will be suitable for those 3 steps (exploring, shortest path back, shortest possible trip route).
- HINT: The last one will be the most complex and there is no need to be shy to use brute force :slightly_smiling_face: More info about the problem: https://www.geeksforgeeks.org/travelling-salesman-problem-set-1/


The best approach (I am aware of) consists of running a 
- Depth-First Branch-and-Bound heuristic search algorithm where the heuristic is the cost of the Minimum Spanning Tree (MST). 
- Since the MST can be computed in polynomial time with either the Prim's algorithm or the Kruskal's algorithm, 
- then it can be expected to return solutions in a reasonable amount of time. 
- For a wonderful discussion of these two algorithms I do strongly suggest you to have a look at The Algorithm Design Manual