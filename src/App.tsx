import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ICart} from './Types/ShoppingTypes';
// import {useToasts} from 'react-toast-notifications';
import ECommerceApp from './view/ECommerceApp';
import AdminApp from "./view/AdminApp";
import MyProfile from "./components/pages/MyProfile.tsx";
const UpdateProduct = React.lazy(() => import("./components/Admin/Products/UpdateProduct"));
const Home = React.lazy(() => import("./components/pages/Home"));
const AboutUs = React.lazy(() => import("./components/pages/staticpages/AboutUs"));
const ContactUs = React.lazy(() => import("./components/pages/staticpages/ContactUs"));
const FAQ = React.lazy(() => import("./components/pages/staticpages/FAQ"));
const CheckOut = React.lazy(() => import("./components/pages/CheckOut"));
const Pricing = React.lazy(() => import("./components/pages/staticpages/Pricing"));
const LoginPage = React.lazy(() => import('./components/pages/LoginPage'));
const SignupPage = React.lazy(() => import('./components/pages/SignupPage'));
const ForgotPassWord = React.lazy(() => import("./components/pages/staticpages/ForgotPassWord"));
const Products = React.lazy(() => import("./components/Admin/Products/Products"));
const Orders = React.lazy(() => import("./components/Admin/Orders/Orders"));
const AddProduct = React.lazy(() => import("./components/Admin/Products/AddProduct"));
const ViewOrder = React.lazy(() => import("./components/Admin/Orders/ViewOrder"));

const App = () => {
    // const {addToast} = useToasts();
    const CartList: ICart[] = [];
    const [cartItems, setCartItems] = useState<ICart[]>(CartList);

    const handleOnCartItemCreate = (newItem: ICart) => {
        const allItems: ICart[] = cartItems.slice();
        let num = 0;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].name === newItem.name) {
                allItems.splice(i, 1, newItem);
                setCartItems(allItems);
                num = 1;
                return;
            } else {
                num = 0;
            }
        }
        if (num === 0) {
            allItems.push(newItem);
            setCartItems(allItems);
        }
        // addToast("Item Add To Cart", {appearance: 'success', autoDismiss: true});
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ECommerceApp />}>
                    <Route path='/' element={<Home onCartItemCreate={handleOnCartItemCreate}/>}/>
                    <Route path='/about' element={<AboutUs/>}/>
                    <Route path='/contact' element={<ContactUs/>}/>
                    <Route path='/faq' element={<FAQ/>}/>
                    <Route path='/pricing' element={<Pricing/>}/>
                    <Route path='/checkout' element={<CheckOut/>}/>
                    <Route path='/loginpage' element={<LoginPage/>}/>
                    <Route path='/signuppage' element={<SignupPage/>}/>
                    <Route path='/forgotpassword' element={<ForgotPassWord/>}/>
                    <Route path='/my-account' element={<MyProfile/>}/>
                </Route>
                <Route path='/admin' element={<AdminApp/>}>
                    <Route path='/admin/products' element={<Products/>}/>
                    <Route path='/admin/products/addproduct' element={<AddProduct/>}/>
                    <Route path='/admin/products/updateProduct/:id' element={<UpdateProduct/>}/>
                    <Route path='/admin/orders' element={<Orders/>}/>
                    <Route path='/admin/orders/view-order' element={<ViewOrder/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
