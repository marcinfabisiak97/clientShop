import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../../api/register/register';
import {
    Agreement,
    Button,
    Container,
    Form,
    Input,
    Popup,
    PopupOverlay,
    Title,
    Warning,
    Wrapper,
} from '../../components/ui/registerStyles';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const Register = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [match, setMatch] = useState(true);
    const [formFilled, setFormFilled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useAppDispatch();
    const { isFetching, error } = useAppSelector((state) => state.newUser);
    const [errorMessage, setErrorMessage] = useState(false);
    const closePopup = (): void => {
        setShowPopup(false);
        navigate('/');
    };
    const handleRegister = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMatch(false);
            return;
        }
        if (
            firstname === '' ||
            lastname === '' ||
            username === '' ||
            password === '' ||
            email === ''
        ) {
            setFormFilled(true);
            return;
        } else {
            setFormFilled(false);
            setShowPopup(true);
            register(dispatch, {
                firstname,
                lastname,
                username,
                password,
                email,
            })
                .then(() => {
                    console.log('register success');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (error) setErrorMessage(true);
    };
    useEffect(() => {
        if (password === confirmPassword) {
            setMatch(true);
        }
    }, [password]);

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input
                        type="text"
                        placeholder="first name"
                        value={firstname}
                        onChange={(e) => {
                            setFirstname(e.target.value);
                        }}
                    />
                    <Input
                        type="text"
                        placeholder="last name"
                        value={lastname}
                        onChange={(e) => {
                            setLastname(e.target.value);
                        }}
                    />
                    <Input
                        required
                        type="text"
                        placeholder="user name"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <Input
                        required
                        placeholder="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        required
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Input
                        required
                        type="password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        placeholder="confirm password"
                    />
                    {!match ? <Warning>Passwords do not match</Warning> : null}
                    {errorMessage ? <Warning>{error}</Warning> : null}
                    <Agreement>
                        By creating an account, I consent to the processing of
                        my personal data in accordance with the{' '}
                        <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button
                        type="submit"
                        onClick={handleRegister}
                        disabled={isFetching}
                    >
                        CREATE AN ACCOUNT
                    </Button>{' '}
                    {formFilled && <Warning>Please fill in all fields</Warning>}
                    {showPopup && (
                        <>
                            <PopupOverlay onClick={closePopup} />
                            <Popup>
                                <h2>Registration Successful!</h2>
                                <p>
                                    Your account has been successfully
                                    registered.
                                </p>
                                <Button onClick={closePopup}>Close</Button>
                            </Popup>
                        </>
                    )}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
