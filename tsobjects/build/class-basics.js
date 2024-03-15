"use strict";
// object which implements interface, must have prop name and i/f method getName(): string
let dog = {
    name: "Spot",
    getName() {
        return this.name;
    }
};
console.log(dog.name); // OUT: Spot
class Human {
    name;
    age;
    hairColor;
    // ctor
    constructor(name, age, hairColor) {
        this.name = name;
        this.age = age;
        this.hairColor = hairColor;
    }
    getIntroduction() {
        return `Hello, my name is ${this.name}`;
    }
    getIntroductionTo(name) {
        //console.log(`Hello, ${name}, my name is ${this.name}`);
        return `Hello, ${name}, my name is ${this.name}`;
    }
}
// define instances of the class and use instance methods
let human = new Human("Nikola", 123, "brown");
let human2 = new Human("Bob", 123, "brown");
console.log(human.getIntroduction());
console.log(human.getIntroductionTo("Bob"));
console.log(human2.getIntroductionTo("Nikola"));
// OUT: \tsobjects> tsc    \tsobjects> node .\build\class-basics.js
// Hello, my name is Nikola
// Hello, Bob, my name is Nikola
// Hello, Nikola, my name is Bob
