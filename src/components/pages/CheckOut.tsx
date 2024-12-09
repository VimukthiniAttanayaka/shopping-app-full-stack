import {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {Button, Col, Form, FormControl, Image, Row, Table} from "react-bootstrap";
import CheckOutTableItem from "../CheckOut/CheckOutTableItem";
import NumberFormat from "react-number-format";
import BillingForm from "../CheckOut/BillingForm.tsx";
import banner from '../../assets/images/banners/checkoutPageBanner.webp';
import ChangeShippingAddressSection from "../CheckOut/ChangeShippingAddressSection";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {ICartItem} from "../../Types/ICartItem.tsx";
import {DeliveryCharge} from "../../static/data.ts";
import {Discounts} from "../../static/enums.ts";
import {useMutation} from "@apollo/client";
import {CREATE_ORDER} from "../../api/order.ts";

interface ShippingFormHandles {
    validateForm: () => Promise<any>;
    getFormValues: () => any;
}

const CheckOut: FC = () => {
    const cartItems = useSelector((state: RootState) => state.orders.cart)
    const [createOrder] = useMutation(CREATE_ORDER)
    const [discountCode, setDiscountCode] = useState<string>('')
    const [discountByCode, setDiscountByCode] = useState<number>(0)
    const [colSpan1, setColSpan1] = useState<number>(3);
    const [colSpan2, setColSpan2] = useState<number>(4);


    const renderCartItems = () => {
        return cartItems.map((item: ICartItem, index) => {
            return <CheckOutTableItem cartItem={item} index={index} key={index}/>;
        })
    }

    //discount code submit handler
    const handleOnDiscountCodeSubmit = () => {
        if (Object.keys(Discounts).includes(discountCode)) {
            setDiscountByCode(Discounts[discountCode as keyof typeof Discounts])
        }
    }

    //Discount code change handler
    const handleOnDiscountCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDiscountCode(event.target.value)
    }

    const billingFormRef = useRef<ShippingFormHandles | null>(null);
    //Form submit button handler
    const handleOnFormSubmit = async () => {
        if (billingFormRef.current) {
            const errors = await billingFormRef.current.validateForm();
            const isFormValid = Object.keys(errors).length === 0;

            if (isFormValid) {
                const billingValues = billingFormRef.current.getFormValues();
                const order = {
                    "placeOrderInput": {
                        "billingAddress": {
                            "address": billingValues.address,
                            "city": billingValues.city,
                            "contact": billingValues.contact,
                            "country": billingValues.selectedCountry.label,
                            "email": billingValues.email,
                            "fullName": billingValues.fullName,
                            "postalCode": billingValues.postalCode
                        },
                        "deliveryCharge": DeliveryCharge,
                        "discountCode": discountByCode ? discountCode : "",
                        "orderList": cartItems.map((item: ICartItem) => ({
                            "productId": item.id,
                            "quantity": item.quantity
                        })),
                        "shippingAddress": {
                            "address": billingValues.address,
                            "city": billingValues.city,
                            "contact": billingValues.contact,
                            "country": billingValues.selectedCountry.label,
                            "email": billingValues.email,
                            "fullName": billingValues.fullName,
                            "postalCode": billingValues.postalCode
                        }
                    }
                }
                createOrder({variables: order})
                console.log(order)


            } else {
                console.error("Form Validation Errors:", errors);
            }
        }
    }

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

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    const handleResize = () => {
        const width = window.innerWidth;
        if (width > 832) {
            setColSpan1(3);
            setColSpan2(4);
        } else if (width <= 832 && width > 426) {
            setColSpan1(2);
            setColSpan2(5);
        } else if (width <= 426) {
            setColSpan1(0);
            setColSpan2(7);
        }
    }

    return (
        <Row className='mx-lg-5'>
            <Col className='mx-lg-3'>
                <Row className="mx-lg-5 mx-md-4 mx-3 px-lg-5 px-md-2 pt-3 my-5 ">
                    <h5 className="ps-0 page-title">Checkout Page</h5>
                    <Col md={12} className="checkout p-3 ">
                        <h5 className="ps-2 table-title">Shopping Cart</h5>
                        <Table className='checkout-table' responsive={true}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th/>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {renderCartItems()}

                            <tr className="px-0">
                                {colSpan1 !== 0 && <td colSpan={colSpan1}/>}
                                <td colSpan={colSpan2} className='pe-0'>
                                    <Form className="d-flex justify-content-start align-items-center">
                                        <span className="fs-5 me-3 discount-code-text">Have a discount code? </span>
                                        <FormControl
                                            type="text"
                                            className="discount-input me-3"
                                            value={discountCode}
                                            onChange={handleOnDiscountCodeChange}/>
                                        <Button className="signing-button px-4" type="button"
                                                disabled={!!discountByCode} onClick={handleOnDiscountCodeSubmit}>APPLY</Button>
                                    </Form>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={5}>Delivery Charge</td>
                                <td colSpan={2} className="px-0">
                                    <NumberFormat className='checkout-number-format-delivery bg-transparent'
                                                  prefix="Rs."
                                                  value={DeliveryCharge}
                                                  decimalScale={2}
                                                  fixedDecimalScale={true}
                                                  disabled
                                    />
                                </td>
                            </tr>

                            {!!discountByCode && <tr>
                                <td colSpan={5}>Discount</td>
                                <td colSpan={2} className="px-0">
                                    <NumberFormat className='checkout-number-format-delivery bg-transparent'
                                                  prefix="Rs."
                                                  value={discountByCode}
                                                  decimalScale={2}
                                                  fixedDecimalScale={true}
                                                  disabled
                                    />
                                </td>
                            </tr>}

                            <tr className="checkout-total">
                                <td colSpan={5} className='left text'>Total</td>
                                <td colSpan={2} className="px-0 text-end">
                                    <NumberFormat
                                        className='checkout-number-format-total text-red fw-bold bg-transparent'
                                        displayType={"text"}
                                        prefix="Rs."
                                        value={subTotalCalculate() - discountCalculate() - discountByCode + DeliveryCharge}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        disabled
                                    />
                                </td>
                            </tr>

                            </tbody>
                        </Table>
                    </Col>

                    <Col lg={5} md={12} className="mt-3 ps-0 pe-0 pe-lg-3">
                        <Image src={banner} fluid={true} className="border p-1"/>
                    </Col>

                    <Col lg={7} md={12} className="mt-3 ps-lg-3">
                        <Row>
                            <Col md={12} className="border py-4">
                                <Row className='signup-banner'>
                                    <Col lg={9} md={9} sm={5} className='align-items-center d-inline-flex'>
                                      <span className='mx-lg-2 mx-0'>
                                        Already have an account?
                                      </span>
                                    </Col>
                                    <Col lg={3} md={3} sm={4} className='d-flex justify-content-end'>
                                        <Button className="signing-button" type="submit">Sign in</Button>
                                    </Col>
                                </Row>

                            </Col>
                            <Col md={12} className="border px-0 mt-1">
                                <p className="border-bottom py-3 mx-3">
                                    Shipping and Billing Address
                                </p>
                                <BillingForm ref={billingFormRef}/>
                            </Col>
                            <Col md={12} className="px-0 mt-4 mt-lg-4">
                                <ChangeShippingAddressSection/>
                            </Col>
                            <Col md={12} className='d-flex justify-content-end p-0'>
                                <Button className="signing-button mt-3 py-2" type="button"
                                        onClick={handleOnFormSubmit}>Order</Button>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CheckOut;
