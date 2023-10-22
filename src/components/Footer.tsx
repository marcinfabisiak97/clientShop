import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppSelector, useAppDispatch } from "../redux/store";
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
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
const Contact = styled.h2``;
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
const Footer = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  return (
    <Container>
      <Left>
        <Logo>FABICO</Logo>
        <Description>
          Czy wiesz, że spożywanie świeżo wyciskanych soków z blenderów może
          przynieść wiele korzyści dla Twojego zdrowia? To nie tylko pyszne, ale
          także pełne witamin i składników odżywczych napoje, które mogą
          znacząco wpłynąć na Twoje samopoczucie.
        </Description>
      </Left>
      <Center>
        <Title>Links</Title>
        <List>
          {loggedIn ? (
            <>
              <ListItem>
                <StyledLink to="/user">My Account</StyledLink>
              </ListItem>
              <ListItem>Order Tracking</ListItem>
              <ListItem>Terms</ListItem>
            </>
          ) : (
            <>
              <ListItem>Terms</ListItem>
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
