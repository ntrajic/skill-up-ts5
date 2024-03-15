interface PaymentMethod {
    processPayment(): void;
}

class CreditCardPaymentMehtod implements PaymentMethod {
    processPayment(): void {
        console.log(`Collectging the user\'s credit card details...`);
    }
}

class PaypalPaymentMethod implements PaymentMethod {
    processPayment(): void {
        console.log('Sending the user to Paypal for verification...');
    }
}

class GooglePayMethod implements PaymentMethod {
    processPayment(): void {
        console.log('Sending the user to Google to pay...');
    }
}

class CheckoutFlow {
    checkout(selectedPayment: "credit-card" | "paypal" | "google") {
        let paymentMethod: PaymentMethod = selectedPayment == "credit-card"
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