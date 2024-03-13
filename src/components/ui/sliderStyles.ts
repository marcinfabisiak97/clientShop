import styled from 'styled-components';

interface WrapperProps {
    slideIndex: number;
}
const Container = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
`;
const Wrapper = styled.div<WrapperProps>`
    display: flex;
    transition: all 0.8s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: lightblue;
`;
const ImageContainer = styled.div`
    padding-right: 20px;
`;
const Image = styled.img`
    overflow: hidden;
    max-width: 100px;
`;
const InfoContainer = styled.div``;
const Title = styled.h2`
    font-size: 20px;
`;
export {
    Container,
    Wrapper,
    Slide,
    ImageContainer,
    Image,
    InfoContainer,
    Title,
};
