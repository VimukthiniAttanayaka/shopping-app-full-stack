import {configureStore} from '@reduxjs/toolkit'
import productReducer from './slices/ProductSlice';
import authReducer from "./slices/AuthSlice";
import orderReducer from "./slices/OrderSlice.ts";

export const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        orders: orderReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
