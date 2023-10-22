import React, { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useAppSelector } from "../redux/store";
import styled from "styled-components";
import { formatCreatedAt } from "../Utils";
import { Link } from "react-router-dom";
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
const User = () => {
  const user = useAppSelector((state) => state.user.currentUser.others);
  const userId = useAppSelector((state) => {
    if (state.user.currentUser.others) return state.user.currentUser.others._id;
  });
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await userRequest.put(`users/${userId}`);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderDetails();
  }, []);
  return (
    <>
      {user ? (
        <Wrapper>
          <h3>User ID: {user._id}</h3>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Is Admin: {user.isAdmin ? "Yes" : "No"}</p>
          <p>Created At: {formatCreatedAt(user.createdAt ?? "")}</p>
          <p>Updated At: {formatCreatedAt(user.updatedAt ?? "")}</p>{" "}
          <StyledLink to="/">wróć</StyledLink>
        </Wrapper>
      ) : (
        <p>Loading user data...</p>
      )}{" "}
    </>
  );
};

export default User;
