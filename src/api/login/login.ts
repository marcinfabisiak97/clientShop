import { type AppDispatch } from '../../redux/store';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { publicRequest } from '../../requestMethods';

export const login = async (
    dispatch: AppDispatch,
    user: { username: string; password: string },
): Promise<void> => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
