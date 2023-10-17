import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";

interface StripePaymentFormProps {
  amount: number;
  onPaymentSuccess: (token: Token) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  onPaymentSuccess,
}) => {
  const handleToken = (token: Token) => {
    // Send the token to your server for further processing
    onPaymentSuccess(token);
  };

  return (
    <StripeCheckout
      token={handleToken}
      stripeKey={process.env.REACT_APP_STRIPE || ""}
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
