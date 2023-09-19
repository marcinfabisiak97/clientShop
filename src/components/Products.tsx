import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
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

type Filters = {
  [key: string]: string;
};
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0" })};
`;
const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Products: React.FC<{
  cat?: string;
  filters?: Filters;
  sort?: string;
}> = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );

        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    const getFilters = async () => {
      if (filters)
        setFilteredProducts(
          filters.color === "all"
            ? products
            : products.filter((item) => item.color[0] === filters.color)
        );
    };
    getFilters();
  }, [products, filters?.color, cat]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, products]);
  return (
    <Container>
      {loading ? (
        <Paragraph>Pobieranie</Paragraph>
      ) : (
        filteredProducts.map((product, index) => (
          <Product product={product} key={index} />
        ))
      )}
    </Container>
  );
};

export default Products;
