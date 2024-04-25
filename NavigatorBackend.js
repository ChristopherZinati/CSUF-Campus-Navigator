const graph = {
    A: { B: 1, C: 4 },      // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
    B: { A: 1, C: 2, D: 5 },  // ... and so on for other nodes
    C: { A: 4, B: 2, D: 1 },  // for testing purposes only
    D: { B: 5, C: 1 }
};

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