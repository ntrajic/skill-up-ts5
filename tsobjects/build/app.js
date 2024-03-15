"use strict";
let person = {
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
let person2 = {
    name: "John"
};
// custom object type def
let niksHairColor = person.hairColor || "Bald";
