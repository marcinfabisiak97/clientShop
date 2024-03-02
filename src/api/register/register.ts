import { publicRequest } from "../../requestMethods";
import { AppDispatch } from "../../redux/store";
import {
    registerStart,
    registerSuccess,
    registerFailure,
  } from "../../redux/newUserSlice";
export const register = async (
    dispatch: AppDispatch,
    newUser: {
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      email: string;
    }
  ) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post("/auth/register", newUser);
      dispatch(registerSuccess(res.data));
    } catch (err: any) {
      dispatch(registerFailure());
    }
  };