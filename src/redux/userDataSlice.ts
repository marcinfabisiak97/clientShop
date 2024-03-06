import { createSlice } from '@reduxjs/toolkit';

const initialState: Record<string, string> = {
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    flat: '',
    country: 'Polska',
    postCode: '',
    city: '',
    phone: '',
};
const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        contactData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetContactData: (state) => {
            return (state = initialState);
        },
    },
});
export const { contactData, resetContactData } = userDataSlice.actions;
export default userDataSlice.reducer;
