import React from 'react';
import StripeCheckout, { type Token } from 'react-stripe-checkout';

import { type InterStripePaymentFormProps } from '../../types/InterfaceStripePaymentFormProps';

const StripePaymentForm: React.FC<InterStripePaymentFormProps> = ({
    amount,
    onPaymentSuccess,
}) => {
    const handleToken = (token: Token): void => {
        // Send the token to your server for further processing
        onPaymentSuccess(token);
    };

    return (
        <StripeCheckout
            token={handleToken}
            stripeKey={process.env.REACT_APP_STRIPE ?? ''}
            amount={amount}
            name="Your Company Name"
            description="Payment Description"
            currency="PLN"
            allowRememberMe={false}
            email="customer@example.com"
        />
    );
};

export default StripePaymentForm;
