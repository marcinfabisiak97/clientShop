import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PromoInfo from '../components/PromoInfo';
import {
    Bottom,
    Container,
    StyledLink,
    Summary,
    SummaryButton,
    SummaryItem,
    SummaryItemPrice,
    SummaryItemText,
    SummaryTitle,
    Title,
    Top,
    TopButton,
    Wrapper,
} from '../components/ui/cartStyles';
import CartInformation from '../features/cartInformation/CartInformation';
import { clearCart } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Cart = (): JSX.Element => {
    const cart = useAppSelector((state) => state.cart);
    const shipCost = cart.total > 0 ? 30 : 0;

    const dispatch = useAppDispatch();
    return (
        <Container>
            <Navbar />
            <PromoInfo />
            <Wrapper>
                <Title>Koszyk</Title>
                <Top>
                    <TopButton onClick={() => dispatch(clearCart())}>
                        Wyczyść koszyk
                    </TopButton>
                </Top>
                <Bottom>
                    <CartInformation />
                    <Summary>
                        <SummaryTitle>Podsumowanie zamówienia</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Koszt towaru</SummaryItemText>
                            <SummaryItemPrice>{cart.total}PLN</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Koszt wysyłki</SummaryItemText>
                            <SummaryItemPrice>{shipCost}PLN</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>
                                {cart.total + shipCost}PLN
                            </SummaryItemPrice>
                        </SummaryItem>
                        <StyledLink to="/payment">
                            <SummaryButton disabled={cart.quantity === 0}>
                                Wysyłka
                            </SummaryButton>
                        </StyledLink>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Cart;
