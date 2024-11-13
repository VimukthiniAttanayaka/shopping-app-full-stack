import {AUTH_KEY, USER_REAL_NAME} from "../static/static.ts";
import {store} from "../redux/store.ts";
import {setIsAuthorized} from "../redux/slices/AuthSlice.ts";

export const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_REAL_NAME)
    store.dispatch(setIsAuthorized(false))
}