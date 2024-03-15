let x: number = 10;
let pi: number = 3.1415;

let greeting: string = "Hello";
let isConnected: boolean = true;

let person: object = {
    name: "Nikola",
    hairColor: "brown",
}

let numbers: Array<number> = [1, 2, 3];
let personTuple: [string, number, boolean] = ["Bob", 40, true];
let something: any = "hello";
something = 42;
something = true;

let data: any[] = ["hello", 1, true, [] ]; // heterogenous array better represented with Unios

let nothing: undefined = undefined;
let anotherNothing: null = null;
let myArr = [];  // can't infer type, so: let muyArr: never[] = never  // telling myArr must be typed
let myArr1: string[] = []  // proper way to type myArr1 to array of string types