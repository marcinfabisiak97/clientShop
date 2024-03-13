import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { logOut } from '../redux/userSlice';
import {
    Center,
    Container,
    Left,
    LinkTag,
    Logo,
    MenuItem,
    Right,
    StyledLink,
    Wrapper,
} from './ui/navbarStyles';

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const quantity = useAppSelector((state) => state.cart.quantity);
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const userName = useAppSelector(
        (state) => state.user.currentUser.others?.username,
    );
    return (
        <Container>
            <Wrapper>
                <Left>
                    {' '}
                    <StyledLink to="/">
                        <Logo>FABICO</Logo>
                    </StyledLink>
                </Left>
                <Center>
                    <StyledLink to="/">Produkty </StyledLink>
                </Center>
                <Right>
                    {loggedIn ? (
                        <>
                            {' '}
                            <StyledLink to="/orders">Zamówienia</StyledLink>
                            <MenuItem>Zalogowanay jako: {userName} </MenuItem>
                            <MenuItem onClick={() => dispatch(logOut())}>
                                Wylogowanie
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem>
                                <LinkTag to="/register">Rejestracja </LinkTag>
                            </MenuItem>
                            <MenuItem>
                                <LinkTag to="/login">Logowanie </LinkTag>
                            </MenuItem>
                        </>
                    )}
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
