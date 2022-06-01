import React from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {PhoneCall, Truck} from "react-feather";

const ContactBar: React.FC = () => {
  return (
<Row>
  <Col xs={12} className="float-start">
    <Navbar bg="light" expand="lg" className="contact-bar float-right">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav " >
        <Nav className="me-auto" >
          <Nav.Item className="text-muted label ps-2 ">
            <Truck/>
            <span className="ms-2">Delivery Areas</span>
          </Nav.Item>
          <Nav.Item className="d-flex float-end">
          <span className="mx-2">
            <a href="tel:+94 112 123456" className="href ms-2"> <PhoneCall/> +94 112 123456</a>
          </span>
          </Nav.Item>
          <Nav.Item className="register-button ms-2 d-flex float-end">
            <span className="px-2 mx-2">Register</span>
          </Nav.Item>
          <Nav.Item className="button-login ps-2 ms-3 me-2 d-flex float-end">
            <span>Login</span>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  </Col>
</Row>













/*    <Nav className="justify-content-md-end justify-content-center contact-bar my-2 pe-4 me-xl-4 ps-xl-3 ps-sm-3 ps-0">
      <Nav.Item className="text-muted label ps-2">
        <Truck/>
        <span className="ms-2">Delivery Areas</span>
      </Nav.Item>
      <Nav.Item>
          <span className="mx-2">
            <a href="tel:+94 112 123456" className="href ms-2"> <PhoneCall/> +94 112 123456</a>
          </span>
      </Nav.Item>
      <Nav.Item className="register-button ms-2">
        <span className="px-2 mx-2">Register</span>
      </Nav.Item>
      <Nav.Item className="button-login ps-2 ms-3 me-2">
        <span>Login</span>
      </Nav.Item>
    </Nav>*/
  );
}

export default ContactBar;
