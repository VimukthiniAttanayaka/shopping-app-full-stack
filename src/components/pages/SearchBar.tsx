import React, {ChangeEvent, useDeferredValue, useEffect, useState} from 'react';
import {Search} from "react-feather";
import {Col, Form, InputGroup} from "react-bootstrap";

type SearchBarProps = {
    handleOnSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
        props.handleOnSearch(deferredQuery)
    }, [deferredQuery])

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
                            value={query}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>setQuery(event.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
            </Form>


        </Col>
    )

}

export default SearchBar;
