interface Car {
    make: string,
    model?: string | number;
    numberOfMiles: number,
}

let car: Car = {
    make: 'Chevrolet',
    model: 'Camaro',
    numberOfMiles: 10000,
}