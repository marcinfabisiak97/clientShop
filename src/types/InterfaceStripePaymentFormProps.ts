import { type Token } from 'react-stripe-checkout';

export interface InterStripePaymentFormProps {
    amount: number;
    onPaymentSuccess: (token: Token) => void;
}
