import {Col} from "react-bootstrap";
import BillingForm from "../CheckOut/BillingForm.tsx";
import ChangeShippingAddressSection from "../CheckOut/ChangeShippingAddressSection.tsx";

const MyProfile = () => {
    return (
        <div>
            <Col md={6} className="border px-0 mt-1">
                <p className="border-bottom py-3 mx-3">
                    Shipping and Billing Address
                </p>
                <BillingForm/>
            </Col>
            <Col md={6} className="px-0 mt-4 mt-lg-4">
                <ChangeShippingAddressSection/>
            </Col>
        </div>
    );
};

export default MyProfile;