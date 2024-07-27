import {Col, Row, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Facebook, Instagram, Linkedin, Rss, Twitter, Youtube} from 'react-feather';

const Footer = () => {
    return (
        <Row className="footer">
            <Col xs={12} className="px-0 mx-sm-auto">
                <Table
                    className="w-xl-50 mx-auto aligh-center d-flex justify-content-center mt-3 mb-0 static-pages-route">
                    <tbody>
                    <tr>
                        <td><Link to='about'>ABOUT US</Link></td>
                        <td><Link to='faq'>FAQ</Link></td>
                        <td><Link to='/'>DELIVERY INFO</Link></td>
                        <td><Link to='contact'>CONTACT US</Link></td>
                    </tr>
                    </tbody>
                </Table>
                <Table
                    className="w-50 mx-auto aligh-center d-flex justify-content-center mt-sm-2 mb-sm-4 social-media-route">
                    <tbody>
                    <tr>
                        <td>
                            <div><a href='https://www.facebook.com/'><Facebook className="facebook"/></a></div>
                        </td>
                        <td>
                            <div><a href='https://twitter.com/'><Twitter className="twitter"/></a></div>
                        </td>
                        <td>
                            <div><a href='https://lk.linkedin.com/'><Linkedin className="linkedin"/></a></div>
                        </td>
                        <td>
                            <div><a href='https://www.instagram.com/'><Instagram className="instagram"/></a></div>
                        </td>
                        <td>
                            <div><a href='https://rss.com/'><Rss className="rss"/></a></div>
                        </td>
                        <td>
                            <div><a href='https://www.youtube.com/'><Youtube className="youtube"/></a></div>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center copyright-section">Copyright © 2020. All Rights
                    Reserved. <span className="text-light d-none d-sm-block">Powered By SoftVessel</span></div>
                <div className="d-flex justify-content-center text-light d-block d-sm-none copyright-section">Powered By
                    SoftVessel
                </div>
            </Col>
        </Row>
    )
}

export default Footer;