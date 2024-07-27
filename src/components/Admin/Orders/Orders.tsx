import {FC} from "react";
import {Row} from "react-bootstrap";
import OrdersList from "./OrdersList";

const Orders: FC = () => {
    return (
        <Row className='content-wrapper d-grid p-lg-4 mx-0'>
            <Row className='mx-0'>
                Orders
            </Row>
            <OrdersList/>
        </Row>
    );
}

export default Orders;
