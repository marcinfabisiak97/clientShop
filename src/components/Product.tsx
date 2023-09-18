import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { addProduct } from "../redux/cartSlice";

type ProductProps = {
  _id: string;
  img: string;
  color: string[];
  createdAt: number;
  price: number;
  title: string;
  description: string;
  quantity: number;
};
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  //min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ margin: "0" })};
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  z-index: 0;
`;
const Image = styled.img<{ isImageLoaded: boolean }>`
  height: 95%;
  z-index: 2;
  display: ${(isImageLoaded) => (isImageLoaded ? "block" : "none")};
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Container>
      <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
        <Circle />
        {!isImageLoaded && <Skeleton circle height={200} width={200} />}
        <Image
          src={product.img}
          onLoad={handleImageLoad}
          isImageLoaded={isImageLoaded}
        />
      </SkeletonTheme>
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon
            onClick={() =>
              dispatch(
                addProduct({
                  product: product,
                  quantity: 1,
                })
              )
            }
          />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
            <SearchIcon />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
