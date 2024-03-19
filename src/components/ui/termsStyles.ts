import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 1rem;
`;
const Heading = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;
const ListItem = styled.li`
    list-style-type: decimal;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    @media (max-width: 768px) {
        margin-left: 0.5rem;
    }
`;
const StyledLink = styled(Link)`
    margin-top: 1rem;
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    display: inline-block;
    background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
    border: 0px;
    padding: 1rem;
    border-radius: 5px;
`;
export { Wrapper, Heading, ListItem, StyledLink };
