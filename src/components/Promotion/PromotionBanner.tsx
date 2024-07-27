import React from 'react';
import {Button, Card} from 'react-bootstrap';

type PromotionBannerProps = {
    setProductSectionVisible: () => void;
}

const PromotionBanner: React.FC<PromotionBannerProps> = (props) => {
    return (
        <div className="promotion-banner">
            <Card.Body>
                <Card.Subtitle className="text-dark sub-title mb-lg-2 my-md-1">100% Healthy & Affordable</Card.Subtitle>
                <Card.Title className="title">organic vegetables</Card.Title>
                <Card.Subtitle className="text-dark sub-title my-lg-3 my-md-2">Small Changes Big
                    Difference</Card.Subtitle>
                <Button className="bg-light text-dark shop-now-button"
                        onClick={() => props.setProductSectionVisible()}>Shop Now</Button>
            </Card.Body>
        </div>
    )
}

export default PromotionBanner;
