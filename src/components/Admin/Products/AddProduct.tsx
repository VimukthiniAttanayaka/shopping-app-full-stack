import ProductSave from "./ProductSave.tsx";
import {IProduct} from "../../../Types/IProduct.tsx";
import {Col, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ChevronRight} from "react-feather";
import {useMutation} from "@apollo/client";
import {ADD_PRODUCT} from "../../../api/product.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";

const AddProduct = () => {
    const productInitialState: IProduct = {
        name: "",
        quantity: '',
        price: undefined,
        discountedPrice: '',
        description: "",
        category: "",
        image: "",
    }
    const [createProduct, {data: addData}] = useMutation(ADD_PRODUCT)

    const handleSubmit = (values: any ) => {
        createProduct({
            variables: values
        });
    }

    useEffect(() => {
        if(addData) {
            if (addData.editProduct) {
                toast.success("Product added successfully")
            } else {
                toast.error("Product add failed")
            }
        }
    },[addData])

    return (
        <Row className='content-wrapper d-grid p-lg-4 pt-lg-2 mx-0 '>
            <Row className='mx-0 p-0 pb-lg-4'>
                <Col xs={12}>
                    <Navbar className='bg-transparent' expand="lg">
                        <Nav.Item as={Link} to='/admin/products'
                                  className={ 'p-0 text-decoration-none text-dark pe-none'}>Products</Nav.Item>
                        <ChevronRight className='chevron-right-icon'/>
                        <Nav.Item as={Link} to='/admin/products/addproduct'
                                  className={'p-0 text-decoration-none text-dark pe-none'}>Add
                            Product</Nav.Item>
                    </Navbar>
                </Col>
                <Col className="admin-product" xs={12}>
                    <p className="m-0 fs-4">New Product</p>
                </Col>
            </Row>
            <ProductSave productInitialState={productInitialState} onSubmit={handleSubmit}/>
        </Row>
    );
};

export default AddProduct;