import React, {useRef, useState} from 'react';
import PromotionSection from '../Promotion/PromotionSection'
import {Col, Row} from 'react-bootstrap';
import CategoryList from "../CategoryList/CategoryList";
import CategoryDateList from "../../Types/CategoryDateList";
import {ICart} from '../../Types/ShoppingTypes';
import SearchBar from './SearchBar';
import ProductSection from "../products/ProductSection";

type HomeProps = {
    onCartItemCreate: (newItem: ICart) => void;
};
const Home: React.FC<HomeProps> = (props) => {
    const {onCartItemCreate} = props;
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchValue, setSearchValue] = useState('');

    const [categories] = useState(CategoryDateList);
    const myRef = useRef(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

    const handleOnCategoryChange = (category: string) => {
        setSelectedCategory(category);
    }

    const handleOnSearch = (value: string) => {
        setSelectedCategory('All')
        setSearchValue(value)
    }

    return (
        <Row className=''>
            <Col xs={12} className="">
                <PromotionSection setProductSectionVisible={executeScroll}/>
                <SearchBar handleOnSearch={handleOnSearch}/>
                <div ref={myRef} style={{maxWidth: 1300, margin: "auto"}}>
                    {!searchValue && <Row className='mx-lg-5 mb-5'>
                        <Col className='mx-lg-4'>
                            <CategoryList selectedCategory={selectedCategory} items={categories}
                                          onCategoryChange={handleOnCategoryChange}/>
                        </Col>
                    </Row>}
                    <ProductSection searchValue={searchValue} onCartItemCreate={onCartItemCreate}
                                    selectedCategory={selectedCategory}/>
                </div>
            </Col>
        </Row>
    )
}

export default Home;
