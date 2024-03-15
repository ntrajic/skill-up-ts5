interface Command {
    execute(): void;
    undo(): void;       // oposite of execute()
}

class Counter {
    private value: number = 0;
    setValue(newValue: number) {

        this.value = newValue;
    }
    getValue(): number {
        return this.value;
    }
}

class IncrementCommand {
    private counter: Counter;
    constructor(counter: Counter){
        this.counter = counter;
    }
    execute(): void {
        this.counter.setValue(this.counter.getValue() + 1);
    }

    undo(): void {
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
