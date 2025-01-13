import React, {useEffect, useState} from 'react';
import {ICart} from '../../Types/ShoppingTypes';
import {Button, Col, Form, Image, Row} from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import {IProduct} from "../../Types/IProduct";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, changeQuantity} from "../../redux/slices/OrderSlice.ts";
import {RootState} from "../../redux/store.ts";
import {ICartItem} from "../../Types/ICartItem.tsx";

type ProductProps = {
    product: IProduct,
    index: number,
    onCartItemCreate: (newItem: ICart) => void;
}
const Product: React.FC<ProductProps> = (props) => {

    const location = useLocation();
    const [url, setURL] = useState<string>('');
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const {product} = props;
    const cart = useSelector((state: RootState) => state.orders.cart)
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
    const dispatch = useDispatch();


    const handleOnQuantityChanged = (num: string) => {
        setSelectedQuantity(parseInt(num));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const cartAdd = () => {
        dispatch(addToCart({
            id: product.id || '',
            name: product.name,
            quantity: selectedQuantity,
            price: product.price,
            discount: (+product.price - +product.discountedPrice).toString(),
            image: product.image,
        }))
    }

    const updateCart = () => {
        dispatch(changeQuantity({
            id: product.id || '',
            quantity: selectedQuantity,
        }))
    }

    useEffect(() => {
        setURL(location.pathname);
    }, [location]);

    useEffect(() => {
        const existingCartItem = cart.find((item: ICartItem) => item.id == product.id);
        if (existingCartItem) {
            setIsAddedToCart(true)
            setSelectedQuantity(existingCartItem.quantity)
        }

    }, [cart])

    return (
        <div
            className={url === '/admin/products/addproduct' ? 'mb-1 mb-sm-2 products p-0' : 'mt-1 mb-1 mb-sm-2 products p-0'}>
            <Row className='product-item'>
                <Col sm={12} className='product-img'>
                    <Image src={product.image} alt="product"/>
                </Col>
                <Col sm={12} className='product-name px-3'>
                    <p>{product.name}</p>
                </Col>
                <Col sm={12} className='product-price sm-1 px-4'>
                    <Row>
                        <Col xs={6} className='old-price ps-2'>
                            <p>Rs.{product.price}</p>
                        </Col>
                        <Col xs={6} className='new-price pe-2'>
                            <p>Rs.{product.discountedPrice}</p>
                        </Col>
                    </Row>
                </Col>
                <Col className='px-4 mb-1'>
                    <Form noValidate onSubmit={handleSubmit} className='product-quantity'>
                        <Row className='mb-1'>
                            <Col xs={12} sm={5} md={4} lg={6} className="ps-2">
                                <Form.Group>
                                    <Form.Control type='number' min="1" value={selectedQuantity}
                                                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                                      handleOnQuantityChanged(ev.target.value)
                                                  }/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={7} md={8} lg={6} className='product-add-cart ps-sm-0 pe-2'>
                                <Button type='submit' variant="light"
                                        className={isAddedToCart ? 'add-cart-btn-u' : 'add-cart-btn'}
                                        onClick={isAddedToCart ? updateCart : cartAdd}
                                        disabled={url === '/admin/products/addproduct'}
                                >{isAddedToCart ? 'Update' : 'Add To Cart'}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
export default Product;
