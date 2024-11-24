import React from 'react';
import {Button, Col, Image, Row} from 'react-bootstrap';
import 'react-dropdown/style.css';
import CartDropDownItem from './CartDropDownItem';
import cartEmpty from './../../assets/images/cart.png';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {ICartItem} from "../../Types/ICartItem.tsx";

const CartDropDown: React.FC = () => {

    const cartItems = useSelector((state: RootState) => state.orders.cart)

    const subTotalCalculate = () => {
        let subtotal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            subtotal = (parseInt(cartItems[i].price) * +cartItems[i].quantity) + subtotal;
        }
        return subtotal;
    }

    const discountCalculate = () => {
        let subtotal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            subtotal = (parseInt(cartItems[i].discount) * +cartItems[i].quantity) + subtotal;
        }
        return subtotal;
    }

    const calculateItemTotal = () => {
        let quantityTotal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            quantityTotal = +cartItems[i].quantity + quantityTotal;
        }
        return quantityTotal;
    }

    if (cartItems.length === 0) {
        return (
            <Row className='cart-priview-header cart-priview-header1'>
                <Col xs={12} className='p-0'>
                    <Image src={cartEmpty} className="cart-empty"/>
                    <p className='cart-empty-text colour-red font-12px'>Your Cart is empty</p>
                    <p className='cart-empty-text colour-gray font-12px'>Add items to your cart :)</p>
                </Col>
            </Row>
        );
    }

    const renderCartItems = () => {
        return (
            <Row className='cart-items pe-2'>
                {cartItems.map((item: ICartItem, index: number) => (
                    <CartDropDownItem
                        item={item}
                        key={index}
                    />
                ))}
            </Row>
        );
    };

    return (
        <Row className='cart-priview-header'>
            <Col xs={12} className='cart-content p-0'>
                {renderCartItems()}
                <Row className='mt-3'>
                    <Col xs={6} md={8}>
                        <Row>
                            <h5 className='font-12px ps-0'>Subtotal ({calculateItemTotal()} items)</h5>
                        </Row>
                        <Row>
                            <h5 className='font-12px ps-0'>Discount</h5>
                        </Row>
                    </Col>
                    <Col xs={6} md={4} className="cart-values">
                        <h5 className='colour-red font-12px pe-4'><NumberFormat value={subTotalCalculate()}
                                                                                displayType={'text'}
                                                                                thousandSeparator={true}
                                                                                prefix={'Rs. '}/>.00</h5>
                        <h5 className='font-12px pe-4'><NumberFormat value={discountCalculate()} displayType={'text'}
                                                                     thousandSeparator={true} prefix={'Rs. '}/>.00</h5>
                    </Col>
                    <hr className='hr'/>
                </Row>

                <Row>
                    <Col xs={6} className='ps-0'>
                        <h5 className='font-12px ps-0'>Total</h5>
                    </Col>
                    <Col xs={6} className="cart-values">
                        <h5 className='colour-red font-12px pe-4'>
                            <NumberFormat value={subTotalCalculate() - discountCalculate()} displayType={'text'}
                                          thousandSeparator={true}
                                          prefix={'Rs. '}/>.00</h5>
                    </Col>
                </Row>
                <Link to='/checkout'>
                    <Button className='cart-checkout mb-2 mb-lg-0 mt-1'>checkout</Button>
                </Link>
            </Col>
        </Row>
    )
}
export default CartDropDown;
