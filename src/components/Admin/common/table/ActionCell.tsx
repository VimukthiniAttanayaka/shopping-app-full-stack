import {Button, Col, Modal, Row} from "react-bootstrap";
import {Edit2, Trash2} from "react-feather";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_PRODUCT} from "../../../../api/product.ts";
import {toast} from "react-toastify";

type TProductItem = {
    id: string;
}
const ActionCell = ({productItem}: {productItem: TProductItem}) => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    const [deleteProduct, {data: deleteData}] = useMutation(DELETE_PRODUCT)

    useEffect(() => {
        if(deleteData) {
            if (deleteData.deleteProduct) {
                toast.success("Product deleted successfully")
            } else {
                toast.error("Product delete failed")
            }
        }
    },[deleteData])

    const handleDelete = () => {
        deleteProduct({
            variables: {id : productItem.id}
        })
        setModalShow(false)
    }

    return (
        <Row className='mx-0'>
            <Col className='d-flex px-0 product-table-item-actions justify-content-around'>
                {/*<Eye className="btn-eye" size={'18px'} color={'black'} />*/}
                <Edit2 className="btn-edit" size={16} color={'#D0A617'} onClick={() => navigate('/admin/products/updateProduct/' + productItem.id)}/>
                <Trash2 className="btn-trash2" size={16} color={'#F42B3D'} onClick={() => setModalShow(true)} />
            </Col>
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You can not undo the delete action.
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() =>  setModalShow(false)}>Close</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default ActionCell;