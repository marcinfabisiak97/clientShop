import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FormContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 30rem;
    min-width: 80rem;
    padding: 2rem 0;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    @media (max-width: 1060px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 40rem;
        min-height: 10rem;
        padding: 1rem;
    }
`;
const Button = styled.button`
    display: inline-block;
    border: none;
    padding: 1rem;
    border-radius: 5px;
    background-color: rgb(132, 220, 132);
    color: white;
    min-width: 8rem;
    cursor: pointer;
    transition: 1s linear;
    &:hover {
        background-color: rgb(7, 121, 7);
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    font-size: 1rem;
    input {
        margin: 0.5rem 0;
        min-width: 40rem;
        border-radius: 5px;
        border: 1px solid black;
        padding: 0.5rem;
    }

    select {
        margin: 1rem 0;
        border-radius: 5px;
        border: 1px solid black;
        padding: 0.5rem;
    }

    button {
        border: none;
        padding: 1rem;
        border-radius: 5px;
        background-color: rgb(132, 220, 132);
        color: white;
        cursor: pointer;
        transition: 1s linear;
    }
    button:hover {
        background-color: rgb(7, 121, 7);
    }
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    select {
        margin: 1rem 1rem 1rem 0;
    }
    input {
        margin: 1rem 0;
        min-width: 20rem;
    }
    div {
        display: flex;
        flex-direction: column;
    }
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const Required = styled.div`
    color: red;
`;
const RequiredInvisible = styled.div`
    visibility: hidden;
`;
const Header = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    align-self: center;
`;
export {
    Container,
    FormContainer,
    Button,
    Form,
    Wrapper,
    StyledLink,
    Required,
    RequiredInvisible,
    Header,
};
