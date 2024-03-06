import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import { formatCreatedAt } from "../../Utils";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
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
  const user = useAppSelector((state) => {
    if (state.user.currentUser) return state.user.currentUser.others;
  });

  return (
    <>
      {user ? (
        <Wrapper>
          <StyledLink to="/userupdate">Edytuj</StyledLink>
          <h2></h2>
          <h3>User ID: {user._id}</h3>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Hasło: {user.password}</p>
          <p>Email: {user.email}</p>
          <p>Created At: {formatCreatedAt(user.createdAt ?? "")}</p>
          <p>Updated At: {formatCreatedAt(user.updatedAt ?? "")}</p>{" "}
          <StyledLink to="/">wróć</StyledLink>
        </Wrapper>
      ) : (
        <Wrapper>
          <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
            <Skeleton circle height={200} width={200} />
          </SkeletonTheme>
        </Wrapper>
      )}{" "}
    </>
  );
};

export default User;
