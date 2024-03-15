"use strict";
class Computer {
    boot() {
        console.log("Computer is booting");
    }
    shutDown() {
        console.log("Computer is shutting down");
    }
    display() {
        console.log("Displaying content in one screen");
    }
    print() {
        console.log("No printer found");
    }
    renderVideo() {
        console.log("Cannot render video without a dedicated graphics card");
    }
}
class ComputerComponentDecorator extends Computer {
    _computer;
    constructor(_computer) {
        super();
        this._computer = _computer;
    }
    boot() {
        return this._computer.boot();
    }
    shutDown() {
        return this._computer.shutDown();
    }
    display() {
        return this._computer.display();
    }
    print() {
        return this._computer.print();
    }
    renderVideo() {
        return this._computer.renderVideo();
    }
}
class ServerComputer extends Computer {
    boot() {
        console.log("Booting server...");
    }
    shutDown() {
        console.log("Server is shutting down");
    }
}
class ComputerWithPrinterDecorator extends ComputerComponentDecorator {
    constructor(computer) {
        super(computer);
    }
    print() {
        console.log("Printing....");
    }
}
class ComputerWithDedicatedGPU extends ComputerComponentDecorator {
    constructor(computer) {
        super(computer);
    }
    renderVideo() {
        console.log("Rendering video with dedicated GPU");
    }
}
let server = new ServerComputer();
let serverWithPrinter = new ComputerWithPrinterDecorator(server);
let serverWithPrinterAndDedicatedGPU = new ComputerWithDedicatedGPU(serverWithPrinter);
serverWithPrinterAndDedicatedGPU.print();
serverWithPrinterAndDedicatedGPU.renderVideo();
// \design-patterns> tsc
// \design-patterns> node .\build\decorator.js   
// OUT:
// Printing....
// Rendering video with dedicated GPU
