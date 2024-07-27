import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../Types/IProduct";

interface productState {
    products: IProduct[]
}

const initialState: productState = {
    products: []
}
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // addProduct: (state, action: PayloadAction<IProduct>) => {
        //
        // },
        // updateProduct: (state, action: PayloadAction<IProduct>) => {
        //
        // },
        // deleteProduct: (state, action: PayloadAction<string>) => {
        //
        // },
        //
        // getProduct: (state, action: PayloadAction<string>) => {
        //
        // },
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
    }
    })
;

export const {
    // addProduct,
    // updateProduct,
    // deleteProduct,
    // getProduct,
    setProducts
} = productSlice.actions;
export default productSlice.reducer;

