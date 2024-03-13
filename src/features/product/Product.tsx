import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

import {
    Circle,
    Container,
    Icon,
    Image,
    Info,
} from '../../components/ui/productStyles';
import { addProduct } from '../../redux/cartSlice';
import { useAppDispatch } from '../../redux/store';
import { type InterProduct } from '../../types/InterfaceProduct';

const Product: React.FC<{ product: InterProduct }> = ({ product }) => {
    const dispatch = useAppDispatch();
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = (): void => {
        setIsImageLoaded(true);
    };

    return (
        <Container>
            <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
                <Circle />
                {!isImageLoaded && <Skeleton circle height={200} width={200} />}
                <Image
                    src={product.img[0]}
                    onLoad={handleImageLoad}
                    isImageLoaded={isImageLoaded}
                />
            </SkeletonTheme>
            <Info>
                <Icon>
                    <ShoppingCartOutlinedIcon
                        onClick={() =>
                            dispatch(
                                addProduct({
                                    product,
                                    quantity: 1,
                                }),
                            )
                        }
                    />
                </Icon>
                <Icon>
                    <Link to={`/product/${product._id}`}>
                        <SearchIcon />
                    </Link>
                </Icon>
            </Info>
        </Container>
    );
};

export default Product;
