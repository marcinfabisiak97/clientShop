import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/newUserSlice";
import { updateUserStart,updateUserSuccess,updateUserFailure } from "../redux/updateUserSlice";
import { addProduct } from "../redux/cartSlice";
import { AppDispatch } from "../redux/store";

interface Order {
  userId: string | undefined;
  products: { _id: string; quantity: number }[];
  amount: number;
  address: {};
  status: string;
}
const localStorageItem = localStorage.getItem("persist:root");
const TOKEN =
  localStorageItem &&
  JSON.parse(JSON.parse(localStorageItem).user).currentUser.accessToken;
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
export const updateUser = async (
  id: string,
  user: {},
  dispatch: AppDispatch
) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addOrder = async (dispatch: AppDispatch, order: Order) => {
  try {
    const res = await userRequest.post("/orders", order, {
      headers: {
        token: `Bearer ${TOKEN}`,
      },
    });
    dispatch(addProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const sendEmail = async (recipient: string) => {
  try {
    const res = await publicRequest.post("/sendemail", {
      recipient: recipient,
    });
  } catch (err) {
    console.log(err);
  }
};
export const sendData = async (data: {}) => {
  try {
    const res = await publicRequest.post("/sendorderdetails", {
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
