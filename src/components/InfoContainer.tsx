import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { addProduct } from '../redux/cartSlice';
import { useAppDispatch } from '../redux/store';
import { publicRequest } from '../requestMethods';
import { InterProduct } from './InterfaceProduct';

const InfoWrapper = styled.div`
    flex: 2;
    margin: 0 50px;
`;
const Title = styled.h2`
    font-size: 25px;
    font-weight: 200;
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;
const Description = styled.p`
    margin: 20px 0;
    @media (max-width: 768px) {
        font-size: 10px;
    }
`;
const Price = styled.p`
    font-weight: 100;
`;
const FilterContainer = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;
const Filter = styled.div`
    display: flex;
`;
const FilterTitle = styled.span``;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0 5px;
    cursor: pointer;
`;
const AddContainer = styled.div`
    display: flex;
`;
const AmountContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
`;
const Button = styled.button`
    padding: 10px;
    font-weight: 600;
    border: none;
    padding: 1rem;
    border-radius: 5px;
    background-color: rgb(132, 220, 132);
    color: white;
    cursor: pointer;
    transition: 1s linear;
    &:hover {
        background-color: rgb(7, 121, 7);
    }
    cursor: 'pointer';
`;
const InfoContainer = () => {
    const [product, setProduct] = useState<InterProduct>();
    const [filter, setFilter] = useState<InterProduct[]>();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const handleQuantity = (type: string) => {
        if (quantity > 1 && type === 'dec') setQuantity(quantity - 1);
        if (type === 'inc') setQuantity(quantity + 1);
    };
    const handleClick = () => {
        if (product)
            dispatch(
                addProduct({
                    product,
                    quantity,
                }),
            );
    };
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        void getProducts();
    }, [id]);
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
