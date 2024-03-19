import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addOrder } from '../api/addOrder/addOrder';
import { sendEmail } from '../api/sendEmail/sendEmail';
import { sendData } from '../api/sendOrderData/sendOrderData';
import {
    Button,
    Container,
    Form,
    FormContainer,
    Header,
    Required,
    RequiredInvisible,
    StyledLink,
    Wrapper,
} from '../components/ui/shipmentStyles';
import { clearCart } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { contactData } from '../redux/userDataSlice';

const Shipment = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => {
        if (state.user.currentUser.others !== undefined) {
            return state.user.currentUser.others._id;
        }
    });
    const productsInfo = useAppSelector((state) => state.cart.products);
    const products = productsInfo.map((product) => {
        return { _id: product._id, quantity: product.quantity };
    });
    const amount = useAppSelector((state) => state.cart.total);
    const formData = useAppSelector((state) => state.userData);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const address = formData;
    const status = 'pending';
    const goodText = <>Pole jest dobre</>;
    const checkIfEmptyForm = Object.values(formData).every(
        (element) => element.length !== 0,
    );
    const [formSubmitted, setFormSubmitted] = useState(false);

    const validateForm = (): Record<string, string> => {
        const errors: Record<string, string> = {};
        const validationRules: Record<string, RegExp> = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            name: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/,
            street: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\d/]+$/,
            postCode: /^\d{2}-\d{3}$/,
            city: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/,
            phone: /^\d{9}$/,
        };

        const errorMessages: Record<string, string> = {
            email: 'Nieprawidłowy adres email',
            firstName: 'Nieprawidłowe imię',
            lastName: 'Nieprawidłowe nazwisko',
            street: 'Nieprawidłowa ulica',
            postCode: 'Nieprawidłowy kod pocztowy (format: XX-XXX)',
            city: 'Nieprawidłowe miasto',
            phone: 'Nieprawidłowy numer telefonu (9 cyfr)',
        };
        for (const field in formData) {
            if (formData[field] === '') {
                errors[field] = 'Pole jest wymagane';
            } else if (
                typeof validationRules[field] === 'function' &&
                !validationRules[field].test(formData[field])
            ) {
                errors[field] = errorMessages[field] ?? 'Nieprawidłowe dane';
            }
        }

        return errors;
    };
    const handleInputChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>,
        field: string,
    ): void => {
        const value = event.target.value;

        dispatch(contactData({ [field]: value }));
    };
    const handleCashOnDelivery = async (): Promise<void> => {
        await sendData({ userId, products, amount, address, status });
        await sendEmail(formData.email);
        await addOrder(dispatch, { userId, products, amount, address, status });
        dispatch(clearCart());
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        // dispatch(resetContactData());
        if (Object.keys(errors).length === 0) {
            setFormSubmitted(true);
            navigate('/success');
        }
    };

    return (
        <Container>
            <FormContainer>
                <StyledLink to="/cart">
                    <Button> &lt; Powrót do koszyka</Button>
                </StyledLink>
                <Form>
                    <Header>Dane do wysyłki</Header>
                    <input
                        type="email"
                        placeholder="mail"
                        value={formData.email}
                        onChange={(e) => {
                            handleInputChange(e, 'email');
                        }}
                        required
                    />
                    {formErrors.email !== undefined ? (
                        <Required>{formErrors.email}</Required>
                    ) : (
                        <RequiredInvisible>{goodText}</RequiredInvisible>
                    )}
                    <input
                        type="text"
                        placeholder="Imię"
                        value={formData.firstName}
                        onChange={(e) => {
                            handleInputChange(e, 'firstName');
                        }}
                        required
                    />
                    {formErrors.firstName !== undefined ? (
                        <Required>{formErrors.firstName}</Required>
                    ) : (
                        <RequiredInvisible>{goodText}</RequiredInvisible>
                    )}
                    <input
                        type="text"
                        placeholder="Nazwisko"
                        value={formData.lastName}
                        onChange={(e) => {
                            handleInputChange(e, 'lastName');
                        }}
                        required
                    />{' '}
                    {formErrors.lastName !== undefined ? (
                        <Required>{formErrors.lastName}</Required>
                    ) : (
                        <RequiredInvisible>{goodText}</RequiredInvisible>
                    )}
                    <input
                        type="text"
                        placeholder="Ulica"
                        value={formData.street}
                        onChange={(e) => {
                            handleInputChange(e, 'street');
                        }}
                        required
                    />{' '}
                    {formErrors.street !== undefined ? (
                        <Required>{formErrors.street}</Required>
                    ) : (
                        <RequiredInvisible>{goodText}</RequiredInvisible>
                    )}
                    <input
                        type="text"
                        placeholder="Nr mieszkania,lokalu, itp.(opcjonalnie)"
                        value={formData.flat}
                        onChange={(e) => {
                            handleInputChange(e, 'flat');
                        }}
                    />{' '}
                    <Wrapper>
                        <div>
                            <select
                                value={formData.country}
                                onChange={(e) => {
                                    handleInputChange(e, 'country');
                                }}
                                required
                            >
                                <option>Polska</option>
                            </select>
                            {formData.country !== undefined && (
                                <RequiredInvisible>
                                    {goodText}
                                </RequiredInvisible>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Kod pocztowy"
                                value={formData.postCode}
                                onChange={(e) => {
                                    handleInputChange(e, 'postCode');
                                }}
                                required
                            />{' '}
                            {formErrors.postCode !== undefined ? (
                                <Required>{formErrors.postCode}</Required>
                            ) : (
                                <RequiredInvisible>
                                    {goodText}
                                </RequiredInvisible>
                            )}
                        </div>
                    </Wrapper>
                    <input
                        type="text"
                        placeholder="Miasto"
                        value={formData.city}
                        onChange={(e) => {
                            handleInputChange(e, 'city');
                        }}
                        required
                    />{' '}
                    {formErrors.city !== undefined ? (
                        <Required>{formErrors.city}</Required>
                    ) : (
                        <RequiredInvisible>{goodText}</RequiredInvisible>
                    )}
                    <input
                        type="tel"
                        placeholder="Numer Telefonu"
                        value={formData.phone}
                        onChange={(e) => {
                            handleInputChange(e, 'phone');
                        }}
                        required
                    />{' '}
                    {formErrors.phone !== undefined ? (
                        <Required>{formErrors.phone}</Required>
                    ) : (
                        <RequiredInvisible>{goodText}</RequiredInvisible>
                    )}
                </Form>
                <Button
                    onClick={(e) => {
                        handleSubmit(e);
                        handleCashOnDelivery().catch((error) => {
                            console.log(error);
                        });
                    }}
                    disabled={!checkIfEmptyForm && formSubmitted}
                >
                    Zamów
                </Button>
            </FormContainer>
        </Container>
    );
};
export default Shipment;
