import {AUTH_KEY} from "../../static/static.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    isAuthorized: boolean
}

const initialState: AuthState = {
    isAuthorized: !!localStorage.getItem(AUTH_KEY)
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload
        }
    }
})

export const {
    setIsAuthorized
} = authSlice.actions

export default authSlice.reducer

