"use strict";
class CreditCardPaymentMehtod {
    processPayment() {
        console.log(`Collectging the user\'s credit card details...`);
    }
}
class PaypalPaymentMethod {
    processPayment() {
        console.log('Sending the user to Paypal for verification...');
    }
}
class GooglePayMethod {
    processPayment() {
        console.log('Sending the user to Google to pay...');
    }
}
class CheckoutFlow {
    checkout(selectedPayment) {
        let paymentMethod = selectedPayment == "credit-card"
            ? new CreditCardPaymentMehtod()
            : selectedPayment === "paypal"
                ? new PaypalPaymentMethod()
                : new GooglePayMethod();
        paymentMethod.processPayment();
    }
}
let checkoutFlow = new CheckoutFlow();
checkoutFlow.checkout("credit-card");
// design-patterns> tsc                         
// \design-patterns> node .\build\strategy.js 
// OUT: Collectging the user's credit card details...
checkoutFlow.checkout("paypal");
// OUT: Sending the user to Paypal for verification...
