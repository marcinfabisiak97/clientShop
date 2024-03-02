import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { register } from "../api/apiCalls";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: lightblue;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;
const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 0;
`;
const Warning = styled.p`
  padding-top: 10px;
  color: red;
`;
const Button = styled.button`
  width: 40%;
  border: 1px solid black;
  background-color: white;
  padding: 15px 20px;
  cursor: pointer;
  &:hover {
    background-color: #b1f5bd;
  }
`;
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;
const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [match, setMatch] = useState(true);
  const [formFilled, setFormFilled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const { isFetching, error } = useAppSelector((state) => state.newUser);
  const [errorMessage, setErrorMessage] = useState(false);
  const closePopup = () => {
    setShowPopup(false);
    navigate("/");
  };
  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatch(false);
      return;
    }
    if (
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      password === "" ||
      email === ""
    ) {
      setFormFilled(true);
      return;
    } else {
      setFormFilled(false);
      setShowPopup(true);
      register(dispatch, { firstname, lastname, username, password, email });
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
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            required
            type="text"
            placeholder="user name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            required
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            required
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
          />
          {!match ? <Warning>Passwords do not match</Warning> : null}
          {errorMessage ? <Warning>{error}</Warning> : null}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" onClick={handleRegister} disabled={isFetching}>
            CREATE AN ACCOUNT
          </Button>{" "}
          {formFilled && <Warning>Please fill in all fields</Warning>}
          {showPopup && (
            <>
              <PopupOverlay onClick={closePopup} />
              <Popup>
                <h2>Registration Successful!</h2>
                <p>Your account has been successfully registered.</p>
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
