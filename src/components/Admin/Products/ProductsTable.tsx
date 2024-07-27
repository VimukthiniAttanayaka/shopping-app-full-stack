import React, {FC, useEffect, useState} from "react";
import {Col, Row, Table} from "react-bootstrap";
import allProducts from '../../../assets/data/products.json';
import ProductTableItem from "./ProductTableItem";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";

const ProductsTable: FC = () => {
    const products = allProducts.products;

    const productCount = products.length;
    const productsPerPage = 6;
    const pageCount = Math.ceil(productCount / productsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(productsPerPage);
    const [filteredProducts, setFilteredProducts] = useState(products.slice(startIndex, endIndex));

    const calculateStartIndex = () => {
        setStartIndex((currentPage - 1) * productsPerPage);
    }
    const calculateEndIndex = () => {
        if ((startIndex + productsPerPage) > productCount) {
            setEndIndex(productCount);
        } else {
            setEndIndex(startIndex + productsPerPage);
        }
    }
    const range = (start: number, end: number) => {
        let length = end - start + 1;
        return Array.from({length}, (_, idx) => idx + start);
        // return [...Array(end - start + 1).keys()].map(x => x + start);
    };

    //Update start index on page number change
    useEffect(() => {
        calculateStartIndex();
        changeActivePageNumberClasses();
    }, [currentPage]);

    //Update end index on start index change
    useEffect(() => {
        calculateEndIndex();
    }, [startIndex])

    //update products array to display on end index change
    useEffect(() => {
        if (startIndex > endIndex) {
            return;
        }
        setFilteredProducts(products.slice(startIndex, endIndex));
    }, [endIndex]);

    const pageNumbers = range(1, pageCount).map((item: number) => {
        return item;
    });

    //Set new page number when clicked on pages
    const handleOnPageNumberChange = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        const valueReceived: number = parseInt((e.target as HTMLInputElement).id, 10);
        console.log(valueReceived);
        setCurrentPage(valueReceived);
    }

    const handleOnPaginationArrowClicked = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        const valueReceived = (e.target as HTMLInputElement).id;
        if (valueReceived === '') return;
        let newPageNumber = currentPage;
        switch (valueReceived) {
            case 'prev':
                if (currentPage === 1) break;
                newPageNumber = currentPage - 1;
                setCurrentPage(newPageNumber);
                break;
            case 'next':
                if (currentPage === pageNumbers[pageCount - 1]) break;
                newPageNumber = currentPage + 1;
                setCurrentPage(newPageNumber);
                break;
            default:
        }
    }

    const changeActivePageNumberClasses = () => {
        let currentPageNumberElement = document.getElementById(currentPage.toString());

        //remove active classes
        let elements = document.getElementsByClassName('active-page-number');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active-page-number');
        }

        //add active class to current page number
        if (currentPageNumberElement === null) return;
        currentPageNumberElement.classList.add('active-page-number');
    }
    //===================================


    const renderProducts = () => {
        return (
            <tbody>
            {
                filteredProducts.map((product, index) => {
                    if (index < 6) {
                        return <ProductTableItem product={product} key={index}/>
                    }
                })
            }
            </tbody>
        );
    };

    return (
        <Row className='mx-0 p-lg-4 content h-100'>
            <Col>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th className="bold  py-3 px-0">Product Name</th>
                        <th className="bold  py-3 px-0">Category</th>
                        <th className="bold  py-3 px-0">Price</th>
                        <th className="bold  py-3 px-0">Quantity</th>
                        <th className="bold  py-3 px-0">Inventory</th>
                        <th className="bold  py-3 px-0">Action</th>
                    </tr>
                    </thead>
                    {renderProducts()}
                </Table>

                <Row className='bottom-0 mb-4 pb-2  d-flex pe-0 position-absolute pagination-group'>
                    <Col lg={2}> </Col>
                    <Col className='d-flex justify-content-end align-items-center pe-3' lg={10}>
                        <FiArrowLeft color='#0C2556' size='23px' id='prev' onClick={handleOnPaginationArrowClicked}/>
                        {
                            pageNumbers.map((pageNumber) => {
                                return <label
                                    className={'single-page-number mx-1 px-2 mb-2'}
                                    id={String(pageNumber)} key={pageNumber}
                                    onClick={handleOnPageNumberChange}
                                >
                                    {pageNumber}
                                </label>;
                            })
                        }
                        <FiArrowRight color='#0C2556' size='23px' id='next' onClick={handleOnPaginationArrowClicked}/>
                    </Col>
                </Row>

            </Col>
        </Row>
    );
}

export default ProductsTable;
