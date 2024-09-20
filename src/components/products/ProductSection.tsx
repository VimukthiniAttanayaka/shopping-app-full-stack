import React, {useEffect, useState} from 'react';
import {ICart} from '../../Types/ShoppingTypes';
import productsList from '../../assets/data/products.json';
import {useDispatch} from "react-redux";
import {setProducts} from "../../redux/slices/ProductSlice";
import {useAppSelector} from "../../hooks/hooks";
import {IProduct} from "../../Types/IProduct";
import Product from "./Product";
import {Row} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS} from "../../api/product.ts";
import {toast} from "react-toastify";
import {getProductImageLink} from "../../utills";
import NoData from "../common/NoData.tsx";

type ProductSectionProps = {
    selectedCategory: String,
    onCartItemCreate: (newItem: ICart) => void;
}


const ProductSection: React.FC<ProductSectionProps> = (props) => {
    const {data, loading, error} = useQuery(GET_PRODUCTS);


    if (error) {
        toast.error("Data is not loading")
    }

    console.log(data)
    const products = data?.products ?? [];
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
    const {onCartItemCreate, selectedCategory} = props;


    useEffect(() => {
        filterProducts();
    }, [selectedCategory]);

    const filterProducts = () => {
        let newProductsList = null;

        if (selectedCategory === 'All') {
            setFilteredProducts(products);
            return;
        }
        newProductsList = products.filter(products => products.category === selectedCategory.toLowerCase()).map((product: IProduct) => {
            return product;
        });
        setFilteredProducts(newProductsList);
    }

    useEffect(() => {
        filterProducts()
    },[products])

    if (filteredProducts.length === 0) {
        return (
                <NoData message={'No products found'}/>
        );
    }

    return (
        <Row className='product mb-5 mx-0 mx-lg-5 px-lg-4'>
            {filteredProducts.map((product: IProduct, index: number) => {
                    return <Product
                        product={{...product, image: getProductImageLink(product.image)}}
                        index={index}
                        key={index}
                        onCartItemCreate={onCartItemCreate}
                    />
                }
            )}
        </Row>
    );
}

export default ProductSection;
