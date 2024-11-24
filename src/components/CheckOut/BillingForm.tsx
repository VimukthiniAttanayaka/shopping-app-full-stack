import React, {forwardRef, useImperativeHandle} from "react";
import {Col, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import {Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import PasswordStrengthBar from "react-password-strength-bar";
import countries from '../../assets/data/CountryCodes.json';
import {ICountryItem} from "../../Types/ICountryItem";

const BillingForm = forwardRef((_, ref) => {
    const countryList = countries.map((country) => {
        const countryItem: ICountryItem = {
            value: country.code,
            label: country.name,
            countryCode: country.dial_code,
        };
        return countryItem;
    });

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        postalCode: Yup.string().required("Postal Code is required"),
        selectedCountry: Yup.object()
            .nullable()
            .required("Country is required"),
        contact: Yup.string().required("Contact Number is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        retypedEmail: Yup.string()
            .oneOf([Yup.ref("email")], "Emails must match")
            .required("Retyped Email is required"),
        currentPassword: Yup.string().required("Password is required"),
    });

    const formikRef = React.useRef(null);

    useImperativeHandle(ref, () => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        validateForm: () => formikRef.current?.validateForm(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        getFormValues: () => formikRef.current?.values,
    }));

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                fullName: "",
                address: "",
                city: "",
                postalCode: "",
                selectedCountry: {value: 'LK', label: "Sri Lanka", countryCode: "+94"},
                contact: "",
                email: "",
                retypedEmail: "",
                currentPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({values, setFieldValue, errors}) => (
                <FormikForm className="px-lg-3 px-2 pt-2 pb-5 shipping-form">
                    <FormLabel>Full Name*</FormLabel>
                    <Field
                        as={FormControl}
                        name="fullName"
                        type="text"
                        placeholder="Your Full Name"
                        isInvalid={!!errors.fullName}
                    />
                    <FormControl.Feedback type="invalid">{errors.fullName}</FormControl.Feedback>

                    <FormLabel>Address*</FormLabel>
                    <Field
                        as={FormControl}
                        name="address"
                        type="text"
                        placeholder="Street Address"
                        isInvalid={!!errors.address}
                    />
                    <FormControl.Feedback type="invalid">{errors.address}</FormControl.Feedback>

                    <Row>
                        <Col className="ps-3 pe-1">
                            <FormLabel>City / suburb*</FormLabel>
                            <Field
                                as={FormControl}
                                name="city"
                                type="text"
                                placeholder="City / suburb"
                                isInvalid={!!errors.city}
                            />
                            <FormControl.Feedback type="invalid">{errors.city}</FormControl.Feedback>
                        </Col>
                        <Col className="px-1">
                            <FormLabel>Postal Code*</FormLabel>
                            <Field
                                as={FormControl}
                                name="postalCode"
                                type="text"
                                placeholder="Postal Code"
                                isInvalid={!!errors.postalCode}
                            />
                            <FormControl.Feedback type="invalid">{errors.postalCode}</FormControl.Feedback>
                        </Col>
                        <Col className="ps-1">
                            <FormLabel>Country*</FormLabel>
                            <Select
                                options={countryList}
                                placeholder="Select..."
                                id="shipping-country"
                                defaultValue={values.selectedCountry}
                                defaultInputValue={values.selectedCountry.label}
                                value={values.selectedCountry}
                                onChange={(option) => setFieldValue("selectedCountry", option)}
                            />
                            {errors.selectedCountry && (
                                <div className="invalid-feedback d-block">
                                    {typeof errors.selectedCountry === 'string' ? errors.selectedCountry : 'Invalid country selected'}
                                </div>
                            )}
                        </Col>
                    </Row>

                    <FormLabel>Contact Number*</FormLabel>
                    <FormGroup>
                        <InputGroup>
                            {values.selectedCountry?.value && (
                                <InputGroup.Text>
                                    <ReactCountryFlag
                                        className="me-2"
                                        countryCode={values.selectedCountry.value}
                                        svg
                                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/"
                                        cdnSuffix="svg"
                                        style={{
                                            width: "1.5em",
                                            height: "0.8em",
                                            fontSize: "17px",
                                        }}
                                    />
                                    {values.selectedCountry?.countryCode}
                                </InputGroup.Text>
                            )}
                            <Field
                                as={FormControl}
                                name="contact"
                                type="text"
                                isInvalid={!!errors.contact}
                            />
                            <FormControl.Feedback type="invalid">
                                {errors.contact}
                            </FormControl.Feedback>
                        </InputGroup>
                    </FormGroup>

                    <Row>
                        <Col sm={12} lg={6}>
                            <FormLabel>Email*</FormLabel>
                            <Field
                                as={FormControl}
                                name="email"
                                type="email"
                                placeholder="Email"
                                isInvalid={!!errors.email}
                            />
                            <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
                        </Col>
                        <Col sm={12} lg={6}>
                            <FormLabel>Retype Email*</FormLabel>
                            <Field
                                as={FormControl}
                                name="retypedEmail"
                                type="email"
                                placeholder="Retype Email"
                                isInvalid={!!errors.retypedEmail}
                            />
                            <FormControl.Feedback type="invalid">{errors.retypedEmail}</FormControl.Feedback>
                        </Col>
                    </Row>

                    <FormLabel>Choose Your Password*</FormLabel>
                    <Field
                        as={FormControl}
                        name="currentPassword"
                        type="password"
                        isInvalid={!!errors.currentPassword}
                    />
                    <FormControl.Feedback type="invalid">{errors.currentPassword}</FormControl.Feedback>

                    <Row>
                        <Col lg={7}>
                            <PasswordStrengthBar
                                password={values.currentPassword}
                                scoreWordStyle={{display: "none"}}
                                scoreWords={["weak", "weak", "okay", "okay", "good", "strong"]}
                            />
                        </Col>
                    </Row>
                </FormikForm>
            )}
        </Formik>
    );
});

export default BillingForm;
