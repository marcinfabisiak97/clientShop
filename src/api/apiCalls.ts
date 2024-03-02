import { publicRequest, userRequest } from "../requestMethods";
import { updateUserStart,updateUserSuccess,updateUserFailure } from "../redux/updateUserSlice";
import { addProduct } from "../redux/cartSlice";
import { AppDispatch } from "../redux/store";




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
