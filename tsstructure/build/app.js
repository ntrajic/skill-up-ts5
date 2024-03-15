import { add } from './util';
console.log(`The sum of 1 and 2 is ${add(1, 2)}`); // The sum of 1 and 2 is 3   // calling an extern function
//--------------------------------------------------------------------------------------------------------------
let x = 10;
let pi = 3.1415;
let greeting = "Hello";
let isConnected = true;
let person = {
    name: "Nikola",
    hairColor: "brown",
};
let numbers = [1, 2, 3];
let personTuple = ["Bob", 40, true];
let something = "hello";
something = 42;
something = true;
let data = ["hello", 1, true, []]; // heterogenous array better represented with Unios
let nothing = undefined;
let anotherNothing = null;
let myArr = []; // can't infer type, so: let muyArr: never[] = never  // telling myArr must be typed
let myArr1 = []; // proper way to type myArr1 to array of string types
