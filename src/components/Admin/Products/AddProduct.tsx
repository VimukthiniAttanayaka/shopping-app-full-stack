import React, {useEffect, useRef, useState} from "react";
import {Button, Col, FormGroup, FormLabel, Nav, Navbar, Row} from "react-bootstrap";
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import Product from "../../products/Product";
import {IProduct} from "../../../Types/IProduct";
import {ChevronRight, Image, ThumbsUp} from "react-feather";
import {Link, useLocation} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {ADD_PRODUCT} from "../../../api/product";
import {uploadFile} from "../../../api/files";
import InputGroup from "../common/InputGroup";
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';

const categoryOptions = [
    {value: 'grocery', label: 'Grocery'},
    {value: 'food', label: 'Food'},
    {value: 'pharmacy', label: 'Pharmacy'},
    {value: 'electronic', label: 'Electronic'}
];

const productInitialState: IProduct = {
    name: "",
    quantity: 0,
    price: 0,
    discountedPrice: 0,
    description: "",
    category: "",
    image: "",
}

const AddProduct: React.FC = () => {

    const location = useLocation();
    const [url, setURL] = useState<string>('');
    const [image, setImage] = useState<string>("noImage");
    const [uploadedImageName, setUploadedImageName] = useState<string>('')
    const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [isDisabled] = useState<boolean>(false);

    const [createProduct, {data}] = useMutation(ADD_PRODUCT)

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleImageChange = async (event: any) => {
        setImage(event.target.files[0]);
        const uploadResult = await uploadFile(event.target.files[0]);
        if (uploadResult.httpStatusCode === 200) {
            setUploadedImageName(uploadResult.data);
            setIsImageUploaded(true);
        } else {
            setUploadedImageName(uploadResult.data)
            setIsImageUploaded(false)
            alert("image upload failed")
        }
    }

    const handleOnImageRemoveClick = () => {
        setIsImageUploaded(false);
        setImage("noImage");
        inputRef.current.value = null;
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Product name is required'),
        quantity: Yup.number().min(0, 'Quantity must be greater than or equal to 0').required('Quantity is required'),
        price: Yup.number().min(0, 'Price must be greater than or equal to 0').required('Price is required'),
        discountedPrice: Yup.number().min(0, 'Discounted price must be greater than or equal to 0').required('Discounted price is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
    });

    useEffect(() => {
        setURL(location.pathname);
    }, [location]);

    useEffect(() => {
        if (isDisabled) {
            setIsImageUploaded(isDisabled);
        }
    }, [])

    return (
        <Row className='content-wrapper d-grid p-lg-4 pt-lg-2 mx-0 '>
            <Row className='mx-0 p-0 pb-lg-4'>
                <Col xs={12}>
                    <Navbar className='bg-transparent' expand="lg">
                        <Nav.Item as={Link} to='/admin/products'
                                  className={url === '/admin/products' ? 'p-0 text-decoration-none text-dark pe-none' :
                                      'p-0 text-decoration-none'}>Products</Nav.Item>
                        <ChevronRight className='chevron-right-icon'/>
                        <Nav.Item as={Link} to='/admin/products/addproduct'
                                  className={url === '/admin/products/addproduct' ?
                                      'p-0 text-decoration-none text-dark pe-none' : 'p-0 text-decoration-none'}>Add
                            Product</Nav.Item>
                    </Navbar>
                </Col>
                <Col className="admin-product" xs={12}>
                    <p className="m-0 fs-4">New Product</p>
                </Col>
            </Row>
            <Col className='content mx-0 p-lg-4 admin-add-product'>
                <h5 className='font-weight-bold'>Basic Information</h5>
                <Formik
                    initialValues={productInitialState}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        createProduct({
                            variables: {productInput: {...values, image: uploadedImageName}}
                        });
                        setSubmitting(false);
                    }}
                >
                    {({setFieldValue, handleChange, values, isSubmitting}) => (
                        <Form noValidate>
                            <Row>
                                <Col lg={6}>
                                    <InputGroup
                                        label="PRODUCT NAME"
                                        placeholder="Enter Product Name"
                                        type="text"
                                        isDisabled={isDisabled}
                                        handleOnChange={handleChange}
                                        name="name"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger"/>
                                </Col>
                                <Col lg={6}>
                                    <InputGroup
                                        label={""}
                                        type={"number"}
                                        placeholder="Enter Product Quantity"
                                        min='0'
                                        as={NumberFormat}
                                        allowNegative={false}
                                        isRequired={true}
                                        handleOnChange={(value: any) => setFieldValue('quantity', value.floatValue)}
                                        isDisabled={isDisabled}
                                        name="quantity"
                                    />
                                    <ErrorMessage name="quantity" component="div" className="text-danger"/>
                                </Col>
                                <Col lg={6}>
                                    <InputGroup
                                        label={"PRICE"}
                                        type={"number"}
                                        placeholder="Enter Product Price"
                                        as={NumberFormat}
                                        allowNegative={false}
                                        thousandSeparator={true}
                                        isRequired={true}
                                        handleOnChange={(value: any) => setFieldValue('price', value.floatValue)}
                                        isDisabled={isDisabled}
                                        name="price"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-danger"/>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup className="mb-3">
                                        <FormLabel>PRODUCT CATEGORY</FormLabel>
                                        <Select
                                            options={categoryOptions}
                                            placeholder="Select Product Category"
                                            isClearable={true}
                                            isDisabled={isDisabled}
                                            onChange={(option: any) => setFieldValue('category', option?.value || '')}
                                            value={categoryOptions.find(option => option.value === values.category)}
                                            name="category"
                                        />
                                        <ErrorMessage name="category" component="div" className="text-danger"/>
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <InputGroup
                                        value={values.quantity === 0 ? 'Out Of Stock' : 'In Stock'}
                                        isDisabled={true}
                                        label={"STATUS"}
                                        type={"text"}
                                    />
                                </Col>
                                <Col lg={6}>
                                    <InputGroup
                                        label={"DISCOUNTED PRICE"}
                                        type={"number"}
                                        placeholder="Enter discounted Price"
                                        as={NumberFormat}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        isRequired={true}
                                        handleOnChange={(value: any) => setFieldValue('discountedPrice', value.floatValue)}
                                        isDisabled={isDisabled}
                                        name="discountedPrice"
                                    />
                                    <ErrorMessage name="discountedPrice" component="div" className="text-danger"/>
                                </Col>
                                <Col xs={12}>
                                    <InputGroup
                                        label={"DESCRIPTION"}
                                        type={"textarea"}
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter Product description"
                                        isDisabled={isDisabled}
                                        handleOnChange={handleChange}
                                        name="description"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger"/>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <FormLabel>PRODUCT IMAGE</FormLabel>

                                        <label
                                            className={isImageUploaded ? 'custom-file-upload mt-0 custom-file-upload-active' :
                                                'custom-file-upload mt-0'}>
                                            <span className='w-100'>
                                                <input type="file" className='d-none' onChange={handleImageChange}
                                                       disabled={isImageUploaded} ref={inputRef}/>
                                                {
                                                    isImageUploaded ?
                                                        <div>
                                                            <ThumbsUp
                                                                className='d-flex align-self-center mx-auto image-icon'/>
                                                            <br/>
                                                            <div className='d-flex justify-content-center'>
                                                                <p>Image is uploaded</p>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <Button variant="warning"
                                                                        onClick={handleOnImageRemoveClick}
                                                                        disabled={isDisabled}
                                                                >
                                                                    Remove Image
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div>
                                                            <Image
                                                                className='d-flex align-self-center mx-auto image-icon'/>
                                                            <br/>
                                                            <div className='d-flex justify-content-center'>
                                                                <p>Click to upload the image</p>
                                                            </div>
                                                        </div>
                                                }
                                            </span>
                                        </label>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} className='product'>
                                    <FormLabel>PRODUCT PREVIEW</FormLabel>
                                    <Product
                                        product={{...values, image}}
                                        index={1}
                                        onCartItemCreate={() => {
                                        }}
                                    />
                                </Col>
                                <Col xs={12} className='d-flex justify-content-end'>
                                    <Button className='create-product-button mb-3 px-4 py-2' type="submit"
                                            disabled={isSubmitting}>
                                        Create Product
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default AddProduct;
