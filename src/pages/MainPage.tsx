import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsList from "./product/ProductsList";
import Slider from "../components/Slider";
import PromoInfo from "../components/PromoInfo";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Adjust the rows as needed */
  gap: 20px; /* Adjust the gap size as needed */
  min-height: 100vh;
`;
const MainPage = () => {
  return (
    <Container>
      <PromoInfo />
      <Navbar />
      <Slider />
      <ProductsList />
      <Footer />
    </Container>
  );
};

export default MainPage;
