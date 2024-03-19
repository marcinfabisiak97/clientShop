import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PromoInfo from '../components/PromoInfo';
import Slider from '../components/Slider';
import { Container } from '../components/ui/mainPageStyles';
import ProductsList from './product/ProductsList';

const MainPage: React.FC = () => {
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
