import {Col, Row} from "react-bootstrap";

type TProductItem = {
    name: string;
    id: string;
}
const ProductNameCell = ({productItem} : {productItem: TProductItem}) => {
    return (
        <Row>
            <Col xs={12}>{productItem.name}</Col>
            <Col xs={12} className='f-s1'>({productItem.id})</Col>
        </Row>
    );
};

export default ProductNameCell;