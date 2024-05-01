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
}

const places = {
    'A' : 'Parking Lot A',
    'B' : 'Parking Lot G',
    'C' : 'Titan Stadium/Goodwin Field', 
    'D' : 'State College Parking Structure',
    'E' : 'Student Recreation Center',
    'F' : 'Titan Shops',
    'G' : 'Titan Gymnasium',
    'H' : 'Student Wellness Center',
    'I' : 'Pollack Library',
    'J' : 'Engineering and Computer Science Buildings',
    'K' : 'Education Classroom Building',
    'L' : 'Eastside Parking Structure',
    'M' : 'Titan Student Union',
    'N' : 'Clayes Performing Arts Center',
    'O' : 'McCarthy Hall',
    'P' : 'Dan Black Hall',
    'Q' : 'Langsdorf Hall',
    'R' : 'Gordon Hall',
    'S' : 'Mihaylo Hall',
    'T' : 'Nutwood Parking Structure',
    'U' : 'Humanities/Social Sciences'
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
