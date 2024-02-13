import styled from "styled-components";
import Navbar from "../components/Navbar";
import PromoInfo from "../components/PromoInfo";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  addProduct,
  removeProduct,
  clearCart,
  decreseProduct,
} from "../redux/cartSlice";
import { useState } from "react";
type ButtonProps = {
  buttonType?: "filled";
};
type SummaryItemProps = {
  type?: string;
};
const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Adjust the rows as needed */
  gap: 20px; /* Adjust the gap size as needed */
  min-height: 100vh;
`;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const TopButton = styled.button<ButtonProps>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.buttonType === "filled" ? "none" : null)};
  background-color: ${(props) =>
    props.buttonType === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.buttonType === "filled" ? "white" : null)};
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Information = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const ButtonWrapper = styled.span`
  cursor: pointer;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Hr = styled.hr`
  background-color: #5a5959;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid black;
  border-radius: 10px;
  padding: 20px;
`;
const SummaryTitle = styled.h2`
  font-weight: 200;
`;
const SummaryItem = styled.div<SummaryItemProps>`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.type === "total" ? 500 : null)};
  font-size: ${(props) => (props.type === "total" ? "24px" : null)};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 600;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) =>
    props.disabled ? "gray" : " rgb(132, 220, 132)"};
  color: white;
  cursor: pointer;
  transition: 1s linear;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "gray" : " rgb(7, 121, 7)"};
  }
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const shipCost = cart.total > 0 ? 30 : 0;

  const dispatch = useAppDispatch();
  return (
    <Container>
      <Navbar />
      <PromoInfo />
      <Wrapper>
        <Title>Koszyk</Title>
        <Top>
          <TopButton onClick={() => dispatch(clearCart())}>
            Wyczyść koszyk
          </TopButton>
        </Top>
        <Bottom>
          <Information>
            {cart.products.map((product, id) => (
              <Product key={id}>
                <ProductDetail>
                  <Image src={product.img[0]} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                    {product.color?.map((color, i) => (
                      <ProductColor key={i} color={color} />
                    ))}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {product.quantity === 1 ? (
                      <>
                        <ButtonWrapper>
                          <DeleteOutline
                            onClick={() =>
                              dispatch(
                                removeProduct({
                                  product: product,
                                  quantity: 1,
                                })
                              )
                            }
                          />
                        </ButtonWrapper>
                      </>
                    ) : (
                      <>
                        <ButtonWrapper>
                          <RemoveIcon
                            onClick={() =>
                              dispatch(
                                decreseProduct({
                                  product: product,
                                  quantity: 1,
                                })
                              )
                            }
                          />
                        </ButtonWrapper>
                      </>
                    )}
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <>
                      <ButtonWrapper>
                        <AddIcon
                          onClick={() =>
                            dispatch(
                              addProduct({
                                product: product,
                                quantity: 1,
                              })
                            )
                          }
                        />
                      </ButtonWrapper>
                    </>
                  </ProductAmountContainer>
                  <ProductPrice>
                    {product.price * product.quantity}PLN
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Information>
          <Summary>
            <SummaryTitle>Podsumowanie zamówienia</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Koszt towaru</SummaryItemText>
              <SummaryItemPrice>{cart.total}PLN</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Koszt wysyłki</SummaryItemText>
              <SummaryItemPrice>{shipCost}PLN</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total + shipCost}PLN</SummaryItemPrice>
            </SummaryItem>
            <StyledLink to="/payment">
              <SummaryButton disabled={cart.quantity === 0}>
                Wysyłka
              </SummaryButton>
            </StyledLink>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
