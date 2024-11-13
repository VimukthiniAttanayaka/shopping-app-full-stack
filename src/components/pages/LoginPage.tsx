import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "react-feather";
import { Formik } from "formik";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../api/user.ts";
import {setLocal} from "../../utills";
import {AUTH_KEY, USER_REAL_NAME} from "../../static/static.ts";
import {setIsAuthorized} from "../../redux/slices/AuthSlice.ts";
import {toast} from "react-toastify";
import {UserRole} from "../../static/enums.ts";
import {useDispatch} from "react-redux";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [login, {data:loginData}] = useMutation(LOGIN)

    useEffect(() => {
        if (loginData) {
            if (loginData.login) {
                setLocal(AUTH_KEY, loginData.login.token)
                setLocal(USER_REAL_NAME, loginData.login.name)
                dispatch(setIsAuthorized(true))
                toast.success("User logged in successfully")
                if(loginData.login.role === UserRole.USER) {
                    navigate('/')
                } else if(loginData.login.role === UserRole.ADMIN){
                    navigate('/admin/products')
                }
            } else {
                toast.error("User login failed")
            }
        }
    }, [loginData])

    return (
        <Row className="login">
            <Col md={7} className="px-0">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // Handle form submission
                        const loginData = {
                            email: values.email,
                            password: values.password
                        }
                        login({
                            variables: {loginData}
                        })
                        setSubmitting(false);
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          touched,
                          errors,
                          isSubmitting,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <h3 className="mt-2">Sign in to Shopping Cart</h3>
                            <Form.Text className="text-muted mb-4">
                                Use your email as username.
                            </Form.Text>
                            <InputGroup className="mb-4 data-field" id="formUserName">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <Mail />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && !!errors.email}
                                    isValid={touched.email && !errors.email}
                                    required
                                />
                                <Form.Control.Feedback className='data-field-feedback' type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-4 data-field" id="formBasicPassword">
                                <InputGroup.Text className="data-field-icon" id="basic-addon1">
                                    <Lock />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={touched.password && !!errors.password}
                                    isValid={touched.password && !errors.password}
                                    required
                                />
                                <Form.Control.Feedback className='data-field-feedback' type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <Form.Group className="mb-3 text-center" controlId="forgottenPassword">
                <span>
                  <Link to="../ForgotPassWord" className="forgot-pass-label">
                    Forgot your password?
                  </Link>
                </span>
                            </Form.Group>
                            <Button className="signin-btn" type="submit" disabled={isSubmitting}>
                                SIGN IN
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Col>
            <Col md={5} className="animation-shield d-flex align-items-center justify-content-center">
                <div>
                    <h1 className="mb-2">Hello, Friend!</h1>
                    <p className="mb-3">
                        Enter your personal details and <br /> start your journey with us
                    </p>
                    <Link to="/signuppage">
                        <Button type="button" className="btn btn-outline-light">
                            SIGN UP
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
