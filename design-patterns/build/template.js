"use strict";
class PaidState {
    _subscription;
    amountPaid = 0;
    constructor(_subscription, amount) {
        this._subscription = _subscription;
        this.amountPaid = amount;
    }
    pay(amount) {
        throw new Error("Alread paid");
    }
    checkExpiration() {
        this._subscription.state = new TrialExpiredState(this._subscription);
    }
    report() {
        return `On paid plan with ${this.amountPaid}$ subscription`;
    }
}
class TrialState {
    _subscription;
    daysRemaining = 14;
    constructor(_subscription) {
        this._subscription = _subscription;
    }
    pay(amount) {
        this._subscription.state = new PaidState(this._subscription, amount);
    }
    checkExpiration() {
        this.daysRemaining--;
        if (this.daysRemaining <= 0) {
            this._subscription.state = new TrialExpiredState(this._subscription);
        }
    }
    report() {
        return `${this.daysRemaining} left on trial`;
    }
}
class TrialExpiredState {
    _subscription;
    constructor(_subscription) {
        this._subscription = _subscription;
    }
    pay(amount) {
        this._subscription.state = new PaidState(this._subscription, amount);
    }
    checkExpiration() {
        throw new Error("Trial already expired");
    }
    report() {
        return `Trial Expired`;
    }
}
class Subscription {
    state = new TrialState(this);
    pay(amount) {
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
let subscription = new Subscription();
subscription.checkSubscriptionStatus();
subscription.dayPassed();
subscription.checkSubscriptionStatus();
for (let i = 0; i < 13; i++) {
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
