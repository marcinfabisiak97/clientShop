import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout, { type Token } from 'react-stripe-checkout';

import { Button, StyledLink, Wrapper } from '../components/ui/paymentsStyles';
import { orderSuccess } from '../redux/orderSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { userRequest } from '../requestMethods';

const Payments: React.FC = () => {
    const [stripeToken, setStripeToken] = useState<Token>();

    const cart = useAppSelector((state) => state.cart);
    const formData = useAppSelector((state) => state.userData);
    const userId = useAppSelector((state) => {
        return state.user.currentUser.others?._id;
    });

    const amount = useAppSelector((state) => state.cart.total);
    const address = formData;

    const dispatch = useAppDispatch();
    const history = useNavigate();
    const [error, setError] = useState('');
    const handlePaymentSuccess = (token: Token): void => {
        setStripeToken(token);
    };
    const createOrder = async (state: { data: any }): Promise<void> => {
        try {
            await userRequest.post('/orders', {
                userId,
                products: cart.products.map((item) => ({
                    productId: item._id,
                    quantity: item.quantity,
                })),
                amount: cart.total,
                address:
                    state.data.billing_details !== null
                        ? state.data.billing_details.address
                        : null,
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const makeRequest = async (): Promise<void> => {
            if (stripeToken !== null && stripeToken !== undefined) {
                try {
                    const res = await userRequest.post('/checkout/payment', {
                        tokenId: stripeToken.id,
                        amount: cart.total * 100,
                    });
                    console.log(res);
                    dispatch(orderSuccess());
                    history('/success');
                    await createOrder({ data: res.data });
                } catch (err: any) {
                    console.log('Error occurred: ', err);
                    const errorMessage =
                        err.response?.data !== null
                            ? err.response?.data
                            : 'An error occurred';
                    setError(errorMessage as string);
                }
            }
        };
        void makeRequest();
    }, [stripeToken]);

    return (
        <Wrapper>
            <h3>Metody Płatności</h3>
            <StyledLink to="/shipment">
                <Button>
                    <span>Za pobraniem</span>
                </Button>{' '}
            </StyledLink>
            {process.env.REACT_APP_STRIPE !== undefined ? (
                <StripeCheckout
                    token={handlePaymentSuccess}
                    stripeKey={process.env.REACT_APP_STRIPE}
                    amount={amount * 100}
                    name="Your Company Name"
                    description="Payment Description"
                    currency="PLN"
                    billingAddress
                    shippingAddress
                    email={address.email}
                    label="Zapłać kartą"
                />
            ) : (
                <div>Stripe key is not defined</div>
            )}
            {error}
        </Wrapper>
    );
};

export default Payments;
