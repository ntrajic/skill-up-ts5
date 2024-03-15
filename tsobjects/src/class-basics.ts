interface NameObject {
    name: string;
    getName(): string;
}

// object which implements interface, must have prop name and i/f method getName(): string
let dog: NameObject = {
    name: "Spot",
    getName() {
        return this.name;
    }
}

console.log(dog.name);  // OUT: Spot

class Human {
    private name: string;
    private age: number;
    private hairColor: string;

    // ctor
    constructor(name: string, age: number, hairColor: string) {
        this.name = name;
        this.age = age;
        this.hairColor = hairColor;
    }

    public getIntroduction() : string { 
        return `Hello, my name is ${this.name}`;
    }

    public getIntroductionTo(name: string): string { 
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