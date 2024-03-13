import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../api/login/login';
import {
    Button,
    Container,
    Form,
    Info,
    Input,
    Link,
    Title,
    Warning,
    Wrapper,
} from '../../components/ui/loginStyles';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const isLogged = useAppSelector((state) => state.user.loggedIn);
    const userInfo = useAppSelector(
        (state) => state.user.currentUser.others?.username,
    );

    const [formFilled, setFormFilled] = useState(false);
    // const { isFetching, error } = useAppSelector((state) => state.user);
    const naviggate = useNavigate();
    const handleLogin = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void => {
        e.preventDefault();

        if (username === '' || password === '') {
            setFormFilled(true);
        } else {
            setFormFilled(false);
            login(dispatch, { username, password })
                .then(() => {
                    naviggate('/');
                })
                .catch((error) => {
                    console.log(error);
                });
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
