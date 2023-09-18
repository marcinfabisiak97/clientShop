import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { orderFailure, orderSuccess } from "../redux/orderSlice";
const Success = () => {
  const location = useLocation();
  const data = location.state.data;
  const cart = useAppSelector((state) => state.cart);
  const order = useAppSelector((state) => state.order);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState(null);
  console.log(order);
  const createOrder = async () => {
    try {
      const res = await userRequest.post("/orders", {
        userId: location.state.data.id,
        products: cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        amount: cart.total,
        address: data.billing_details.address,
      });
      setOrderId(res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(orderFailure());
    return () => {
      order.paid && createOrder();
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;
