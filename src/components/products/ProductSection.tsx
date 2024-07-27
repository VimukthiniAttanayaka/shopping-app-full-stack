import React, {useEffect, useState} from 'react';
import {ICart} from '../../Types/ShoppingTypes';
import productsList from '../../assets/data/products.json';
import {useDispatch} from "react-redux";
import {setProducts} from "../../redux/slices/ProductSlice";
import {useAppSelector} from "../../hooks/hooks";
import {IProduct} from "../../Types/IProduct";
import Product from "./Product";
import {Row} from "react-bootstrap";

type ProductSectionProps = {
    selectedCategory: String,
    onCartItemCreate: (newItem: ICart) => void;
}


const ProductSection: React.FC<ProductSectionProps> = (props) => {
    const dispatch = useDispatch();
    dispatch(setProducts(productsList.products));
    const products = useAppSelector((state => state.products.products))
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

    if (filteredProducts.length === 0) {
        return (
            <p className="">
                <i>No Products List Here</i>
            </p>
        );
    }

    return (
        <Row className='product mb-5 mx-0 mx-lg-5 px-lg-4'>
            {filteredProducts.map((product: IProduct, index: number) => {
                    return <Product
                        product={product}
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
