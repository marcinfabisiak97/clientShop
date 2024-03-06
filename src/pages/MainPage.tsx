import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PromoInfo from '../components/PromoInfo';
import Slider from '../components/Slider';
import ProductsList from './product/ProductsList';

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
