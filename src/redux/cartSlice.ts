import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type InterCartSlice } from '../types/InterfaceCartSlice';
import { type InterProduct } from '../types/InterfaceProduct';

const initialState: InterCartSlice = { products: [], quantity: 0, total: 0 };
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (
            state,
            action: PayloadAction<{
                product: InterProduct;
                quantity: number;
            }>,
        ) => {
            if (action.payload.product?._id === undefined) {
                return;
            }

            const existingProduct = state.products.find((product) => {
                return product._id === action.payload.product._id;
            });

            if (existingProduct !== undefined) {
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
            if (existingProduct !== undefined) {
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
