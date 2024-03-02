import styled from "styled-components";
import { categories } from "../mock/data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ flexDirection: "column", justifyContent: "center" })};
`;
const Categories: React.FC = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
