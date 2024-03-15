interface ISubscriptionState {
    pay(amount: number): void;
    checkExpiration(): void;
    report(): string;
}



class PaidState implements ISubscriptionState {
    amountPaid: number = 0;
    
    constructor(private _subscription: Subscription, amount: number) {
        this.amountPaid = amount;
    }
    
    pay(amount: number): void {
        throw new Error("Alread paid");
    }    
    
    checkExpiration(): void {
        this._subscription.state = new TrialExpiredState(this._subscription);
    }
    report(): string {
        return `On paid plan with ${this.amountPaid}$ subscription`;
    }
}



class TrialState implements ISubscriptionState {
    daysRemaining: number = 14;

    constructor(private _subscription: Subscription) {

    }

    pay(amount: number): void {
        this._subscription.state = new PaidState(this._subscription, amount);
    }    
    
    checkExpiration(): void {
        this.daysRemaining--;
        if(this.daysRemaining <= 0) {
            this._subscription.state = new TrialExpiredState(this._subscription);
        }
    }
    
    report(): string {
        return `${this.daysRemaining} left on trial`;
    }
}

class TrialExpiredState implements ISubscriptionState {
    constructor(private _subscription: Subscription) {}
    
    pay(amount: number): void {
        this._subscription.state = new PaidState(this._subscription, amount);
    }    
    
    checkExpiration(): void {
        throw new Error("Trial already expired");
    }

    report(): string {
        return `Trial Expired`;
    }

}

class Subscription {
    state: ISubscriptionState = new TrialState(this);
    
    pay(amount: number) {
        this.state.pay(amount);
    }

    dayPassed() {
        this.state.checkExpiration();
    }

    checkSubscriptionStatus() {
        console.log(this.state.report());
    }
}


// MAINLINE
let subscription: Subscription = new Subscription();
subscription.checkSubscriptionStatus();
subscription.dayPassed();
subscription.checkSubscriptionStatus();
for(let i=0; i<13; i++) {
    subscription.dayPassed();
    subscription.checkSubscriptionStatus();
}
subscription.pay(200);
subscription.checkSubscriptionStatus();

//

// \design-patterns> tsc
// \design-patterns> node .\build\template.js   
// OUT: 
// 14 left on trial
// 13 left on trial
// 12 left on trial
// 11 left on trial
// 10 left on trial
// 9 left on trial
// 8 left on trial
// 7 left on trial
// 6 left on trial
// 5 left on trial
// 4 left on trial
// 3 left on trial
// 2 left on trial
// 1 left on trial
// Trial Expired
// On paid plan with 200$ subscription