import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { addProduct } from '../redux/cartSlice';
import { useAppDispatch } from '../redux/store';
import { publicRequest } from '../requestMethods';
import { type InterProduct } from '../types/InterfaceProduct';
import {
    AddContainer,
    Amount,
    AmountContainer,
    Button,
    Description,
    Filter,
    FilterColor,
    FilterContainer,
    FilterTitle,
    InfoWrapper,
    Price,
    Title,
} from './ui/infoContainerStyles';

const InfoContainer: React.FC = () => {
    const [product, setProduct] = useState<InterProduct>();
    const [filter, setFilter] = useState<InterProduct[]>();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const handleQuantity = (type: string): void => {
        if (quantity > 1 && type === 'dec') setQuantity(quantity - 1);
        if (type === 'inc') setQuantity(quantity + 1);
    };
    const handleClick = (): void => {
        if (product !== null && product !== undefined)
            dispatch(
                addProduct({
                    product,
                    quantity,
                }),
            );
    };
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
                if (product?.color !== undefined) {
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
        <InfoWrapper>
            <Title>{product?.title}</Title>
            <Description>{product?.description}</Description>
            <Price>{product?.price}PLN</Price>
            <FilterContainer>
                <Filter>
                    <FilterTitle>kolor:</FilterTitle>
                    {filter?.map((item, index) => (
                        <Link key={index} to={`/product/${item._id}`}>
                            <FilterColor color={item.color[0]} />
                        </Link>
                    ))}
                </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                    <RemoveIcon
                        onClick={() => {
                            handleQuantity('dec');
                        }}
                    />
                    <Amount>{quantity}</Amount>
                    <AddIcon
                        onClick={() => {
                            handleQuantity('inc');
                        }}
                    />
                </AmountContainer>
                <Button
                    onClick={() => {
                        handleClick();
                    }}
                >
                    Dodaj do koszyka
                </Button>
            </AddContainer>
        </InfoWrapper>
    );
};

export default InfoContainer;
