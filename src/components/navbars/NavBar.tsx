import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Navbar, NavLink, Nav, NavDropdown, Row, Col} from "react-bootstrap";
import {ISelectOption} from "../../Types/ISelectOption";

const NavBar: React.FC = () => {

    const [selectedCategoryDropdownItem, SetSelectedCategoryDropdownItem] = useState<null | ISelectOption>(null)

    //handle categories dropdown
    const onHandleDropdownSelect = (e: null | string) => {
        options.forEach((item) => {
            if (item.value.toString() === e) {
                SetSelectedCategoryDropdownItem(item);
            }
        });
    }

    const options: ISelectOption[] = [
        {value: 1, label: 'Category 1'},
        {value: 2, label: 'Category 2'},
        {value: 3, label: 'Category 3'},
        {value: 4, label: 'Category 4'},
    ];

    const renderCategories = () => {
        return options.map((option) => {
            return <NavDropdown.Item key={option.value} eventKey={option.value}>{option.label}</NavDropdown.Item>
        })
    }

    return (
        <Row className='mx-lg-5 position-static'>
            <Col className='mx-lg-5'>
                <Navbar className='py-3 header-navbar' collapseOnSelect>
                    <Nav className='ms-0 ms-lg-5 ms-md-4 my-1'>
                        <NavDropdown
                            title={selectedCategoryDropdownItem ? selectedCategoryDropdownItem.label : "Categories"}
                            id="collasible-nav-dropdown" className="navbar-dropdown ps-0 px-lg-2 py-0"
                            onSelect={onHandleDropdownSelect}>
                            {renderCategories()}
                        </NavDropdown>
                        <NavLink as={Link} to='/' className='mx-lg-2'>Home</NavLink>
                        <NavLink as={Link} to='/about' className='mx-lg-2'>About Us</NavLink>
                        <NavLink as={Link} to='/faq' className='mx-lg-2'>FAQ</NavLink>
                        <NavLink as={Link} to='/pricing' id="pricing-link"
                                 className='mx-lg-2 px-3 py-0 d-inline-flex align-items-center'>
                            Pricing
                        </NavLink>
                        <NavLink as={Link} to='/contact' className='mx-lg-2'>Contact Us</NavLink>
                    </Nav>
                </Navbar>
            </Col>
        </Row>
    );
}

export default NavBar;


