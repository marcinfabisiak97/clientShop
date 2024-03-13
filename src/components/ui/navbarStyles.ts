import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
`;
const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 425px) {
        flex-direction: column;
    }
`;
const Logo = styled.h1`
    font-weight: 700;
    font-size: 2rem;
`;
const Left = styled.div`
    flex: 1;
`;
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin: 25px;
`;
const LinkTag = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const StyledLink = styled(Link)`
    padding: 1rem;
    text-decoration: none;
    color: inherit;
`;
export {
    Container,
    Wrapper,
    Logo,
    Left,
    Center,
    Right,
    MenuItem,
    LinkTag,
    StyledLink,
};
