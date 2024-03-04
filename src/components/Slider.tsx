import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import { mobile } from "../responsive";

type WrapperProps = {
  slideIndex: number;
};
type ProductProps = {
  _id: string;
  img: string[];
  color: string[];
  createdAt: number;
  price: number;
  title: string;
  description: string;
  quantity: number;
};
const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })};
`;
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  transition: all 0.8s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightblue;
`;
const ImageContainer = styled.div`
  padding-right: 20px;
`;
const Image = styled.img`
  overflow: hidden;
  max-width: 100px;
`;
const InfoContainer = styled.div``;
const Title = styled.h2`
  font-size: 20px;
`;
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Container>
      <Wrapper slideIndex={slideIndex}>
        {products.map((slide) => (
          <Slide key={slide._id}>
            <ImageContainer>
              <Image src={slide.img[0]} />
            </ImageContainer>
            <InfoContainer>
              <Title>{slide.title}</Title>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
