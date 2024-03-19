import styled from 'styled-components';

const Image = styled.img`
    max-width: 100%;
    object-fit: contain;
    @media (max-width: 425px) {
        max-width: 80%;
    }
`;
const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    @media (max-width: 425px) {
        width: 100%;
        flex: 2;
    }
`;
export { Image, ImageWrapper };
