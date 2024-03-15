"use strict";
class Queue {
    items;
    constructor() {
        this.items = [];
    }
    add(newItem) {
        this.items.push(newItem);
    }
    remove() {
        return this.items.shift();
    }
}
let stringQueue = new Queue();
stringQueue.add("Hello");
//stringQueue.add(4);
// \tsobjects> tsc
// \tsobjects> node .\build\generics.js
console.log(`the first element in the queue is: ${stringQueue.remove()}`); // OUT: the first element in the queue is: Hello
let numberQueue = new Queue();
numberQueue.add(4);
//numberQueue.add("Hello");// error, arg has to be number type
console.log(numberQueue); // OUT: Queue { items: [ 4 ] }
function print(value) {
    console.log(`The value is: ${value}`);
}
print("HELLO"); // OUT: The value is: HELLO
print(4); // OUT: The value is: 4
// class Queue {
//     private items: string[];
//
//     constructor() {
//         this.items = [];
//     }
//
//     add(newItem: string) {
//         this.items.push(newItem);
//     }
//
//     remove(): string | undefined {
//         return this.items.shift();
//     }
// }
// class NumberQueue {
//     private items: number[];
//
//     constructor() {
//         this.items = [];
//     }
//
//     add(newItem: number) {
//         this.items.push(newItem);
//     }
//
//     remove(): number | undefined {
//         return this.items.shift();
//     }
// }
