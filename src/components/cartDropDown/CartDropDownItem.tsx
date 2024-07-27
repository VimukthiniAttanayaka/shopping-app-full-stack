import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { ICart } from '../../Types/ShoppingTypes';
import { carrot, coconut } from "../../assets/images/images";
import { Trash } from 'react-feather';

type CartDropDownItemProps = {
    item: ICart,
    index: number,
    onCartItemRemove: (index: number) => void;
}
const CartDropDownItem: React.FC<CartDropDownItemProps> = (props) => {
    const { item, onCartItemRemove, index } = props;
    var imglink;
    const itemfullprice = parseInt(item.price) * item.quantity;

    if (item.img === "carrot") {
        imglink = carrot;
    } else if (item.img === "coconut") {
        imglink = coconut;
    }
    return (
        <Row className='pe-0'>
            <Col xs={4} className="cart-d-img p-0">
                <Image src={imglink} alt="item img" />
            </Col>
            <Col xs={6} className="cart-d-details p-0">
                <Row className='cart-d-name'>
                    <h5 className='font-12px ps-4 mb-4'>{item.name}</h5>
                </Row>
                <Row className='cart-d-quentity'>
                    <h5 className='font-12px ps-4'>Qty: {item.quantity}</h5>
                </Row>
            </Col>
            <Col xs={2} className="cart-d-price p-0">
                <h5 className='font-12px mb-3 me-3' onClick={() => onCartItemRemove(index)}><Trash className='cart-trash colour-gray' /></h5>
                <h5 className='font-12px me-3'>Rs.{itemfullprice}.00</h5>
            </Col>
            <hr />
        </Row>
    )
}

export default CartDropDownItem;
