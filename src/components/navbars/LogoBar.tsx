import React, {useState} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import Logo from '../../assets/images/LOGO.png';
import {ShoppingCart} from 'react-feather';
import CartDropDown from '../cartDropDown/CartDropDown';
import {ICart} from '../../Types/ShoppingTypes';
import {Link} from "react-router-dom";

type LogoBarProp = {
    cartItems: ICart[],
    onCartItemRemove: (index: number) => void;
}
const LogoBar: React.FC<LogoBarProp> = (props) => {
    const {cartItems, onCartItemRemove} = props;
    const [isCartVisible, setIsCartVisible] = useState(false);

    const cartVisible = () => {
        if (isCartVisible) {
            setIsCartVisible(false)
        } else {
            setIsCartVisible(true);
        }
    }

    //Sticky header
    let scrollFunc: () => void;
    window.addEventListener('load', () => {
        const navbar = document.getElementById("navigation");

        if (!navbar) {
            return;
        }
        const sticky = navbar.offsetTop;

        scrollFunc = () => {
            if (window.scrollY >= sticky) {

                navbar.classList.add("stick")
            } else {

                navbar.classList.remove("stick");
            }
        }
    });

    window.onscroll = function () {
        scrollFunc()
    };


    return (
        <Row className="logo-bar" id='navigation'>
            <Col className='mx-lg-5'>
                <Row className='mx-lg-5'>
                    <Col lg={9} sm={8} xs={9} className="ps-0">
                        <Image src={Logo} className="img-fluid navbar-logo ms-lg-5 ms-md-4 ms-sm-0"/>
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
                        {isCartVisible && <CartDropDown cartItems={cartItems}
                                                        onCartItemRemove={onCartItemRemove}/>}
                    </Col>
                </Row>
            </Col>

        </Row>
    )
}

export default LogoBar;
