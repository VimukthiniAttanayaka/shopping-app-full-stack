import {FC} from "react";
import {Row} from "react-bootstrap";
import CustomersList from "./CustomersList";

const Customers: FC = () => {
    return (
        <Row className='content-wrapper d-grid p-lg-4 mx-0'>
            <Row className='mx-0'>
                Customers
            </Row>
            <CustomersList/>
        </Row>
    );
}

export default Customers;
