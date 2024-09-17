import {Col, Modal, Row} from "react-bootstrap";
import {useState} from "react";

const DescriptionCell = ({description} : {description: string}) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <Row >
            <Col xs={12}
                 style={{maxWidth: '160px' , whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer'}}
                 onClick={() => setModalShow(true)}
            >
                {description}
            </Col>
            <Modal
                show={modalShow}
                size="sm"
                centered
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Description
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {description}

                </Modal.Body>
            </Modal>
        </Row>
    );
};

export default DescriptionCell;