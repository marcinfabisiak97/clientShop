import { type AppDispatch } from '../../redux/store';
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from '../../redux/updateUserSlice';
import { userRequest } from '../../requestMethods';

export const updateUser = async (
    id: string,
    user: Record<string, unknown>,
    dispatch: AppDispatch,
): Promise<void> => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({ id, user }));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};
