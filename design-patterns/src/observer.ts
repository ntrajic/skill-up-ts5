interface Observer<T> {
    update(value: T): void;
}

class Subject {
    private observers: Observer<string>[] = [];
    private value: string = '';

    public addObserver(observer: Observer<string>): void {                       // SUBSCRIBE
        this.observers.push(observer);
    }
    public setValue(newValue: string) {                                         // UPdATE_and_NOTIFY_ALL
        this.value = newValue;
        this.observers.forEach(observer => observer.update(newValue));          // observer.notify_all or forEach observer, observer.update
    }
}

class LogObserver implements Observer<string> {
    update(value: string): void {
        console.log(`Updated! The new value is ${value}`);
    }
}

let observer = new LogObserver();
let observer1 = new LogObserver();
let observer2 = new LogObserver();
let observer3 = new LogObserver();

let subject = new Subject();
subject.addObserver(observer);
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);

// whenever Subject is updated, it should notify_all observer-s
subject.setValue("Design Patterns");  
// design-patterns> node .\build\observer.js    
// OUT: Updated! The new value is Design Patterns   // invoked is LogObserver's method update(value: string)
//      Updated! The new value is Design Patterns   // notified observer 1
//      Updated! The new value is Design Patterns   // notified observer 2
//      Updated! The new value is Design Patterns   // notified observer 3