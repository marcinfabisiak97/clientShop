import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    @media (max-width: 425px) {
        flex-direction: column;
    }
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 1%;
`;
const Logo = styled.h2`
    margin: 20px 0;
    font-weight: 700;
`;
const Description = styled.p`
    text-align: justify;
`;
const Center = styled.div`
    flex: 1;
    margin-left: 5%;
`;
const Title = styled.h2`
    margin: 20px 0;
    font-weight: 700;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const Right = styled.div`
    flex: 1;
`;

const ContactDetails = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    vertical-align: middle;
`;
const Location = styled.div`
    margin-left: 10px;
`;
const Phone = styled.div`
    margin-left: 10px;
`;
const Mail = styled.div`
    margin-left: 10px;
`;
export {
    Container,
    Left,
    Right,
    Phone,
    Mail,
    ContactDetails,
    Location,
    Logo,
    Description,
    Center,
    Title,
    List,
    ListItem,
    StyledLink,
};
