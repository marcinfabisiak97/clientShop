import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { updateUser } from "../api/apiCalls";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 0px 8px -1px rgba(66, 68, 90, 1);
  border-radius: 10px;
  width: 50vw;
  height: 50vh;
  margin: 5vh auto;
  padding: 3rem;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
`;
const Button = styled.button`
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  display: block;
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  border: 0px;
  padding: 1rem;
  border-radius: 5px;
  /* Add the following properties to center the button */
  margin: 0 auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  display: inline-block;
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  border: 0px;
  padding: 1rem;
  border-radius: 5px;
`;
const UpdateUser = () => {
  const user = useAppSelector((state) => {
    if (state.user.currentUser) return state.user.currentUser.others;
  });
  const [inputs, setInputs] = useState(user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setInputs(user);
  }, [user]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if ((e.target as HTMLInputElement).value !== undefined) {
      const target = e.target as HTMLInputElement;
      const { name, value } = target;
      setInputs((prev) => {
        return { ...prev, [name]: value };
      });
    } else if ((e.target as HTMLTextAreaElement).value !== undefined) {
      const target = e.target as HTMLTextAreaElement;
      const { name, value } = target;
      setInputs((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // if (
    //   updatedUser.email !== user.email ||
    //   updatedUser.username !== user.username ||
    //   updatedUser.password !== user.password ||
    //   updatedUser.isAdmin !== user.isAdmin
    // ) {
    //   updateUser(user._id, updatedUser, dispatch);
    // }

    updateUser(user?._id as string, { ...inputs }, dispatch);
  };
  return (
    <Wrapper>
      {" "}
      <StyledLink to="/user">Wróć</StyledLink>
      <h1>Edycja danych</h1>
      <form>
        <section>
          <label>Nazwa użytkownika</label>
          <input
            name="username"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </section>
        <section>
          <label>Imię</label>
          <input
            name="firstname"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </section>
        <section>
          <label>Nazwisko</label>
          <input
            name="lastname"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </section>
        <section>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </section>

        <section>
          <label>Hasło</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </section>
        <Button onClick={handleClick}>Zmień</Button>
      </form>
    </Wrapper>
  );
};

export default UpdateUser;
