import { updateUserStart,updateUserSuccess,updateUserFailure } from "../../redux/updateUserSlice";
import { AppDispatch } from "../../redux/store";
import { userRequest } from "../../requestMethods";
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
  