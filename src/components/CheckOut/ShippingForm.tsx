import React, {FC, useState} from "react";
import {Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import countries from '../../assets/data/CountryCodes.json';
import {ICountryItem} from "../../Types/ICountryItem";
import PasswordStrengthBar from "react-password-strength-bar";

const ShippingForm: FC = () => {

    const [fullName, setFullName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>('LK');
    const [selectedCountryDialCode, setSelectedCountryDialCode] = useState<string>('+94');
    const [contactNumber, setContactNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [retypedEmail, setRetypedEmail] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');

    const countryList = countries.map((country) => {
        const countryItem: ICountryItem = {
            value: country.code,
            label: country.name,
            countryCode: country.dial_code
        }
        return countryItem;
    });

    const handleOnFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    }

    const handleOnAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleOnCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }

    const handleOnPostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(e.target.value);
    }

    const handleOnCountryChange = (selectedCountry: any) => {
        setSelectedCountryCode(selectedCountry.value);
        setSelectedCountryDialCode(selectedCountry.countryCode);
    }

    const handleOnContactNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactNumber(e.target.value);
    }

    const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleOnRetypedEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRetypedEmail(e.target.value);
    }

    const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    }

    return (
        <Form className="px-lg-3 px-2 pt-2 pb-5 shipping-form">
            <FormLabel>Full Name*</FormLabel>
            <FormControl type="text" placeholder="Your Full Name" value={fullName} onChange={handleOnFullNameChange}/>

            <FormLabel>Address*</FormLabel>
            <FormControl type="text" placeholder="Street Address" value={address} onChange={handleOnAddressChange}/>

            <Row>
                <Col className='ps-3 pe-1'>
                    <FormLabel>City / suburb*</FormLabel>
                    <FormControl type="text" placeholder="City / suburb" value={city} onChange={handleOnCityChange}/>
                </Col>
                <Col className='px-1'>
                    <FormLabel>Postal Code*</FormLabel>
                    <FormControl type="text" placeholder="Postal Code*" value={postalCode}
                                 onChange={handleOnPostalCodeChange}/>
                </Col>
                <Col className='ps-1'>
                    <FormLabel>Country*</FormLabel>
                    <Select options={countryList} placeholder="Select..." id='shipping-country'
                            onChange={handleOnCountryChange}/>
                </Col>
            </Row>

            <FormLabel>Contact Number*</FormLabel>
            <FormGroup>
                <InputGroup>
                    {selectedCountryCode !== '' && <InputGroup.Text>
                        <ReactCountryFlag
                            className="me-2"
                            countryCode={selectedCountryCode}
                            svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/"
                            cdnSuffix="svg"
                            style={{
                                width: '1.5em',
                                height: '0.8em',
                                fontSize: '17px'
                            }}
                        />
                        {selectedCountryDialCode}
                    </InputGroup.Text>}
                    <FormControl type="text" value={contactNumber} onChange={handleOnContactNumberChange}/>
                </InputGroup>
            </FormGroup>


            <Row>
                <Col sm={12} lg={6}>
                    <FormLabel>Email*</FormLabel>
                    <FormControl type="email" placeholder="Email" value={email} onChange={handleOnEmailChange}/>
                </Col>
                <Col sm={12} lg={6}>
                    <FormLabel>Retype Email*</FormLabel>
                    <FormControl type="email" placeholder="" value={retypedEmail}
                                 onChange={handleOnRetypedEmailChange}/>
                </Col>
            </Row>

            <FormLabel>Choose Your Password*</FormLabel>
            <FormControl type="password" onChange={handleOnPasswordChange}/>
            <Row>
                <Col lg={7}>
                    <PasswordStrengthBar
                        password={currentPassword}
                        scoreWordStyle={{display: 'none'}}
                        scoreWords={['weak', 'weak', 'okay', 'okay', 'good', 'strong']}
                    />

                </Col>
            </Row>
        </Form>
    );
}

export default ShippingForm;
