import React, {useState} from 'react';
import {Card, CardImg, Col, Row} from "react-bootstrap";

type CategoryListProps = {
    items: {
        id: number
        name: string
        image: string
    }[],
    onCategoryChange: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = (props: CategoryListProps) => {

    const {onCategoryChange} = props;
    const [selectedCategory, setSelectedCategory] = useState<String>("All");

    const handleCategoryChange = (category: string) => {
        onCategoryChange(category);
    }

    return (
        <React.Fragment>
            <Row xs={12} className='d-flex flex-row justify-content-center pt-4 mx-lg-5 category'>
                <h2 className='text-center'>Our Products</h2>
                <Col xl={12} lg={12} xs={12}
                     className='d-flex flex-md-row justify-content-around mb-2'>
                    {props.items.map(item => {
                        return (
                            <Card key={item.id} className='category-item m-xl-4 m-lg-2'
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
