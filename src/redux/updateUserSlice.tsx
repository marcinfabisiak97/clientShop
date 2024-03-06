import { createSlice } from '@reduxjs/toolkit';

interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    img: string;
}
interface InitialState {
    users: User[];
    isFetching: boolean;
    error: boolean;
}
const initialState: InitialState = {
    users: [],
    isFetching: false,
    error: false,
};
const updateUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex((item) => item._id === action.payload)
            ] = action.payload.product;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});
export const { updateUserStart, updateUserSuccess, updateUserFailure } =
    updateUsersSlice.actions;
export default updateUsersSlice.reducer;
