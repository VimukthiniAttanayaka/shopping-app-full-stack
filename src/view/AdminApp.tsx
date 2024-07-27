import {FC} from "react";
import {Outlet} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import LeftNavigation from "../components/Admin/Navigation/LeftNavigation";
import AdminHeader from "../components/Admin/Navigation/AdminHeader";

const AdminApp: FC = () => {
    return (
        <Container fluid className='vh-100'>
            <Row className='h-100'>
                <LeftNavigation/>
                <Col className='px-lg-0 h-100'>
                    <AdminHeader/>
                    <Outlet/>
                </Col>

            </Row>
        </Container>
    );
}

export default AdminApp;
