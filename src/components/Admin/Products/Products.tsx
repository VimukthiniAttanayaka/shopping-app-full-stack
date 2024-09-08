import { FC } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Plus } from "react-feather";
import ProductsTable from "./ProductsTable";
import { useNavigate } from "react-router-dom";

const Products: FC = () => {
    const navigate = useNavigate()

    return (
        <Row className='content-wrapper d-grid p-lg-4 pt-lg-2 mx-0'>
            <Row className='mx-0 px-0 py-lg-2  d-flex align-items-center border-danger'>
                <Col className="admin-product">
                    <p className="m-0 fs-4">Products</p>
                </Col>
                <Col className="d-flex justify-content-end p-0">
                    <Button className="add-product fs-6" onClick={() => navigate('/admin/products/addproduct')} >
                        <Plus /> Add Products
                    </Button>
                </Col>
            </Row>
            <ProductsTable />
        </Row>
    );
}

export default Products;
