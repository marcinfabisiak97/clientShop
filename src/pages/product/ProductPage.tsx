import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../components/Footer';
import ImageContainer from '../../components/ImageContainer';
import InfoContainer from '../../components/InfoContainer';
import Navbar from '../../components/Navbar';
import PromoInfo from '../../components/PromoInfo';
import { publicRequest } from '../../requestMethods';
import { type InterProduct } from '../../types/InterfaceProduct';

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    @media (max-width: 425px) {
        flex-direction: column;
    }
`;

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<InterProduct>();
    const [filter, setFilter] = useState<InterProduct[]>();
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data as InterProduct);
            } catch (err) {
                console.log(err);
            }
        };
        void getProducts();
    }, [id]);
    useEffect(() => {
        const getFilter = async (): Promise<void> => {
            try {
                if (product?.color !== null && product?.color !== undefined) {
                    const res = await publicRequest.get(`/products`);
                    setFilter(res.data as InterProduct[]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        void getFilter();
    }, [product?.color]);

    return (
        <Container>
            {product !== null && filter !== null ? (
                <>
                    <Navbar />
                    <PromoInfo />
                    <Wrapper>
                        <ImageContainer />
                        <InfoContainer />
                    </Wrapper>
                    <Footer />
                </>
            ) : null}
        </Container>
    );
};

export default ProductPage;
