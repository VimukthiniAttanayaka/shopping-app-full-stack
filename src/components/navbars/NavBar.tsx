import React from 'react';
import {Link} from "react-router-dom";
import {Col, Nav, Navbar, NavDropdown, NavLink, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import CategoryDataList, {CategoryDataType} from "../../Types/CategoryDateList.tsx";
import {setSelectedCategory} from "../../redux/slices/ProductSlice.ts";

const NavBar: React.FC = () => {
    const dispatch = useDispatch()
    const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory)

    //handle categories dropdown
    const onHandleDropdownSelect = (event: string | null) => {
        if(event) {
            dispatch(setSelectedCategory(event))
        }
    }

    const renderCategories = () => {
        return CategoryDataList.map((option: CategoryDataType) => {
            return <NavDropdown.Item key={option.name} eventKey={option.name}>{option.name}</NavDropdown.Item>
        })
    }

    return (
        <Row className='mx-lg-5 position-static'>
            <Col className='mx-lg-5'>
                <Navbar className='py-3 header-navbar' collapseOnSelect>
                    <Nav className='ms-0 ms-lg-5 ms-md-4 my-1'>
                        <NavDropdown
                            title={selectedCategory === 'All' ? "Categories" : selectedCategory}
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


