type User = {
    id?: string,        // optional 
    name?: string,      // optional
    email: string,
    age: number,
};

type NewUserData = Pick<User, "name" | "email" | "age">;
type PartialUser = Partial<User>;
type ConstantUser = Readonly<User>;

let user: ConstantUser = {
    id: '123',
    name: 'Nikola',
    email: 'nikola@email.com',
    age: 123,
};
// user.id = '234';  // cannot assign, it's readonly propery

let partialUser: PartialUser = {
    id: '123',
    //favouriteColor: 'Blue',  //does not exist in paritalUser
}

let newUserData: NewUserData = {
    name: "nikola",
    email: "nikola@email.com",
    age: 123
}
