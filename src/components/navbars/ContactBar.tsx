import React, {useState} from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {PhoneCall, Truck, User} from "react-feather";
import {Link} from "react-router-dom";

const ContactBar: React.FC = () => {
    const [show, setShow] = useState(true);
    const collapse = () => {
        if (show) {
            setShow(false);
        } else {
            setShow(true)
        }
    }
    return (
        <Row>
            <Col xs={12} className="ms-sm-0 ps-sm-0 ps-3 me-xl-4">
                <Navbar expand="lg" className="contact-bar float-end py-lg-0">
                    <Container className='pe-lg-0'>
                        <Navbar.Brand href="#home" className='py-1'>
                            <a href="tel:+94 112 123456" className={show ? "href" : "href contact-number"}>
                                <PhoneCall className='me-2'/> +94 112 123456</a>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={collapse}/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Item className="label ps-lg-2 mt-2 mt-md-0 delivery-area ">
                                    <Truck className="truck"/>
                                    <span className="ms-2 colour-gray ">Delivery Areas</span>
                                </Nav.Item>
                                <Nav.Item className="mx-lg-3 mt-2 mt-md-0 my-account">
                                    <User/>
                                    <span className="ms-1 colour-gray"><Link to={'/admin/products'} className='href'>
                                        My Account</Link></span>
                                </Nav.Item>
                                <Nav.Item className="register-button ms-lg-2 d-flex float-end mt-2 mt-md-0
                                                     align-items-center">
                                    <span className="px-2 mx-2"><Link to={"/signuppage"}
                                                                      className="href login-btn">Register</Link></span>
                                </Nav.Item>
                                <Nav.Item className="button-login ps-lg-2 ms-lg-3 me-2 d-flex float-end mt-2 mt-md-0
                                                     align-items-center">
                                    <span><Link to={"/loginpage"} className="href login-btn">Login</Link></span>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Col>
        </Row>
    );
}

export default ContactBar;
