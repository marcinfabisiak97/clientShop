import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { orderFailure } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
const Success = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : false;
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState(null);
  const orderCreated = useRef<boolean>(false);
  const createOrder = async () => {
    if (!orderCreated.current) {
      try {
        const res = await userRequest.post("/orders", {
          userId: location.state.data.id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details ? data.billing_details.address : null,
        });
        setOrderId(res.data._id);
        orderCreated.current = true;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (data.paid) {
        createOrder();
      }
      dispatch(clearCart());
      dispatch(orderFailure());
    };
  }, [data.paid]);

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
      {orderId !== null
        ? `Order has been created successfully. Your order number is ${orderId}`
        : "Order generating"}
      <Link to={`/`}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>{" "}
      </Link>
    </div>
  );
};

export default Success;
