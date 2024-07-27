import React from 'react';
import {Search} from "react-feather";
import {Col, Form, InputGroup} from "react-bootstrap";

const SearchBar: React.FC = () => {
    return (
        <Col xs={12} className='mb-4'>
            <Form>
                <Form.Group className="search-bar mx-auto d-flex ">
                    <InputGroup.Text className="search-icon">
                        <Search className='search-feather-icon' size='5px'/>
                    </InputGroup.Text>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            className="search-box ms-0 ps-0"
                        />

                    </InputGroup>
                </Form.Group>
            </Form>


        </Col>
    )

}

export default SearchBar;
