import React from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import {Trash} from 'react-feather';
import {useDispatch} from "react-redux";
import {deleteItem} from "../../redux/slices/OrderSlice.ts";
import {ICartItem} from "../../Types/ICartItem.tsx";

type CartDropDownItemProps = {
    item: ICartItem,
}
const CartDropDownItem: React.FC<CartDropDownItemProps> = (props) => {
    const { item } = props;
    const dispatch = useDispatch()
    const handleOnCartItemRemove = (id: string) => {
        dispatch(deleteItem(id))
    }
    return (
        <Row className='pe-0'>
            <Col xs={4} className="cart-d-img p-0">
                <Image src={item.image} alt="item img" />
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
                <h5 className='font-12px mb-3 me-3' onClick={() => handleOnCartItemRemove(item.id || '')}><Trash className='cart-trash colour-gray' /></h5>
                <h5 className='font-12px me-3'>Rs.{+item.price * +item.quantity}.00</h5>
            </Col>
            <hr />
        </Row>
    )
}

export default CartDropDownItem;
