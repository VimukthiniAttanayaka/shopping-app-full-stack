import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Lock, Mail} from "react-feather";

const LoginPage: React.FC = () => {

    const damyemail = "admin@gmail.com";
    const damypassword = "admin123";

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        console.log('hi' + email + " " + password)
        if (!email || !password) {
            return;
        } else if (email !== damyemail || password !== damypassword) {
            console.log('wrong user');
            // addToast("wrong user", {appearance: 'error', autoDismiss: true});
        } else {
            console.log('user logged');
            // addToast("user logged", {appearance: 'success', autoDismiss: true});
            navigate('/');
        }
        setValidated(false);
    };


    return (
        <Row className='login'>
            <Col md={7} className='px-0'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3 className='mt-2'>Sign in to Shopping Cart</h3>
                    <Form.Text className="text-muted">
                        use your email as username.
                    </Form.Text>
                    <InputGroup className="my-3 data-field" id="formUserName">
                        <InputGroup.Text
                            className='data-field-icon'
                            id="basic-addon1"
                            aria-valuetext={email}
                        ><Mail/>
                        </InputGroup.Text>
                        <Form.Control type="email" placeholder="Email" required
                                      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
                        ></Form.Control>
                    </InputGroup>
                    <InputGroup className="mb-3 data-field" id="formBasicPassword">
                        <InputGroup.Text
                            className='data-field-icon'
                            id="basic-addon1"
                            aria-valuetext={password}
                        >
                            <Lock/>
                        </InputGroup.Text>
                        <Form.Control type="password" placeholder="Password" required
                                      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}/>
                    </InputGroup>
                    <Form.Group className="mb-3 text-center" controlId="fogottonPassword">
                        <span>
                            <Link to={"../ForgotPassWord"} className='forgot-pass-label'>Forgot your password?</Link>
                        </span>
                    </Form.Group>
                    <Button className="signin-btn" type="submit">
                        SIGN IN
                    </Button>
                </Form>
            </Col>
            <Col md={5} className='animation-shield d-flex align-items-center justify-content-center'>
                <div>
                    <h1 className='mb-2'>Hello, Friend!</h1>
                    <p className='mb-3'>Enter your personal details and <br/>start journey with us</p>
                    <Link to={'/signuppage'}>
                        <Button type="button" className="btn btn-outline-light">SIGN UP</Button>
                    </Link>
                </div>
            </Col>
        </Row>
    )
}

export default LoginPage;

