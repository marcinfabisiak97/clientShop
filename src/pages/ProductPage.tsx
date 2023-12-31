import styled from "styled-components";
import Navbar from "../components/Navbar";
import PromoInfo from "../components/PromoInfo";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useAppDispatch } from "../redux/store";
import { addProduct } from "../redux/cartSlice";

type Product = {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  color: string[];
  quantity: number;
};
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;
const InfoContainer = styled.div`
  flex: 2;
  margin: 0 50px;
`;
const Title = styled.h2`
  font-size: 25px;
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0;
`;
const Price = styled.p`
  font-weight: 100;
`;
const FilterContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
`;
const FilterTitle = styled.span``;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const AddContainer = styled.div`
  display: flex;
`;
const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #d6d4d4;
  }
`;
const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const [filter, setFilter] = useState<Product[]>();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const handleQuantity = (type: string) => {
    if (quantity > 1 && type === "dec") setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);
  useEffect(() => {
    const getFilter = async () => {
      try {
        if (product?.color) {
          const res = await publicRequest.get(`/products`);
          setFilter(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFilter();
  }, [product?.color]);
  const handleClick = () => {
    if (product)
      dispatch(
        addProduct({
          product: product,
          quantity: quantity,
        })
      );
  };

  return (
    <Container>
      {product && filter ? (
        <>
          <Navbar />
          <PromoInfo />
          <Wrapper>
            <ImageContainer>
              <Image src={product.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Description>{product?.description}</Description>
              <Price>{product.price}PLN</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {filter
                    .filter((item) => item.color[0] !== product.color[0])
                    .map((item, index) => (
                      <Link key={index} to={`/product/${item._id}`}>
                        <FilterColor color={item.color[0]} />
                      </Link>
                    ))}
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <RemoveIcon onClick={() => handleQuantity("dec")} />
                  <Amount>{quantity}</Amount>
                  <AddIcon onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                <Button onClick={() => handleClick()}>Add to cart</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Footer />
        </>
      ) : null}
    </Container>
  );
};

export default ProductPage;
