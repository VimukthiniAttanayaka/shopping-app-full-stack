import React, {useState} from 'react';
import PromotionSection from '../Promotion/PromotionSection'
import {Row, Col} from 'react-bootstrap';


const Home: React.FC = () => {

    const [isProductSectionVisible, setIsProductSectionVisible] = useState<Boolean>(false);

    const setProductSectionVisible = (isProductSectionVisible: Boolean) => {
        setIsProductSectionVisible(isProductSectionVisible);
        console.log(isProductSectionVisible);
    }

    return (
        <Row>
            <Col xs={12} className="px-0">
                <PromotionSection setProductSectionVisible={setProductSectionVisible}/>
            </Col>
        </Row>
    )
}

export default Home;
