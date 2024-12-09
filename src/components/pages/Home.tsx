import React, {useEffect, useRef, useState} from 'react';
import PromotionSection from '../Promotion/PromotionSection'
import {Col, Row} from 'react-bootstrap';
import CategoryList from "../CategoryList/CategoryList";
import {ICart} from '../../Types/ShoppingTypes';
import SearchBar from './SearchBar';
import ProductSection from "../products/ProductSection";
import CategoryDataList from "../../Types/CategoryDateList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {setSelectedCategory} from "../../redux/slices/ProductSlice.ts";

type HomeProps = {
    onCartItemCreate: (newItem: ICart) => void;
};
const Home: React.FC<HomeProps> = (props) => {
    const {onCartItemCreate} = props;
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory)
    const [searchValue, setSearchValue] = useState('');

    const myRef = useRef(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

    const handleOnCategoryChange = (category: string) => {
        dispatch(setSelectedCategory(category));
    }

    const handleOnSearch = (value: string) => {
        dispatch(setSelectedCategory('All'));
        setSearchValue(value)
    }

    useEffect(() => {
        executeScroll()
    },[selectedCategory])

    return (
        <Row className=''>
            <Col xs={12} className="">
                <PromotionSection setProductSectionVisible={executeScroll}/>
                <SearchBar handleOnSearch={handleOnSearch}/>
                <div ref={myRef} style={{maxWidth: 1300, margin: "auto"}}>
                    {!searchValue && <Row className='mx-lg-5 mb-5'>
                        <Col className='mx-lg-4'>
                            <CategoryList
                                selectedCategory={selectedCategory}
                                items={CategoryDataList}
                                onCategoryChange={handleOnCategoryChange}/>
                        </Col>
                    </Row>}
                    <ProductSection
                        searchValue={searchValue}
                        onCartItemCreate={onCartItemCreate}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Home;
