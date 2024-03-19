import { createSlice } from '@reduxjs/toolkit';

import { type InterRegister } from '../types/InterfaceNewUserSlice';

const initialState: InterRegister = {
    newUser: {},
    isFetching: false,
    error: false,
};
const newUserSlice = createSlice({
    name: 'newUser',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.newUser = action.payload;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});
export const { registerStart, registerSuccess, registerFailure } =
    newUserSlice.actions;
export default newUserSlice.reducer;
