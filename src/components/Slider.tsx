import { useEffect, useState } from 'react';

import { publicRequest } from '../requestMethods';
import { type InterProduct } from '../types/InterfaceProduct';
import {
    Container,
    Image,
    ImageContainer,
    InfoContainer,
    Slide,
    Title,
    Wrapper,
} from './ui/sliderStyles';

const Slider: React.FC = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [products, setProducts] = useState<InterProduct[]>([]);
    const nextSlide = (): void => {
        setSlideIndex((prevIndex) =>
            prevIndex < products.length - 1 ? prevIndex + 1 : 0,
        );
    };

    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            try {
                const res = await publicRequest.get('/products');
                setProducts(res.data as InterProduct[]);
            } catch (err) {
                console.log(err);
            }
        };

        void getProducts();

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Container>
            <Wrapper slideIndex={slideIndex}>
                {products.map((slide) => (
                    <Slide key={slide._id}>
                        <ImageContainer>
                            <Image src={slide.img[0]} />
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{slide.title}</Title>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
        </Container>
    );
};

export default Slider;
