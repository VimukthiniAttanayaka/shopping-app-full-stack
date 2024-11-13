import React, {useEffect} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {User, Mail, Phone, Lock} from "react-feather";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../../api/user.ts";
import {toast} from "react-toastify";
import {setLocal} from "../../utills";
import {AUTH_KEY, USER_REAL_NAME} from "../../static/static.ts";
import {setIsAuthorized} from "../../redux/slices/AuthSlice.ts";
import {useDispatch} from "react-redux";
import {UserRole} from "../../static/enums.ts";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string()
        .matches(/^[A-Za-z]+$/, "Name must contain only letters")
        .required("Name is required"),
    contact: Yup.string()
        .matches(/^(0\d{9}|\+94\d{9})$/, "Invalid contact number format")
        .required("Contact number is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm password is required"),
});

const SignupPage: React.FC = () => {
    const [createUser, {data: createData}] = useMutation(CREATE_USER)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (createData) {
            if (createData.registerUser) {
                setLocal(AUTH_KEY, createData.registerUser.token)
                setLocal(USER_REAL_NAME, createData.registerUser.name)
                dispatch(setIsAuthorized(true))
                toast.success("User registered successfully")
                if(createData.registerUser.role === UserRole.USER) {
                    navigate('/')
                } else if(createData.registerUser.role === UserRole.ADMIN){
                    navigate('/admin/products')
                }
            } else {
                toast.error("User registration failed")
            }
        }
    }, [createData])

    return (
        <Row className="signup">
            <Col md={5} className="animation-shield d-flex align-items-center justify-content-center">
                <div>
                    <h1 className="mb-4">Welcome Back!</h1>
                    <p className="mb-4">
                        To keep connect with us please
                        <br/>
                        login with your personal details
                    </p>
                    <Link to={"/loginpage"}>
                        <Button type="button" className="btn btn-outline-light">
                            SIGN IN
                        </Button>
                    </Link>
                </div>
            </Col>
            <Col md={7} className="px-0">
                <Formik
                    initialValues={{
                        email: "",
                        name: "",
                        contact: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        const userInput = {
                            email: values.email,
                            name: values.name,
                            contact: values.contact,
                            password: values.password
                        }
                        createUser({
                            variables: {userInput}
                        })
                    }}
                >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <h2 className="mt-2">Create Account</h2>
                            <Form.Text className="text-muted mb-4">
                                We'll never share your details with anyone else.
                            </Form.Text>
                            <InputGroup className="mb-4 data-field">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <Mail/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    isInvalid={!!errors.email && touched.email}
                                />
                                <Form.Control.Feedback className='data-field-feedback'
                                                       type="invalid">{errors.email}</Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-4 data-field">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <User/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    isInvalid={!!errors.name && touched.name}
                                />
                                <Form.Control.Feedback className='data-field-feedback'
                                                       type="invalid">{errors.name}</Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-4 data-field">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <Phone/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="contact"
                                    placeholder="Contact No"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contact}
                                    isInvalid={!!errors.contact && touched.contact}
                                />
                                <Form.Control.Feedback className='data-field-feedback'
                                                       type="invalid">{errors.contact}</Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-4 data-field">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <Lock/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    isInvalid={!!errors.password && touched.password}
                                />
                                <Form.Control.Feedback className='data-field-feedback'
                                                       type="invalid">{errors.password}</Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-4 data-field">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <Lock/>
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Repassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                                />
                                <Form.Control.Feedback className='data-field-feedback'
                                                       type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                            </InputGroup>
                            <Button className="signup-button mb-2" type="submit">
                                SIGN UP
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
};

export default SignupPage;
