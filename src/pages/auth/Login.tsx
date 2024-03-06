import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../api/login/login';
import { useAppDispatch, useAppSelector } from '../../redux/store';

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
const Error = styled.span`
    color: red;
`;
const Warning = styled.p`
    padding-top: 10px;
    color: red;
`;
const Info = styled.p`
    padding-top: 10px;
    color: green;
`;
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const isLogged = useAppSelector((state) => state.user.loggedIn);
    const userInfo = useAppSelector(
        (state) => state.user.currentUser.others?.username,
    );

    const [formFilled, setFormFilled] = useState(false);
    const { isFetching, error } = useAppSelector((state) => state.user);
    const naviggate = useNavigate();
    const handleLogin = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setFormFilled(true);
        } else {
            setFormFilled(false);
            login(dispatch, { username, password });
            naviggate('/');
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input
                        type="text"
                        placeholder="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button onClick={handleLogin} disabled={isLogged}>
                        LOGIN
                    </Button>
                    <Link>DO NOT REMEBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                    {formFilled ? (
                        <Warning>Please fill the form</Warning>
                    ) : null}
                    {isLogged ? (
                        <Info>You are logged as {userInfo}</Info>
                    ) : (
                        <Warning>You are not logged in</Warning>
                    )}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
