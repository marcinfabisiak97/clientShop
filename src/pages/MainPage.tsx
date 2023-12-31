import styled from "styled-components";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import PromoInfo from "../components/PromoInfo";
import Slider from "../components/Slider";
import Products from "../components/Products";
import Footer from "../components/Footer";
import ProductsList from "./ProductsList";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Adjust the rows as needed */
  gap: 20px; /* Adjust the gap size as needed */
  min-height: 100vh;
`;
const MainPage = () => {
  return (
    <Container>
      {/* <PromoInfo /> */}
      <Navbar />
      {/* <Slider /> */}
      {/* <Categories /> */}
      <ProductsList />

      <Footer />
    </Container>
  );
};

export default MainPage;
