import {BsFillCircleFill} from "react-icons/bs";

type TProductItem = {
    quantity: number;
}
const QuantityCell = ({productItem} : {productItem: TProductItem}) => {
    return (
        <div>
            <div>{productItem.quantity}</div>
            {productItem.quantity === 0 ?
            <label className='d-flex align-items-center justify-content-center mt-0'>
                <BsFillCircleFill color={'#F42B3D'} size={12}/>
                <span className='ms-lg-1 f-s1' style={{color: "#F42B3D"}}>Out Of Stock</span>
            </label> :
            <label className='d-flex align-items-center justify-content-center mt-0'>
                <BsFillCircleFill color={'#32CC96'} size={12}/>
                <span className='ms-lg-1 f-s1' style={{color: "#32CC96"}}>In Stock</span>
            </label>
            }
        </div>
    );
};

export default QuantityCell;