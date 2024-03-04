import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { sendData } from "../api/sendOrderData/sendOrderData";
import { addOrder } from "../api/addOrder/addOrder";
import { clearCart } from "../redux/cartSlice";
import { sendEmail } from "../api/sendEmail/sendEmail";
import { contactData } from "../redux/userDataSlice";
import { userRequest } from "../requestMethods";
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 30rem;
  min-width: 80rem;
  padding: 2rem 0;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  @media (max-width: 1060px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 40rem;
    min-height: 10rem;
    padding: 1rem;
  }
`;
const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  background-color: rgb(132, 220, 132);
  color: white;
  min-width: 8rem;
  cursor: pointer;
  transition: 1s linear;
  &:hover {
    background-color: rgb(7, 121, 7);
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  font-size: 1rem;
  input {
    margin: 0.5rem 0;
    min-width: 40rem;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.5rem;
  }

  select {
    margin: 1rem 0;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.5rem;
  }

  button {
    border: none;
    padding: 1rem;
    border-radius: 5px;
    background-color: rgb(132, 220, 132);
    color: white;
    cursor: pointer;
    transition: 1s linear;
  }
  button:hover {
    background-color: rgb(7, 121, 7);
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  select {
    margin: 1rem 1rem 1rem 0;
  }
  input {
    margin: 1rem 0;
    min-width: 20rem;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Required = styled.div`
  color: red;
`;
const RequiredInvisible = styled.div`
  visibility: hidden;
`;
const Header = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  align-self: center;
`;
const Shipment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => {
    if (state.user.currentUser.others) return state.user.currentUser.others._id;
  });
  const productsInfo = useAppSelector((state) => state.cart.products);
  const products = productsInfo.map((product) => {
    return { _id: product._id, quantity: product.quantity };
  });
  const amount = useAppSelector((state) => state.cart.total);
  const formData = useAppSelector((state) => state.userData);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const address = formData;
  const status = "pending";
  const goodText = <>Pole jest dobre</>;
  const checkIfEmptyForm = Object.values(formData).every(
    (element) => element.length !== 0
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const validationRules: { [key: string]: RegExp } = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      name: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/,
      street: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s\d\/]+$/,
      postCode: /^\d{2}-\d{3}$/,
      city: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/,
      phone: /^\d{9}$/,
    };

    const errorMessages: { [key: string]: string } = {
      email: "Nieprawidłowy adres email",
      firstName: "Nieprawidłowe imię",
      lastName: "Nieprawidłowe nazwisko",
      street: "Nieprawidłowa ulica",
      postCode: "Nieprawidłowy kod pocztowy (format: XX-XXX)",
      city: "Nieprawidłowe miasto",
      phone: "Nieprawidłowy numer telefonu (9 cyfr)",
    };
    for (const field in formData) {
      if (formData[field] === "") {
        errors[field] = "Pole jest wymagane";
      } else if (
        validationRules[field] &&
        !validationRules[field].test(formData[field])
      ) {
        errors[field] = errorMessages[field] || "Nieprawidłowe dane";
      }
    }
    return errors;
  };
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const value = event.target.value;

    dispatch(contactData({ [field]: value }));
  };
  const handleCashOnDelivery = () => {
    sendData({ userId, products, amount, address, status });
    sendEmail(formData.email);
    addOrder(dispatch, { userId, products, amount, address, status });
    dispatch(clearCart());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    // dispatch(resetContactData());
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      navigate("/success");
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
            onChange={(e) => handleInputChange(e, "email")}
            required
          />
          {formErrors.email ? (
            <Required>{formErrors.email}</Required>
          ) : (
            <RequiredInvisible>{goodText}</RequiredInvisible>
          )}
          <input
            type="text"
            placeholder="Imię"
            value={formData.firstName}
            onChange={(e) => handleInputChange(e, "firstName")}
            required
          />
          {formErrors.firstName ? (
            <Required>{formErrors.firstName}</Required>
          ) : (
            <RequiredInvisible>{goodText}</RequiredInvisible>
          )}
          <input
            type="text"
            placeholder="Nazwisko"
            value={formData.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            required
          />{" "}
          {formErrors.lastName ? (
            <Required>{formErrors.lastName}</Required>
          ) : (
            <RequiredInvisible>{goodText}</RequiredInvisible>
          )}
          <input
            type="text"
            placeholder="Ulica"
            value={formData.street}
            onChange={(e) => handleInputChange(e, "street")}
            required
          />{" "}
          {formErrors.street ? (
            <Required>{formErrors.street}</Required>
          ) : (
            <RequiredInvisible>{goodText}</RequiredInvisible>
          )}
          <input
            type="text"
            placeholder="Nr mieszkania,lokalu, itp.(opcjonalnie)"
            value={formData.flat}
            onChange={(e) => handleInputChange(e, "flat")}
          />{" "}
          <Wrapper>
            <div>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange(e, "country")}
                required
              >
                <option>Polska</option>
              </select>
              {formData.country && (
                <RequiredInvisible>{goodText}</RequiredInvisible>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Kod pocztowy"
                value={formData.postCode}
                onChange={(e) => handleInputChange(e, "postCode")}
                required
              />{" "}
              {formErrors.postCode ? (
                <Required>{formErrors.postCode}</Required>
              ) : (
                <RequiredInvisible>{goodText}</RequiredInvisible>
              )}
            </div>
          </Wrapper>
          <input
            type="text"
            placeholder="Miasto"
            value={formData.city}
            onChange={(e) => handleInputChange(e, "city")}
            required
          />{" "}
          {formErrors.city ? (
            <Required>{formErrors.city}</Required>
          ) : (
            <RequiredInvisible>{goodText}</RequiredInvisible>
          )}
          <input
            type="tel"
            placeholder="Numer Telefonu"
            value={formData.phone}
            onChange={(e) => handleInputChange(e, "phone")}
            required
          />{" "}
          {formErrors.phone ? (
            <Required>{formErrors.phone}</Required>
          ) : (
            <RequiredInvisible>{goodText}</RequiredInvisible>
          )}
        </Form>
        <Button
          onClick={(e) => {
            handleSubmit(e);
            handleCashOnDelivery();
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
