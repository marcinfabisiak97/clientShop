import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
    type InterButtonProps,
    type InterSummaryItemProps,
} from '../../types/InterfaceCart';

const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    min-height: 100vh;
`;
const Wrapper = styled.div`
    padding: 20px;
`;
const Title = styled.h2`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;
const TopButton = styled.button<InterButtonProps>`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => (props.buttonType === 'filled' ? 'none' : null)};
    background-color: ${(props) =>
        props.buttonType === 'filled' ? 'black' : 'transparent'};
    color: ${(props) => (props.buttonType === 'filled' ? 'white' : null)};
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Information = styled.div`
    flex: 3;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;
const ButtonWrapper = styled.span`
    cursor: pointer;
`;
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;
const Hr = styled.hr`
    background-color: #5a5959;
    border: none;
    height: 1px;
`;
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid black;
    border-radius: 10px;
    padding: 20px;
`;
const SummaryTitle = styled.h2`
    font-weight: 200;
`;
const SummaryItem = styled.div<InterSummaryItemProps>`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => (props.type === 'total' ? 500 : null)};
    font-size: ${(props) => (props.type === 'total' ? '24px' : null)};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 600;
    border: none;
    padding: 1rem;
    border-radius: 5px;
    background-color: ${(props) =>
        props.disabled !== null ? 'gray' : ' rgb(132, 220, 132)'};
    color: white;
    cursor: pointer;
    transition: 1s linear;
    &:hover {
        background-color: ${(props) =>
            props.disabled !== null ? 'gray' : ' rgb(7, 121, 7)'};
    }
    cursor: ${(props) => (props.disabled !== null ? 'not-allowed' : 'pointer')};
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
export {
    Container,
    Wrapper,
    Title,
    Top,
    TopButton,
    Bottom,
    Information,
    Product,
    ProductDetail,
    Image,
    Details,
    ProductName,
    ProductId,
    ProductColor,
    PriceDetail,
    ProductAmountContainer,
    ButtonWrapper,
    ProductAmount,
    ProductPrice,
    Hr,
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice,
    SummaryButton,
    StyledLink,
};
