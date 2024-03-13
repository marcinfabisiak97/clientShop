import styled from 'styled-components';

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
export {
    InfoWrapper,
    Title,
    Description,
    Price,
    FilterContainer,
    FilterColor,
    Filter,
    FilterTitle,
    AddContainer,
    AmountContainer,
    Amount,
    Button,
};
