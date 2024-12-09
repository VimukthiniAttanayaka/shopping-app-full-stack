import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../Types/IProduct";
import CategoryDataList from "../../Types/CategoryDateList.tsx";

interface productState {
    products: IProduct[]
    selectedCategory: string
}

const initialState: productState = {
    products: [],
    selectedCategory: CategoryDataList[0].name
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
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
    }
    })
;

export const {
    // addProduct,
    // updateProduct,
    // deleteProduct,
    // getProduct,
    setProducts,
    setSelectedCategory
} = productSlice.actions;
export default productSlice.reducer;

