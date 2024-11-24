import {FC} from "react";
import {Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import {useFormik} from "formik";
import * as Yup from "yup";
import countries from "../../assets/data/CountryCodes.json";
import {ICountryItem} from "../../Types/ICountryItem";

const ShippingAddressForm: FC = () => {
    const countryList = countries.map((country) => {
        const countryItem: ICountryItem = {
            value: country.code,
            label: country.name,
            countryCode: country.dial_code,
        };
        return countryItem;
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            city: "",
            postalCode: "",
            selectedCountry: { value: 'LK', label: "Sri Lanka", countryCode: "+94" },
            contactNumber: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            address: Yup.string().required("Billing Address is required"),
            city: Yup.string().required("City is required"),
            postalCode: Yup.string().required("Postal Code is required"),
            selectedCountry: Yup.object().nullable().required("Country is required"),
            contactNumber: Yup.string().required("Contact Number is required"),
        }),
        onSubmit: (values) => {
            console.log("Form Values:", values);
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="px-0 mt-lg-0 pt-2 pb-2 shipping-form">
            <FormLabel>Name*</FormLabel>
            <FormControl
                type="text"
                placeholder="Your Full Name"
                {...formik.getFieldProps("name")}
                isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>

            <FormLabel>Billing Address*</FormLabel>
            <FormControl
                type="text"
                placeholder="Street Address"
                {...formik.getFieldProps("address")}
                isInvalid={formik.touched.address && !!formik.errors.address}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>

            <Row>
                <Col>
                    <FormLabel>City / suburb*</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="City / suburb"
                        {...formik.getFieldProps("city")}
                        isInvalid={formik.touched.city && !!formik.errors.city}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
                </Col>
                <Col>
                    <FormLabel>Postal Code*</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Postal Code*"
                        {...formik.getFieldProps("postalCode")}
                        isInvalid={formik.touched.postalCode && !!formik.errors.postalCode}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.postalCode}</Form.Control.Feedback>
                </Col>
                <Col>
                    <FormLabel>Country*</FormLabel>
                    <Select
                        options={countryList}
                        placeholder="Select..."
                        id="shipping-country"
                        value={formik.values.selectedCountry}
                        onChange={(value) => formik.setFieldValue("country", value)}
                        onBlur={() => formik.setFieldTouched("country", true)}
                    />
                </Col>
            </Row>

            <FormLabel>Contact Number*</FormLabel>
            <FormGroup>
                <InputGroup>
                    {formik.values.selectedCountry.value && (
                        <InputGroup.Text>
                            <ReactCountryFlag
                                className="me-2"
                                countryCode={formik.values.selectedCountry.value}
                                svg
                                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/"
                                cdnSuffix="svg"
                                style={{
                                    width: "1.5em",
                                    height: "0.8em",
                                    fontSize: "17px",
                                }}
                            />
                            {formik.values.selectedCountry.countryCode}
                        </InputGroup.Text>
                    )}
                    <FormControl
                        type="text"
                        {...formik.getFieldProps("contactNumber")}
                        isInvalid={formik.touched.contactNumber && !!formik.errors.contactNumber}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.contactNumber}</Form.Control.Feedback>
                </InputGroup>
            </FormGroup>
        </Form>
    );
};

export default ShippingAddressForm;
