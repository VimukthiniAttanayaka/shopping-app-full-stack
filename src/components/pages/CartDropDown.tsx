import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import 'react-dropdown/style.css';
import { ICart } from '../../Types/ShoppingTypes';
import CartDropDownItem from './CartDropDownItem';
import cartempty from './../../assets/images/cart.png';
import NumberFormat from 'react-number-format';

type CartDropDownProp = {
    cartItems: ICart[],
    onCartItemRemove: (index: number) => void;
}
const CartDropDown: React.FC<CartDropDownProp> = (props) => {

    const { cartItems, onCartItemRemove } = props;

    const subTotalSet = () => {
        var subtotal = 0;
        for (var i = 0; i < cartItems.length; i++) {
            var num = (parseInt(cartItems[i].price) * cartItems[i].quentity) + subtotal
            subtotal = num;
        }
        return subtotal;
    }

    const discountSet = () => {
        var discount = 30;
        return discount;
    }

    const totalSet = () => {
        var subTotal = subTotalSet();
        var discount = discountSet();
        var total = subTotal - discount;
        return total;
    }

    const totalItemSet = () => {
        var quentityTotal = 0;
        for (var i = 0; i < cartItems.length; i++) {
            var num = cartItems[i].quentity + quentityTotal
            quentityTotal = num;
        }
        return quentityTotal;
    }

    if (cartItems.length === 0) {
        return (
            <Row className='cart-priview-header'>
                <Col xs={12} className='p-0'>
                    <Image src={cartempty} className="cart-empty" />
                    <p className='cart-empty-text colour-red font-12px'>Your Cart is empty</p>
                    <p className='cart-empty-text colour-gray font-12px'>Add items to your cart :)</p>
                </Col>
            </Row>
        );
    }

    const renderCartItems = () => {
        return (
            <Row className='cart-items pe-2'>
                {cartItems.map((item: ICart, index: number) => (
                    <CartDropDownItem
                        item={item}
                        index={index}
                        key={index}
                        onCartItemRemove={onCartItemRemove}
                    />
                ))}
            </Row>
        );
    };

    return (
        <Row className='cart-priview-header'>
            <Col xs={12} className='cart-content'>
                {renderCartItems()}
                <Row className='mt-3'>
                    <Col xs={8}>
                        <Row>
                            <h5 className='font-12px ps-0'>Subtotal ({totalItemSet()} items)</h5>
                        </Row>
                        <Row>
                            <h5 className='font-12px ps-0'>Discount</h5>
                        </Row>
                    </Col>
                    <Col xs={4} className="cart-values">
                        <h5 className='colour-red font-12px pe-4'><NumberFormat value={subTotalSet()} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />.00</h5>
                        <h5 className='font-12px pe-4'><NumberFormat value={discountSet()} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />.00</h5>
                    </Col>
                    <hr className='hr' />
                </Row>

                <Row>
                    <Col xs={6} className='ps-0'>
                        <h5 className='font-12px ps-0'>Total</h5>
                    </Col>
                    <Col xs={6} className="cart-values">
                        <h5 className='colour-red font-12px pe-4'><NumberFormat value={totalSet()} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />.00</h5>
                    </Col>
                </Row>
                <Button className='cart-checkout mb-3 mt-1'>checkout</Button>
            </Col>
        </Row>
    )
}
export default CartDropDown;