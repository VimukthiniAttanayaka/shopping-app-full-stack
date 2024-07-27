import React from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {User, Mail, Phone, Lock} from 'react-feather'
import {Link} from "react-router-dom";

const SignupPage: React.FC = () => {
    return (
        <Row className='signup'>
            <Col md={5} className='animation-shield d-flex align-items-center justify-content-center'>
                <div>
                    <h1 className='mb-3'>Welcome Back!</h1>
                    <p className='mb-4'>To keep connect with us please<br/>login with your personal details</p>
                    <Link to={'/loginpage'}>
                        <Button type="button" className="btn btn-outline-light">SIGN IN</Button>
                    </Link>
                </div>
            </Col>
            <Col md={7} className='px-0'>
                <Form>
                    <h2 className='mt-2'>Create Account</h2>
                    <Form.Text className="text-muted">
                        We'll never share your details with anyone else.
                    </Form.Text>
                    <InputGroup className="my-3 data-field" id="formBasicEmail">
                        <InputGroup.Text className='data-field-icon' id="basic-addon1"><Mail/></InputGroup.Text>
                        <Form.Control type="email" placeholder="Email" required/>
                    </InputGroup>
                    <InputGroup className="mb-3 data-field" id="formBasicName">
                        <InputGroup.Text className='data-field-icon' id="basic-addon1"><User/></InputGroup.Text>
                        <Form.Control type="text" placeholder="Name" required pattern="[A-Za-z]+"/>
                    </InputGroup>
                    <InputGroup className="mb-3 data-field" id="formBasicContact">
                        <InputGroup.Text className='data-field-icon' id="basic-addon1"><Phone/></InputGroup.Text>
                        <Form.Control type="text" placeholder="Contact No" required pattern='^[0][\d]{9}$'/>
                    </InputGroup>
                    <InputGroup className="mb-3 data-field" id="formBasicPassword">
                        <InputGroup.Text className='data-field-icon' id="basic-addon1"><Lock/></InputGroup.Text>
                        <Form.Control type="password" placeholder="Password" required
                                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                        {/* Minimum eight characters, at least one letter and one number:*/}
                    </InputGroup>
                    <InputGroup className="mb-3 data-field" id="formBasicRePassword">
                        <InputGroup.Text className='data-field-icon' id="basic-addon1"><Lock/></InputGroup.Text>
                        <Form.Control type="password" placeholder="Repassword" required
                                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                        {/* Minimum eight characters, at least one letter and one number:*/}
                    </InputGroup>
                    <Button className='signup-button mb-3' type="submit">
                        SIGN UP
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default SignupPage;