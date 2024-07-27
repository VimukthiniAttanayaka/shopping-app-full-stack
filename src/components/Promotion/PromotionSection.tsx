import React from 'react';
import {Image, Row, Col} from 'react-bootstrap';
import PromotionImage from '../../assets/images/banners/PromotionImage.webp';
import PromotionBanner from './PromotionBanner'

type PromotionSectionProps = {
    setProductSectionVisible: () => void;
}

const PromotionSection:React.FC<PromotionSectionProps> = (props) => {
    return (
        <Row className="promotionSection ">
            <Col xs={12} className='px-0 d-flex align-items-center align-content-center'>
                <Image src={PromotionImage} className="img-fluid promotion-image"/>
                <PromotionBanner setProductSectionVisible={props.setProductSectionVisible}/>
            </Col>
        </Row>
    );
}

export default PromotionSection;
