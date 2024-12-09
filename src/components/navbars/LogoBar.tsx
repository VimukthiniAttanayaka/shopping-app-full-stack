import React, {useState} from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import Logo from '../../assets/images/LOGO.png';
import {ShoppingCart} from 'react-feather';
import CartDropDown from '../cartDropDown/CartDropDown';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const LogoBar: React.FC = () => {
    const cartItems = useSelector((state:RootState) => state.orders.cart)
    const [isCartVisible, setIsCartVisible] = useState(false);
    const navigate = useNavigate();

    const cartVisible = () => {
        setIsCartVisible(!isCartVisible)
    }


    return (
        <Row className="logo-bar" id='navigation'>
            <Col className='mx-lg-5'>
                <Row className='mx-lg-5'>
                    <Col lg={9} sm={8} xs={9} className="ps-0">
                        <Image src={Logo} className="img-fluid navbar-logo ms-lg-5 ms-md-4 ms-sm-0"
                               onClick={() => navigate('/')}
                        />
                    </Col>
                    <Col lg={1} sm={1} xs={2} onClick={cartVisible}
                         className='shopping-cart-and-basket d-flex justify-content-end pe-sm-3 ms-xl-5 pe-0'>
                        <ShoppingCart className="shopping-cart mt-lg-0 me-0"/>
                        <span className="cart-basket d-flex align-items-center justify-content-center pt-sm-1">
                    {cartItems.length}
                </span>
                    </Col>
                    <Col lg={1} sm={2}
                         className='ps-0 d-sm-block d-none'>
                        <Link to='/checkout'>
                            <button type="button" className=" py-0 px-2 btn text-light">Checkout</button>
                        </Link>
                    </Col>
                    <Col xs={12} className='cart-priview'>
                        {isCartVisible && <CartDropDown handleCartDropDownClose={cartVisible}/>}
                    </Col>
                </Row>
            </Col>

        </Row>
    )
}

export default LogoBar;
