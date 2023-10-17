import styled from "styled-components";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { logOut } from "../redux/userSlice";
import { Link } from "react-router-dom";
const Container = styled.div`
  height: 100%;
`;
const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexWrap: "wrap" })};
`;
const Logo = styled.h1`
  font-weight: 700;
  font-size: 2rem;
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 25px;
`;
const LinkTag = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Navbar = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.cart.quantity);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const userName = useAppSelector(
    (state) => state.user.currentUser.others?.username
  );
  return (
    <Container>
      <Wrapper>
        <Left>
          {" "}
          <StyledLink to="/">
            <Logo>FABICO</Logo>
          </StyledLink>
        </Left>
        <Center>
          <StyledLink to="/">Produkty </StyledLink>
        </Center>
        <Right>
          {loggedIn ? (
            <>
              <MenuItem>Zalogowanay jako: {userName} </MenuItem>
              <MenuItem onClick={() => dispatch(logOut())}>Wylogowanie</MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <LinkTag to="/register">Rejestracja </LinkTag>
              </MenuItem>
              <MenuItem>
                <LinkTag to="/login">Logowanie </LinkTag>
              </MenuItem>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
