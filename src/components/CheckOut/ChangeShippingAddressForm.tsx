import React, {FC, useState} from "react";
import {Col, FormControl, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import countries from '../../assets/data/CountryCodes.json';
import {ICountryItem} from "../../Types/ICountryItem";

const ShippingForm: FC = () => {

    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
    const [selectedCountryDialCode, setSelectedCountryDialCode] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<string>('');

    const countryList = countries.map((country) => {
        const countryItem: ICountryItem = {
            value: country.code,
            label: country.name,
            countryCode: country.dial_code
        }
        return countryItem;
    });

    const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
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

    return (
        <div className="px-0 mt-lg-0 pt-2 pb-2 shipping-form">
            <FormLabel>Name*</FormLabel>
            <FormControl type="text" placeholder="Your Full Name" value={name} onChange={handleOnNameChange}/>

            <FormLabel>Billing Address*</FormLabel>
            <FormControl type="text" placeholder="Street Address" value={address} onChange={handleOnAddressChange}/>

            <Row>
                <Col>
                    <FormLabel>City / suburb*</FormLabel>
                    <FormControl type="text" placeholder="City / suburb" value={city} onChange={handleOnCityChange}/>
                </Col>
                <Col>
                    <FormLabel>Postal Code*</FormLabel>
                    <FormControl type="text" placeholder="Postal Code*" value={postalCode}
                                 onChange={handleOnPostalCodeChange}/>
                </Col>
                <Col>
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
        </div>
    );
}

export default ShippingForm;
