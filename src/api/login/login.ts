import { publicRequest } from "../../requestMethods";
import { AppDispatch } from "../../redux/store";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
export const login = async (
    dispatch: AppDispatch,
    user: { username: string; password: string }
  ) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };