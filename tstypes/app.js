var x = 10;
var pi = 3.1415;
var greeting = "Hello";
var isConnected = true;
var person = {
    name: "Nikola",
    hairColor: "brown",
};
var numbers = [1, 2, 3];
var personTuple = ["Bob", 40, true];
var something = "hello";
something = 42;
something = true;
var data = ["hello", 1, true, []]; // heterogenous array better represented with Unios
var nothing = undefined;
var anotherNothing = null;
var myArr = []; // can't infer type, so: let muyArr: never[] = never  // telling myArr must be typed
var myArr1 = []; // proper way to type myArr1 to array of string types
