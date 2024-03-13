import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    display: inline-block;
    background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
    border: 0px;
    padding: 1rem;
    border-radius: 5px;
`;
export { Wrapper, StyledLink }