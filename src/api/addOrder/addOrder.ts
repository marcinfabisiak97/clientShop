import { addProduct } from '../../redux/cartSlice';
import { type AppDispatch } from '../../redux/store';
import { userRequest } from '../../requestMethods';
import { type InterProduct } from '../../types/InterfaceProduct';
import { type InterOrder } from './InterfaceAddOrder';

const localStorageItem: string | null = localStorage.getItem('persist:root');
const parsedItem =
    localStorageItem !== null ? JSON.parse(localStorageItem) : null;
const accessToken: string | undefined =
    parsedItem?.user?.currentUser?.accessToken ?? undefined;

const TOKEN: string | undefined = accessToken;

export const addOrder = async (
    dispatch: AppDispatch,
    order: InterOrder,
): Promise<void> => {
    try {
        const res = await userRequest.post('/orders', order, {
            headers: {
                token: `Bearer ${TOKEN}`,
            },
        });
        dispatch(
            addProduct(res.data as { product: InterProduct; quantity: number }),
        );
    } catch (err) {
        console.log(err);
    }
};
