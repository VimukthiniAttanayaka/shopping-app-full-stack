import React, {useEffect, useState} from 'react';
import {ICart} from '../../Types/ShoppingTypes';
import {Button, Col, Form, Image, Row} from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import {IProduct} from "../../Types/IProduct";

type ProductProps = {
    product: IProduct,
    index: number,
    onCartItemCreate: (newItem: ICart) => void;
}
const Product: React.FC<ProductProps> = (props) => {

    const location = useLocation();
    const [url, setURL] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const {product} = props;
    const [cartBtnText, setCartBtnText] = useState('Add To Cart');
    const [cartBtnBackground, setCartBtnBackground] = useState('add-cart-btn');

    useEffect(() => {
        setURL(location.pathname);
    }, [location]);

    const handleOnQuantityChanged = (num: string) => {
        setQuantity(parseInt(num));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    const cartAdd = () => {
        setCartBtnText("Update");
        setCartBtnBackground("add-cart-btn-u");
    }
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
                                    <Form.Control type='number' min="1" value={quantity}
                                                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                                      handleOnQuantityChanged(ev.target.value)
                                                  }/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={7} md={8} lg={6} className='product-add-cart ps-sm-0 pe-2'>
                                <Button type='submit' variant="light" className={cartBtnBackground}
                                        onClick={cartAdd}
                                        disabled={url === '/admin/products/addproduct'}
                                >{cartBtnText}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
export default Product;
