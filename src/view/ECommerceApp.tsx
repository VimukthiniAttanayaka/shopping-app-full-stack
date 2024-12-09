import {Col, Container, Row} from 'react-bootstrap';
import NavBar from "../components/navbars/NavBar";
import Footer from './../components/footer/Footer'
import React from 'react';
import LogoBar from "../components/navbars/LogoBar";
import {Outlet} from "react-router-dom";
import ContactBar from '../components/navbars/ContactBar';

const ECommerceApp: React.FC = () => {
    return (
        <Container fluid={true}>
            <ContactBar/>
            <div className='sticky-top'><LogoBar/></div>
            <NavBar/>
            <Outlet/>
            <Row>
                <Col>
                    <Footer/>
                </Col>
            </Row>

        </Container>
    )
}

export default ECommerceApp;
