import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0px 0px 8px -1px rgba(66, 68, 90, 1);
    border-radius: 10px;
    width: 50vw;
    height: 50vh;
    margin: 5vh auto;
    padding: 3rem;
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
    }
`;
const Button = styled.button`
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    display: block;
    background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
    border: 0px;
    padding: 1rem;
    border-radius: 5px;
    /* Add the following properties to center the button */
    margin: 0 auto;
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
export { Wrapper, StyledLink, Button };
