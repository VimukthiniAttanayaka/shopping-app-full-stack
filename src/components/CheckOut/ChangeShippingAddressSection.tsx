import {ChangeEvent, FC, useState} from "react";
import {Col, Form, FormCheck, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {FaRegCreditCard, FaRegMoneyBillAlt} from "react-icons/fa";
import ShippingAddressForm from "./ShippingAddressForm.tsx";

const ChangeShippingAddressSection: FC = () => {

    const [isSameUserAddress, setIsSameUserAddress] = useState<boolean>(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

    const handleOnRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const radioID: string = e.target.id;
        switch (radioID) {
            case 'sameAddress':
                setIsSameUserAddress(true);
                break;
            case 'changeAddress':
                setIsSameUserAddress(false);
        }
    }

    const handleOnPaymentTypeSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMethod(e.target.value);
    }

    return (
        <>
            <span className='mt-5'>Change Shipping Address</span>
            <Form>
                <FormGroup className='shipping-address-change-radio my-2'>
                    <Row>
                        <Col lg={4} md={12} className='pe-0'>
                            <FormCheck
                                className='d-flex align-items-center'
                                id='sameAddress'
                                name='userAddressCheck' type='radio'
                                label='Same as user address' onChange={handleOnRadioChange}
                                checked={isSameUserAddress}/>
                        </Col>
                        <Col lg={6} className='ps-lg-0'>
                            <FormCheck
                                className='d-flex align-items-center'
                                name='userAddressCheck'
                                id='changeAddress'
                                type='radio' label='Change shipping address'
                                onChange={handleOnRadioChange}/>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup>
                    {!isSameUserAddress && <ShippingAddressForm/>}
                </FormGroup>
                <FormGroup className='mt-lg-2 fs-6'>
                    <FormLabel>Add Delivery Instructions (Optional)</FormLabel>
                    <FormControl as='textarea' rows={3}/>
                </FormGroup>
                <FormLabel className='my-lg-2'>Payment Methods</FormLabel>

                <FormGroup className='payment-method'>
                    <Row className='mx-0 '>
                        <Col
                            className={'payment-method-card px-0 ms-0 me-4 ' + `${selectedPaymentMethod === 'card' ? 'selected-payment-method' : ''}`}
                            id='card'>
                            <FormLabel className='d-grid justify-content-center mx-0 my-2'>
                                <input className='payment-type-radio' type='radio' name='payment-method' value='card'
                                       onChange={handleOnPaymentTypeSelect}/>
                                <FaRegCreditCard fontSize='100px' display='block'/>
                                <p>Credit/Debit Card</p>
                            </FormLabel>
                        </Col>
                        <Col
                            className={'payment-method-card px-0 ms-4 ' + `${selectedPaymentMethod === 'cash' ? 'selected-payment-method' : ''}`}
                            id='cash'>
                            <FormLabel className='d-grid justify-content-center mx-0 my-2'>
                                <input className='payment-type-radio' type='radio' name='payment-method' value='cash'
                                       onChange={handleOnPaymentTypeSelect}/>
                                <FaRegMoneyBillAlt fontSize='100px'/>
                                <p>Cash on Delivery</p>
                            </FormLabel>
                        </Col>
                    </Row>

                </FormGroup>

            </Form>
        </>
    );
}
export default ChangeShippingAddressSection;
