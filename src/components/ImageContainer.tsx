import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';

import { publicRequest } from '../requestMethods';
import { type InterProduct } from '../types/InterfaceProduct';
import { Image, ImageWrapper } from './ui/imageContainerStyles';

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
