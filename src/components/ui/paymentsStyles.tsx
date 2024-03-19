import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Button = styled.button`
    overflow: hidden;
    display: inline-block;
    background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
    border: 0px;
    padding: 1px;
    text-decoration: none;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px;
    cursor: pointer;
    visibility: visible;
    user-select: none;
    span {
        background-image: linear-gradient(
            rgb(125, 197, 238),
            rgb(0, 140, 221) 85%,
            rgb(48, 162, 228)
        );
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
        position: relative;
        padding: 0px 12px;
        display: block;
        height: 30px;
        line-height: 30px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
        text-shadow: rgba(0, 0, 0, 0.25) 0px -1px 0px;
        border-radius: 4px;
    }
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
export { Wrapper, StyledLink, Button };
