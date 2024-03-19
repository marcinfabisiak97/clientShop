import {
    registerFailure,
    registerStart,
    registerSuccess,
} from '../../redux/newUserSlice';
import { type AppDispatch } from '../../redux/store';
import { publicRequest } from '../../requestMethods';

export const register = async (
    dispatch: AppDispatch,
    newUser: {
        firstname: string;
        lastname: string;
        username: string;
        password: string;
        email: string;
    },
): Promise<void> => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post('/auth/register', newUser);
        dispatch(registerSuccess(res.data));
    } catch (err: any) {
        dispatch(registerFailure());
    }
};
