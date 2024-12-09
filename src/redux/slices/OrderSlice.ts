import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem} from "../../Types/ICartItem.tsx";

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
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            state.cart.push(action.payload)

        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item: ICartItem) => item.id !== action.payload)
        },
        changeQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            state.cart = state.cart.map((item: ICartItem) =>
                item.id === action.payload.id ? {...item, quantity: action.payload.quantity} : item)
        }
    }
});

export const {
    addToCart,
    deleteItem,
    changeQuantity
} = orderSlice.actions
export default orderSlice.reducer;
