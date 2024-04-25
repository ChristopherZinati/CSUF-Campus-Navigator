const graph = {
    'A': {'B': 5, 'C': 3},
    'B': {'D': 2},
    'C': {'D': 1},
    'D': {}
};

const places = {
    'A' : 'Titan Sudent Union',
    'B' : 'State College Parking Structure',
    'C' : 'Pollack Library',
    'D' : 'Clayes Performing Arts Center'
 }

//for priority queue functionality
class PriorityQueue {
    constructor(){
        this.queue = [];
    }

    enqueue(node, priority){
        this.queue.push({node, priority});
        this.sort();
    }

    dequeue(){
        return this.queue.shift();
    }

    sort(){
        this.queue.sort((a,b) => a.priority - b.priority)
    }

    isEmpty(){
        return this.queue.length === 0;
    }
}

function dijkstra(graph, origin, dest){
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue ();

    for(let node in graph){
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[origin] = 0;
    pq.enqueue(origin, 0);
    while(!pq.isEmpty()){
        const {node : curr, priority : currDistance} = pq.dequeue();
        if (curr === dest) break;

        for(let neighbor in graph[curr]){
            const distance = currDistance + graph[curr][neighbor];
            if(distance < distances[neighbor]){
                distances[neighbor] = distance;
                previous[neighbor] = curr;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    if (previous[dest] === null){
        return {path: [], distance: Infinity};
    }

    const shortestPathNodes = [];
    let node = dest;
    while(node !== null){
        shortestPathNodes.unshift(node);
        node = previous[node];
    }

    const shortestPath = {
        path : shortestPathNodes.map(node => places[node]),
        distance : distances[dest]
    };

    return shortestPath;
}
const sourceNode = 'A';
const destinationNode = 'C';

const result = dijkstra(graph, places, sourceNode, destinationNode);
console.log(`Shortest path from ${places[sourceNode]} to ${places[destinationNode]}:`, result.path);
console.log(`Total distance: ${result.distance}`);