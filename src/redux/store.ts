import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    type TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartSlice';
import newUserReducer from './newUserSlice';
import orderReducer from './orderSlice';
import updateUserReducer from './updateUserSlice';
import userDataReducer from './userDataSlice';
import userReducer from './userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    user: userReducer,
    updateUser: updateUserReducer,
    cart: cartReducer,
    order: orderReducer,
    newUser: newUserReducer,
    userData: userDataReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => typeof store.dispatch =
    useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
