import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import 'react-loading-skeleton/dist/skeleton.css';

import { useAppSelector } from '../redux/store';
import {
    Center,
    ContactDetails,
    Container,
    Description,
    Left,
    List,
    ListItem,
    Location,
    Logo,
    Mail,
    Phone,
    Right,
    StyledLink,
    Title,
} from './ui/footerStyles';

const Footer = (): JSX.Element => {
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    return (
        <Container>
            <Left>
                <Logo>FABICO</Logo>
                <Description>
                    Czy wiesz, że spożywanie świeżo wyciskanych soków z
                    blenderów może przynieść wiele korzyści dla Twojego zdrowia?
                    To nie tylko pyszne, ale także pełne witamin i składników
                    odżywczych napoje, które mogą znacząco wpłynąć na Twoje
                    samopoczucie.
                </Description>
            </Left>
            <Center>
                <Title>Links</Title>
                <List>
                    {loggedIn ? (
                        <>
                            <ListItem>
                                <StyledLink to="/user">Moje konto</StyledLink>
                            </ListItem>
                            <ListItem>
                                <StyledLink to="/orders">Zamówienia</StyledLink>
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <StyledLink to="/terms">Warunki</StyledLink>
                            </ListItem>
                        </>
                    )}
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactDetails>
                    <RoomOutlinedIcon />
                    <Location>ul. Słoneczna 6 05-530 Sierzchów</Location>
                </ContactDetails>
                <ContactDetails>
                    <LocalPhoneIcon />
                    <Phone>+48 604 132 689</Phone>
                </ContactDetails>
                <ContactDetails>
                    <EmailIcon />
                    <Mail>marcinfabisiak123@gmail.com</Mail>
                </ContactDetails>
            </Right>
        </Container>
    );
};

export default Footer;
