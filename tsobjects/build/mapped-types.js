"use strict";
let user = {
    id: '123',
    name: 'Nikola',
    email: 'nikola@email.com',
    age: 123,
};
// user.id = '234';  // cannot assign, it's readonly propery
let partialUser = {
    id: '123',
    //favouriteColor: 'Blue',  //does not exist in paritalUser
};
let newUserData = {
    name: "nikola",
    email: "nikola@email.com",
    age: 123
};
