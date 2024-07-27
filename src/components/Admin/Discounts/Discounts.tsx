import {FC} from "react";
import {Row} from "react-bootstrap";
import DiscountsList from "./DiscountsList";

const Discounts: FC = () => {
    return (
        <Row className='content-wrapper d-grid p-lg-4 mx-0'>
            <Row className='mx-0'>
                Discounts
            </Row>
            <DiscountsList />
        </Row>
    );
}

export default Discounts;
