import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { userRequest } from "../../requestMethods";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "../../Utils";
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  display: inline-block;
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  border: 0px;
  padding: 1rem;
  border-radius: 5px;
`;
const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<
    [
      {
        _id: string;
        products: any[];
        amount: number;
        status: string;
        createdAt: string;
      }
    ]
  >([{ _id: "", products: [], amount: 0, status: "", createdAt: "" }]);

  const userId = useAppSelector((state) => {
    if (state.user.currentUser.others) return state.user.currentUser.others._id;
  });
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await userRequest.get(`orders/find/${userId}`);
        setOrders(response.data);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderDetails();
  }, []);
  return (
    <Wrapper>
      {loading ? (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Numer zamówienia: {order._id}</h3>
            <p>Kwota: {order.amount}</p>
            <p>Status: {order.status}</p>
            <p>Stworzone: {formatCreatedAt(order.createdAt)}</p>
            {order.products.map((product) => (
              <div key={product._id}>
                <p>
                  Identyfikator przedmiotu:{" "}
                  {product.productId ? product.productId : product._id}
                </p>
                <p>Ilość: {product.quantity}</p>
              </div>
            ))}
            <hr />
          </div>
        ))
      ) : (
        <Wrapper>
          <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
            <Skeleton circle height={200} width={200} />
          </SkeletonTheme>
        </Wrapper>
      )}
      <StyledLink to="/">wróć</StyledLink>
    </Wrapper>
  );
};

export default Orders;
