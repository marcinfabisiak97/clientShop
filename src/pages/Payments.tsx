import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { orderSuccess } from "../redux/orderSlice";
import StripeCheckout, { Token } from "react-stripe-checkout";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Button = styled.button`
  overflow: hidden;
  display: inline-block;
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  border: 0px;
  padding: 1px;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px;
  cursor: pointer;
  visibility: visible;
  user-select: none;
  span {
    background-image: linear-gradient(
      rgb(125, 197, 238),
      rgb(0, 140, 221) 85%,
      rgb(48, 162, 228)
    );
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    position: relative;
    padding: 0px 12px;
    display: block;
    height: 30px;
    line-height: 30px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
    text-shadow: rgba(0, 0, 0, 0.25) 0px -1px 0px;
    border-radius: 4px;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Payments = () => {
  const [stripeToken, setStripeToken] = useState<Token>();
  const cart = useAppSelector((state) => state.cart);
  const formData = useAppSelector((state) => state.userData);
  const userId = useAppSelector((state) => {
    if (state.user.currentUser.others) return state.user.currentUser.others._id;
  });
  const productsInfo = useAppSelector((state) => state.cart.products);
  const products = productsInfo.map((product) => {
    return { _id: product._id, quantity: product.quantity };
  });
  const amount = useAppSelector((state) => state.cart.total);
  const address = formData;
  const status = "pending";
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [error, setError] = useState("");
  const handlePaymentSuccess = async (token: Token) => {
    setStripeToken(token);
  };
  const createOrder = async (state: { data: any }) => {
    try {
      const res = await userRequest.post("/orders", {
        userId: userId,
        products: cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        amount: cart.total,
        address: state.data.billing_details
          ? state.data.billing_details.address
          : null,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const makeRequest = async () => {
      if (stripeToken)
        try {
          const res = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          });
          console.log(res);
          dispatch(orderSuccess());
          history("/success");
          if (res.data.paid) createOrder({ data: res.data });
        } catch (err: any) {
          console.log("it gives this error " + err);
          setError(err.response.data);
        }
    };
    if (stripeToken) makeRequest();
  }, [stripeToken]);
  return (
    <Wrapper>
      <h3>Metody Płatności</h3>
      <StyledLink to="/shipment">
        <Button>
          <span>Za pobraniem</span>
        </Button>{" "}
      </StyledLink>
      {process.env.REACT_APP_STRIPE ? (
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
