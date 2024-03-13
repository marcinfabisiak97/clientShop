import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { publicRequest } from '../requestMethods';
import { type InterProduct } from '../types/InterfaceProduct';

const Image = styled.img`
    max-width: 100%;
    object-fit: contain;
    @media (max-width: 425px) {
        max-width: 80%;
    }
`;
const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    @media (max-width: 425px) {
        width: 100%;
        flex: 2;
    }
`;
const ImageContainer: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState<InterProduct | undefined>();
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
    return (
        <ImageWrapper>
            <Carousel>
                {/* change the name of img it should be images */}
                {product?.img !== null && product?.img !== undefined
                    ? product.img.map((img, index) => (
                          <div key={index}>
                              <Image src={img} alt={`Product Image ${index}`} />
                          </div>
                      ))
                    : undefined}
            </Carousel>
        </ImageWrapper>
    );
};

export default ImageContainer;
