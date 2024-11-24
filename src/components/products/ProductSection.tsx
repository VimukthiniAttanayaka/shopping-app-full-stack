import React, {useEffect} from 'react';
import {ICart} from '../../Types/ShoppingTypes';
import {IProduct} from "../../Types/IProduct";
import Product from "./Product";
import {Col, Row} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS} from "../../api/product.ts";
import {toast} from "react-toastify";
import {getProductImageLink} from "../../utills";
import NoData from "../common/NoData";
import Skeleton from "../common/Skeleton";

type ProductSectionProps = {
    searchValue: string
    selectedCategory: string,
    onCartItemCreate: (newItem: ICart) => void;
}


const ProductSection: React.FC<ProductSectionProps> = (props) => {
    const {onCartItemCreate, selectedCategory, searchValue} = props;
    const {data, loading, error, fetchMore} = useQuery(GET_PRODUCTS, {
        variables: {
            category: selectedCategory.toLowerCase(),
            query: searchValue,
        },
    });

    if (error) {
        toast.error("Data is not loading")
    }

    const products = data?.getProducts?.products ?? [];

    useEffect(() => {
        fetchMore({variables: {query: searchValue}})
    },[searchValue])

    if (loading) {
        return (
            <Row className='d-flex justify-content-center mb-5'>
                {[...Array(4)].map((_:undefined, index: number) => (
                        <Col xs={6} sm={4} md={4} lg={3} key={index}>
                            <Skeleton className='products-section-skeleton'/>
                        </Col>
                    )
                )}
            </Row>
        )
    } else  if (products.length == 0) {
        return (
            <NoData message={'No products found'}/>
        );
    } else {
        return (
            <Row className='d-flex justify-content-center mb-5'>
                {products.map((product: IProduct, index: number) => {
                        return <Col
                            xs={6} sm={4} md={4} lg={3} key={index}
                        ><Product
                            product={{...product, image: getProductImageLink(product.image)}}
                            index={index}
                            onCartItemCreate={onCartItemCreate}
                        /></Col>
                    }
                )}
            </Row>
        );
    }
}

export default ProductSection;
