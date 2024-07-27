import {FC} from "react";
import {Col, Row} from "react-bootstrap";
import {Plus} from "react-feather";
import ProductsTable from "./ProductsTable";
import {Link} from "react-router-dom";

const Products: FC = () => {

    return (
        <Row className='content-wrapper d-grid p-lg-4 pt-lg-2 mx-0'>
            <Row className='mx-0 px-0 py-lg-2  d-flex align-items-center border-danger'>
                <Col className="admin-product">
                    <p className="m-0 fs-4">Products</p>
                </Col>
                <Col className="d-flex justify-content-end p-0">
                    <div className="add-product fs-6"><Link to='/admin/products/addproduct'
                                                            className='text-decoration-none text-reset'><Plus/> Add
                        Products</Link></div>
                </Col>
            </Row>
            <ProductsTable/>
        </Row>
    );
}

export default Products;
