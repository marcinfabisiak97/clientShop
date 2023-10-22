import { createSlice } from "@reduxjs/toolkit";
interface Others {
  _id?: string;
  username?: string;
  firstname?:string;
  lastname?:string;
  email?:string;
  isAdmin?:string;
  createdAt?:string;
  updatedAt?:string;
}
interface CurrentUser {
  others?: Others;
  accessToken?: string;
}
interface User {
  currentUser: CurrentUser;
  isFetching: boolean;
  error: boolean;
  loggedIn: boolean;
}
const initialState: User = {
  currentUser: {},
  isFetching: false,
  error: false,
  loggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.loggedIn = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.loggedIn = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.loggedIn = false;
    },
    logOut: (state) => {
      state.isFetching = false;
      state.error = false;
      state.loggedIn = false;
      state.currentUser = {};
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logOut } =
  userSlice.actions;
export default userSlice.reducer;
