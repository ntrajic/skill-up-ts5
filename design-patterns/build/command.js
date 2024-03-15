"use strict";
class Counter {
    value = 0;
    setValue(newValue) {
        this.value = newValue;
    }
    getValue() {
        return this.value;
    }
}
class IncrementCommand {
    counter;
    constructor(counter) {
        this.counter = counter;
    }
    execute() {
        this.counter.setValue(this.counter.getValue() + 1);
    }
    undo() {
        this.counter.setValue(this.counter.getValue() - 1);
    }
}
let counter = new Counter();
let incCommand = new IncrementCommand(counter);
incCommand.execute();
console.log(`The current value of counter is ${counter.getValue()}`);
incCommand.execute();
incCommand.execute();
incCommand.execute();
console.log(`The current value of counter is: ${counter.getValue()}`);
incCommand.undo();
console.log(`The current value of counter is: ${counter.getValue()}`);
// \design-patterns> tsc                         
// \design-patterns> node .\build\command.js    
// OUT: 
// The current value of counter is 1
// The current value of counter is: 4    // sfter 3 increments
// The current value of counter is: 3    // after 1 decrement/undo
