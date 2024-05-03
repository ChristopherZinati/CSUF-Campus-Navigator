// Graph representation
const graph = {
    'A': {'C': 564, 'B': 700},
    'B': {'A': 700, 'C': 274},
    'C': {'A': 564, 'B': 274, 'E': 1472, 'H': 1562},
    'D': {'E': 385, 'M': 184},
    'E': {'D': 385, 'C': 1472, 'G': 225, 'F': 351, 'M': 347},
    'F': {'I': 512, 'N': 440,  'M': 101, 'G': 326},
    'G': {'E': 225, 'F': 326, 'H': 191},
    'H': {'G': 191, 'J': 412, 'C': 1526, 'K': 378, 'I': 528},
    'I': {'F': 512, 'H': 528, 'K': 166, 'U': 290, 'R': 469, 'Q': 662, 'O': 384, 'N': 479},
    'J': {'H': 412, 'K': 326, 'L': 538},
    'K': {'H': 378, 'J': 326, 'L': 545, 'U': 180, 'I': 166},
    'L': {'J': 538, 'K': 545, 'U': 180},
    'M': {'D': 184, 'E': 347, 'F': 101, 'N': 192},
    'N': {'F': 440, 'M': 192, 'I': 479, 'T': 657},
    'O': {'I': 384, 'R': 167, 'Q': 237, 'P': 36},
    'P': {'O': 36, 'R': 179, 'Q': 94, 'T': 337},
    'Q': {'O': 327, 'R': 132, 'S': 195, 'P': 94},
    'R': {'O': 167, 'U': 159, 'S': 196, 'Q': 132},
    'S': {'R': 196, 'Q': 195},
    'T': {'N': 657, 'P': 337},
    'U': {'I': 290, 'K': 180, 'L': 545, 'R': 159}
};

// Mapping of place codes to names
const places = {
    'A': 'Parking Lot A',
    'B': 'Parking Lot G',
    'C': 'Titan Stadium/Goodwin Field', 
    'D': 'State College Parking Structure',
    'E': 'Student Recreation Center',
    'F': 'Titan Shops',
    'G': 'Titan Gymnasium',
    'H': 'Student Wellness Center',
    'I': 'Pollack Library',
    'J': 'Engineering and Computer Science Buildings',
    'K': 'Education Classroom Building',
    'L': 'Eastside Parking Structure',
    'M': 'Titan Student Union',
    'N': 'Clayes Performing Arts Center',
    'O': 'McCarthy Hall',
    'P': 'Dan Black Hall',
    'Q': 'Langsdorf Hall',
    'R': 'Gordon Hall',
    'S': 'Mihaylo Hall',
    'T': 'Nutwood Parking Structure',
    'U': 'Humanities/Social Sciences'
};

// Runtime calculator for measuring algorithm execution time
class RuntimeCalculator {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
    }
    start() {
        this.startTime = performance.now();
    }
    stop() {
        this.endTime = performance.now();
    }
    getRuntime() {
        if (this.startTime === 0 || this.endTime === 0) {
            return null;
        } else {
            return this.endTime - this.startTime;
        }
    }
}

// Priority queue for Dijkstra's Algorithm
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(node, priority) {
        this.queue.push({ node, priority });
        this.sort();
    }

    dequeue() {
        return this.queue.shift();
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Breadth-First Search (BFS) Algorithm
function bfs(graph, start, end) {
    const bfsRuntime = new RuntimeCalculator();
    bfsRuntime.start();

    const visited = {};
    const queue = [];
    const distances = {};
    const previous = {};

    queue.push(start);
    visited[start] = true;
    distances[start] = 0;
    previous[start] = null;

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === end) {
            bfsRuntime.stop();
            return reconstructPath(previous, start, end, distances[end], bfsRuntime.getRuntime());
        }

        for (const neighbor in graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
                distances[neighbor] = distances[node] + 1;
                previous[neighbor] = node;
            }
        }
    }

    bfsRuntime.stop();
    return [null, bfsRuntime.getRuntime()];
}

// Depth-First Search (DFS) Algorithm
function dfs(graph, start, end) {
    const dfsRuntime = new RuntimeCalculator();
    dfsRuntime.start();

    const visited = {};
    const stack = [];
    const distances = {};
    const previous = {};

    stack.push(start);
    visited[start] = true;
    distances[start] = 0;
    previous[start] = null;

    while (stack.length > 0) {
        const node = stack.pop();

        if (node === end) {
            dfsRuntime.stop();
            return reconstructPath(previous, start, end, distances[end], dfsRuntime.getRuntime());
        }

        for (const neighbor in graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                stack.push(neighbor);
                distances[neighbor] = distances[node] + 1;
                previous[neighbor] = node;
            }
        }
    }

    dfsRuntime.stop();
    return [null, dfsRuntime.getRuntime()];
}

// Dijkstra's Algorithm
function dijkstra(graph, start, end) {
    const dijkstraRuntime = new RuntimeCalculator();
    dijkstraRuntime.start();

    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }

    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { node: curr, priority: currDistance } = pq.dequeue();

        if (curr === end) break;

        for (const neighbor in graph[curr]) {
            const distance = currDistance + graph[curr][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = curr;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    if (previous[end] === null) {
        dijkstraRuntime.stop();
        return [null, dijkstraRuntime.getRuntime()];
    }

    const shortestPathNodes = [];
    let node = end;
    while (node !== null) {
        shortestPathNodes.unshift(node);
        node = previous[node];
    }

    const shortestPath = {
        path: shortestPathNodes.map(node => places[node]),
        distance: distances[end]
    };

    dijkstraRuntime.stop();
    return [shortestPath, dijkstraRuntime.getRuntime()];
}

// Reconstruct the path from start to end
function reconstructPath(previous, start, end, distance, runtime) {
    const shortestPathNodes = [];
    let node = end;
    let totalDistance = 0; // Initialize total distance

    while (node !== null) {
        shortestPathNodes.unshift(node);
        const nextNode = previous[node];
        if (nextNode !== null) {
            totalDistance += graph[node][nextNode]; // Add distance to total
        }
        node = nextNode;
    }

    const shortestPath = {
        path: shortestPathNodes.map(node => places[node]),
        distance: totalDistance // Update distance to total distance
    };

    return [shortestPath, runtime];
}
