import styled from 'styled-components';

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
export {
    Container,
    Wrapper,
    Title,
    Form,
    Input,
    Agreement,
    Warning,
    Button,
    PopupOverlay,
    Popup,
};
