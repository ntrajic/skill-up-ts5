type Person = { name: string, hairColor?: string, age?: number };   // hairColor and age are OPTIONAL props

let person: Person = {
    name: "Nikola",
    hairColor: "brown",
    age: 123,
};

// let person: {name: string, hairColor: string, age: number} = {          // typing
//     name: "Nikola",
//     hairColor: "brown",
//     age: 123,
// };

//person.haircolor = "blonde";   // bad, Color w/ capital

let person2: Person = {
    name: "John"
};

// custom object type def
let niksHairColor: string = person.hairColor || "Bald"

