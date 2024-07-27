import {FC, useState} from "react";
import {Card, Col, Image, Nav, Navbar, Row, Table} from "react-bootstrap";
import AppleImage from "../../../assets/images/prodcuts/Apple.webp"
import {Link} from "react-router-dom";
import {ChevronRight} from "react-feather";

const ViewOrder: FC = () => {

    const [orderItemsList] = useState([{
        "image": AppleImage,
        "product": "Apple",
        "quantity": 10,
        "price": 500
    }]);

    return (
        //Single product view goes here
        <Row className='content-wrapper d-grid p-lg-4 mx-0 pt-lg-1'>
            <Row className='mx-0'>
                <Col xs={12}>
                    <Navbar className='bg-transparent' expand="lg">
                        <Nav.Item as={Link} to='/admin/orders'
                                  className=
                                      'p-0 text-decoration-none'>Orders</Nav.Item>
                        <ChevronRight className='chevron-right-icon'/>
                        <Nav.Item
                                  className=
                                      'p-0 text-decoration-none text-dark pe-none'>View Order
                        </Nav.Item>
                    </Navbar>
                </Col>
                <Col className="admin-product pb-2" xs={12}>
                    <p className="m-0 fs-4">Order Details</p>
                </Col>
            </Row>
            <Row className='mx-0'>
                <Col lg={4} className='order-customer-details content p-0'>
                    <Card style={{width: 'auto'}} className='order-info-card p-lg-4'>
                        <Card.Body style={{padding: '0'}}>
                            <Card.Title style={{fontWeight: "600"}}>Order Info</Card.Title>
                            <Table className='order-info-table'>
                                <tbody>
                                <tr>
                                    <td className='details-table-label'>ID</td>
                                    <td>AB212</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Date & Time</td>
                                    <td>2012.15.15 24.56</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Payment Method</td>
                                    <td>Credit Card</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Invoice</td>
                                    <td>IN4512</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Status</td>
                                    <td>Completed</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card style={{width: 'auto'}} className='order-info-card p-lg-4'>
                        <Card.Body style={{padding: '0'}}>
                            <Card.Title style={{fontWeight: "600"}}>Customer Details</Card.Title>
                            <Table className='order-info-table'>
                                <tbody>
                                <tr>
                                    <td className='details-table-label'>Name</td>
                                    <td>Awantha</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Phone</td>
                                    <td>+9431137698</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Country</td>
                                    <td>Sri lanka</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Postal Code</td>
                                    <td>11020</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Address</td>
                                    <td>499/2, Kudabollatha, Ganemulla</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card style={{width: 'auto', border: "none"}} className='order-info-card p-lg-4'>
                        <Card.Body style={{padding: '0'}}>
                            <Card.Title style={{fontWeight: "600"}}>Shipping Details</Card.Title>
                            <Table className='order-info-table'>
                                <tbody>
                                <tr>
                                    <td className='details-table-label'>Name</td>
                                    <td>Awantha</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Phone</td>
                                    <td>+9431137698</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Country</td>
                                    <td>Sri lanka</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Postal Code</td>
                                    <td>11020</td>
                                </tr>
                                <tr>
                                    <td className='details-table-label'>Address</td>
                                    <td>499/2, Kudabollatha, Ganemulla</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card style={{width: 'auto'}} className='p-lg-4 order-items-card'>
                        <Card.Body className='p-0'>
                            <Card.Title style={{fontWeight: "600"}}>Order Items</Card.Title>
                            <Table className='orders-table'>
                                <thead>
                                <tr>
                                    <th colSpan={2}>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    orderItemsList.map((item) => (
                                            <tr>
                                                <td className='align-middle'><Image src={item.image}
                                                                                    className="order-item-image"/></td>
                                                <td className='align-middle'>{item.product}</td>
                                                <td className='align-middle'>{item.quantity}</td>
                                                <td className='align-middle'>LKR. {item.price}</td>
                                            </tr>
                                        )
                                    )
                                }
                                <tr>
                                    <th colSpan={3}>Total</th>
                                    <td>LKR. 1000</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Row>
    );
}

export default ViewOrder;
