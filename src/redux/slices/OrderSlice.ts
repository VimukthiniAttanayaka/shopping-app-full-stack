import {ICartItem} from "../../Types/ICartItem";
import {createSlice} from "@reduxjs/toolkit";

interface productState {
    cart: ICartItem[],
}

const initialState: productState = {
    cart: []
}

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addToCart: () => {

        }
    }
});

export const {addToCart} = orderSlice.actions
export default orderSlice.reducer;
