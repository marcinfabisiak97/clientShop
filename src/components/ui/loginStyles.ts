import styled from 'styled-components';
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: lightblue;
`;
const Title = styled.h2`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;
const Button = styled.button`
    width: 40%;
    border: 1px solid black;
    background-color: white;
    padding: 15px 20px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        background-color: #b1f5bd;
    }
    &:disabled {
        color: red;
        cursor: not-allowed;
    }
`;
const Link = styled.a`
    margin: 5px 0;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
`;

const Warning = styled.p`
    padding-top: 10px;
    color: red;
`;
const Info = styled.p`
    padding-top: 10px;
    color: green;
`;
export { Container, Button, Wrapper, Title, Info, Input, Form, Link, Warning };
