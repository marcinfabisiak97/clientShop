import { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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
const Wraper = styled.div`
  margin: 0 auto;
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
        <Wraper>
          <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
            <Skeleton circle height={200} width={200} />
          </SkeletonTheme>
        </Wraper>
      ) : (
        filteredProducts.map((product, index) => (
          <Product product={product} key={index} />
        ))
      )}
    </Container>
  );
};

export default Products;
