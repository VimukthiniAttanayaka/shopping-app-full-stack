import {FC} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {FiLogOut} from "react-icons/fi";
import {logout} from "../../../utills/logout.ts";

const AdminHeader: FC = () => {
    return (
        <Row lg={2} className='admin-header px-lg-4 mx-0 align-items-center '>
            <Col lg={12} className='px-0 d-flex justify-content-end'>
                <Button onClick={logout} className='bg-transparent border-0 d-flex justify-content-end align-items-center header-col'>
                    <div className='header-text me-2'>Log Out</div>
                    <FiLogOut size='25' className='justify-content-end'/>
                </Button>
            </Col>
        </Row>
    );
}

export default AdminHeader;
