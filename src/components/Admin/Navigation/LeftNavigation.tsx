import {FC, useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {FiShoppingCart, FiTag} from "react-icons/fi";

const LeftNavigation: FC = () => {

    const location = useLocation();
    const [url, setURL] = useState<string>('');

    useEffect(() => {
        setURL(location.pathname);
    }, [location]);


    return (
        <Col lg={2} className='left-navigation px-0'>
            <div className='logo-text px-lg-4 py-lg-4 fs-2'>
                LOGO
            </div>
            <ul className='list-unstyled px-0 nav-list'>

                <Link to='/admin/products' className={url.includes('/admin/products') ? 'active' : ''}>
                    <li className='px-lg-4'>
                        <FiTag/>
                        Products
                    </li>
                </Link>

                <Link to='/admin/orders' className={url.includes('/admin/orders') ? 'active' : ''}>
                    <li className='px-lg-4'>
                        <FiShoppingCart/>
                        Orders
                    </li>
                </Link>

            </ul>
        </Col>
    );
}

export default LeftNavigation;
