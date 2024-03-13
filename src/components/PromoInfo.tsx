import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: lightblue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;
const PromoInfo: React.FC = () => {
    return <Container>Zadbaj o Swoje zdrowie</Container>;
};

export default PromoInfo;
