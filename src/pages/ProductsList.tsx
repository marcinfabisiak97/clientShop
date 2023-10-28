import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Products from "../components/Products";
const Container = styled.div``;
const Title = styled.h2`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const Select = styled.select`
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
`;
const Option = styled.option`
  cursor: pointer;
`;
const ProductsList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilter] = useState({ color: "all" });
  const [sort, setSort] = useState("newest");
  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter({ ...filters, [e.target.name]: value });
  };

  return (
    <Container>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrowanie:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>colors</Option>
            <Option value="all">wszystko</Option>
            <Option value="blue">niebieski</Option>
            <Option value="green">zielony</Option>
            <Option value="black">czarny</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sortowanie:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">najnowszy</Option>
            <Option value="asc">najnisza cena</Option>
            <Option value="desc">najwyższa cena</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductsList;
