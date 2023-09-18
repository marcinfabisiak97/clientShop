import { createSlice } from "@reduxjs/toolkit";
interface NewUser {
  _id?: string;
}
interface Register {
  newUser: NewUser;
  isFetching: boolean;
  error: boolean;
}
const initialState: Register = {
  newUser: {},
  isFetching: false,
  error: false,
};
const newUserSlice = createSlice({
  name: "newUser",
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
