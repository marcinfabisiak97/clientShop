import { createSlice } from '@reduxjs/toolkit';

import { type InterInitialState } from '../types/InterfaceUser';

const initialState: InterInitialState = {
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
