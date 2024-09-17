import ProductSave from "./ProductSave.tsx";
import {IProduct} from "../../../Types/IProduct.tsx";
import {Col, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ChevronRight} from "react-feather";
import {EDIT_PRODUCT, GET_PRODUCT} from "../../../api/product.ts";
import {useMutation, useQuery} from "@apollo/client";
import {useEffect} from "react";
import {toast} from "react-toastify";
import Loading from "../common/Loading.tsx";

const UpdateProduct = () => {
    const productId = window.location.pathname.split("/").pop();
    const { loading, data } = useQuery(GET_PRODUCT, {
        variables: { ID: productId },
    });
    const product = data?.product

    const productInitialState: IProduct = {
        name: product?.name || "",
        quantity: product?.quantity ||'',
        price: product?.price || undefined,
        discountedPrice: product?.discountedPrice || '',
        description: product?.description ||"",
        category: product?.category ||"",
        image: product?.image ||"",
    }
    const [editProduct, { data: editData }] = useMutation(EDIT_PRODUCT);

    const handleSubmit = (values: any) => {
        editProduct({
            variables: { id: productId, productInput: values.productInput },
        });
    };

    useEffect(() => {
        if(editData) {
            if (editData.editProduct) {
                toast.success("product updated successfully")
            } else {
                toast.error("Product update failed")
            }
        }
    },[editData])

    return (
        <Row className='content-wrapper d-grid p-lg-4 pt-lg-2 mx-0 '>
            <Row className='mx-0 p-0 pb-lg-4'>
                <Col xs={12}>
                    <Navbar className='bg-transparent' expand="lg">
                        <Nav.Item as={Link} to='/admin/products'
                                  className={ 'p-0 text-decoration-none text-dark pe-none'}>Products</Nav.Item>
                        <ChevronRight className='chevron-right-icon'/>
                        <Nav.Item as={Link} to='/admin/products/addproduct'
                                  className={'p-0 text-decoration-none text-dark pe-none'}>Update
                            Product</Nav.Item>
                    </Navbar>
                </Col>
                <Col className="admin-product" xs={12}>
                    <p className="m-0 fs-4">Edit Product</p>
                </Col>
            </Row>
            {loading ? <Loading /> :
                (productInitialState && <ProductSave productInitialState={productInitialState} onSubmit={handleSubmit}/>)}
        </Row>
    );
};

export default UpdateProduct;