import React from 'react';
import {Card, CardImg, Col, Row} from "react-bootstrap";

type CategoryListProps = {
    selectedCategory: string,
    items: {
        id: number
        name: string
        image: string
    }[],
    onCategoryChange: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = (props: CategoryListProps) => {

    const {onCategoryChange} = props;

    const handleCategoryChange = (category: string) => {
        onCategoryChange(category);
    }

    return (
        <React.Fragment>
            <Row xs={12} className='d-flex flex-row justify-content-center pt-4 mx-lg-5 category'>
                <h2 className='text-center'>Our Products</h2>
                <Col xl={12} lg={12} xs={12}
                     className='d-flex flex-md-row justify-content-between gap-2 gap-lg-4 mb-2 category-col'>
                    {props.items.map(item => {
                        return (
                            <Card
                                key={item.id}
                                className={`category-item ${props.selectedCategory == item.name ? 'active-item' : ''}`}
                                onClick={() => handleCategoryChange(item.name)}>
                                <CardImg src={item.image} alt={item.name}/>
                                <Card.Title className='text-center'>
                                    {item.name}
                                </Card.Title>
                            </Card>
                        );
                    })}
                </Col>
            </Row>
            {/*{getProductByCategory()}*/}
        </React.Fragment>
    );
};

export default CategoryList;
