import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { orderFailure } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Success = () => {
  const userId = useAppSelector((state) => {
    if (state.user.currentUser.others) return state.user.currentUser.others._id;
  });
  const [orderByCash, setOrderByCash] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCart());
      dispatch(orderFailure());
    };
  }, []);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await userRequest.get(`orders/find/${userId}`);
        const order = response.data;
        setOrderByCash(order[order.length - 1]._id);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderDetails();
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
      {orderByCash.length !== 0
        ? `Order has been created successfully. Your order number is ${orderByCash}`
        : "Order generating"}
      <Link to={`/`}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>{" "}
      </Link>
    </div>
  );
};

export default Success;
