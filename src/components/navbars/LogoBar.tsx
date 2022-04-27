import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Logo from '../../assets/images/LOGO.png';
import { ShoppingCart } from 'react-feather';
import CartDropDown from '../pages/CartDropDown';
import { ICart } from '../../Types/ShoppingTypes';
import { Link } from "react-router-dom";

type LogoBarProp = {
    cartItems: ICart[],
    onCartItemRemove: (index: number) => void;
}
const LogoBar: React.FC<LogoBarProp> = (props) => {
    const { cartItems, onCartItemRemove } = props;
    const [isCartVisible, setIsCartVisible] = useState(false);

    const cartVisible = () => {
        if (isCartVisible === true) {
            setIsCartVisible(false)
        } else {
            setIsCartVisible(true);
        }
    }

    return (
        <Row className="logobar">
            <Col xl={8} lg={8} sm={7} xs={6} className="ps-3 me-xl-4">
                <Image src={Logo} className="img-fluid ms-md-5" />
            </Col>
            <Col xl={1} lg={1} sm={1} xs={2} onClick={cartVisible} className='ms-xl-5 ps-xl-5'>
                <ShoppingCart className="shopping-cart mt-md-2 me-0" />
                <span className="d-flex align-items-center justify-content-center cart-basket">
                    {cartItems.length}
                </span>
            </Col>
            <Col xl={2} lg={3} sm={4} xs={4}
                className='d-flex justify-content-end justify-content-sm-start ps-xl-3 ps-sm-3 ps-0 '>
                <Link to='/checkout'>
                    <button type="button" className=" py-0 btn text-light">Check out</button>
                </Link>
            </Col>
            <Col xs={12} className='cart-priview'>
                {isCartVisible && <CartDropDown cartItems={cartItems}
                    onCartItemRemove={onCartItemRemove} />}
            </Col>
        </Row>
    )
}

export default LogoBar;
