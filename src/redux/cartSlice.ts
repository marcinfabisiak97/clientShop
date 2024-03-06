import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Product {
    _id: string;
    title: string;
    description: string;
    img: string[];
    price: number;
    color: string[];
    quantity: number;
}
interface Cart {
    products: Product[];
    quantity: number;
    total: number;
}
const initialState: Cart = { products: [], quantity: 0, total: 0 };
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (
            state,
            action: PayloadAction<{
                product: Product;
                quantity: number;
            }>,
        ) => {
            if (!action.payload.product?._id) {
                return;
            }

            const existingProduct = state.products.find((product) => {
                return product._id === action.payload.product._id;
            });

            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
                state.total +=
                    action.payload.product.price * action.payload.quantity;
            } else {
                state.quantity += 1;
                state.products.push({
                    ...action.payload.product,
                    quantity: action.payload.quantity,
                });

                state.total +=
                    action.payload.product.price * action.payload.quantity;
            }
        },

        removeProduct: (state, action) => {
            state.products.splice(
                state.products.findIndex(
                    (product) => product._id === action.payload.product._id,
                ),
                1,
            );
            state.quantity -= 1;
            state.total -=
                action.payload.product.price * action.payload.quantity;
        },
        decreseProduct: (state, action) => {
            const existingProduct = state.products.find(
                (product) => product._id === action.payload.product._id,
            );
            if (existingProduct) {
                existingProduct.quantity -= 1;
                state.total -=
                    action.payload.product.price * action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});
export const { addProduct, removeProduct, decreseProduct, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
