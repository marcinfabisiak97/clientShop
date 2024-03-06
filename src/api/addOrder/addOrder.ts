import { addProduct } from '../../redux/cartSlice';
import { type AppDispatch } from '../../redux/store';
import { userRequest } from '../../requestMethods';
import { type Order } from './addOrderInterface';

const localStorageItem = localStorage.getItem('persist:root');
const TOKEN =
    localStorageItem &&
    JSON.parse(JSON.parse(localStorageItem).user).currentUser.accessToken;

export const addOrder = async (dispatch: AppDispatch, order: Order) => {
    try {
        const res = await userRequest.post('/orders', order, {
            headers: {
                token: `Bearer ${TOKEN}`,
            },
        });
        dispatch(addProduct(res.data));
    } catch (err) {
        console.log(err);
    }
};
