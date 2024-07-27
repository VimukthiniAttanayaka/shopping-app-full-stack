import {FC} from "react";
import {Col, Row} from "react-bootstrap";
import {FiLogOut} from "react-icons/fi";
import {Link} from "react-router-dom";

const AdminHeader: FC = () => {
    return (
        <Row lg={2} className='admin-header px-lg-4 mx-0 align-items-center '>
            <Col lg={11}/>
            <Col lg={1} className='px-0 '>
                <Link to='/logout' className='d-flex justify-content-end align-items-center header-col'>
                    <div className='header-text me-2'>Log Out</div>
                    <FiLogOut size='25' className='justify-content-end'/>
                </Link>

            </Col>
        </Row>
    );
}

export default AdminHeader;
