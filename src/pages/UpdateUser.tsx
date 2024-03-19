import React, { useEffect, useState } from 'react';

import { updateUser } from '../api/updateUser/updateUser';
import { Button, StyledLink, Wrapper } from '../components/ui/updateUserStyles';
import { useAppDispatch, useAppSelector } from '../redux/store';

const UpdateUser = (): JSX.Element => {
    const user = useAppSelector((state) => {
        if (state.user.currentUser !== undefined)
            return state.user.currentUser.others;
    });
    const [inputs, setInputs] = useState(user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setInputs(user);
    }, [user]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ): void => {
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

    // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setInputs((prev) => {
    //         return { ...prev, [e.target.name]: e.target.value };
    //     });
    // };

    const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): Promise<void> => {
        e.preventDefault();

        // if (
        //   updatedUser.email !== user.email ||
        //   updatedUser.username !== user.username ||
        //   updatedUser.password !== user.password ||
        //   updatedUser.isAdmin !== user.isAdmin
        // ) {
        //   updateUser(user._id, updatedUser, dispatch);
        // }

        const userId = user?._id;
        if (userId !== undefined) {
            await updateUser(userId, { ...inputs }, dispatch);
        } else {
            // Handle the case where user?._id is undefined
            console.error('User ID is undefined');
        }
    };
    return (
        <Wrapper>
            {' '}
            <StyledLink to="/user">Wróć</StyledLink>
            <h1>Edycja danych</h1>
            <form>
                <section>
                    <label>Nazwa użytkownika</label>
                    <input
                        name="username"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                        }}
                    />
                </section>
                <section>
                    <label>Imię</label>
                    <input
                        name="firstname"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                        }}
                    />
                </section>
                <section>
                    <label>Nazwisko</label>
                    <input
                        name="lastname"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                        }}
                    />
                </section>
                <section>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                        }}
                    />
                </section>

                <section>
                    <label>Hasło</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                        }}
                    />
                </section>
                <Button
                    onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => {
                        handleClick(e).catch((error) => {
                            console.log(error);
                        });
                    }}
                >
                    Zmień
                </Button>
            </form>
        </Wrapper>
    );
};

export default UpdateUser;
