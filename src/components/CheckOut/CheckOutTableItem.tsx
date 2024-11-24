import {FC, useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import {MinusCircle, PlusCircle, Trash} from "react-feather";
import NumberFormat from 'react-number-format';
import {ICartItem} from "../../Types/ICartItem.tsx";
import {deleteItem} from "../../redux/slices/OrderSlice.ts";
import {useDispatch} from "react-redux";

type checkOutTableItemProps = {
    cartItem: ICartItem;
    index: number;
}
const CheckOutTableItem: FC<checkOutTableItemProps> = (props) => {
    const {cartItem, index,} = props;
    const unitPrice: number = parseFloat(cartItem.price); //This should be replaced with the real unit value
    const [itemQty, setItemQty] = useState<number>(cartItem.quantity);
    const [itemTotal, setItemTotal] = useState<number>(itemQty * unitPrice)
    const dispatch = useDispatch();
    //Item quantity  increase handler
    const handleOnItemQtyIncrease = () => {
        // TODO: set the max limit
        setItemQty(itemQty + 1);
    }

    //Item quantity  decrease handler
    const handleOnItemQtyDecrease = () => {
        if (itemQty > 1) {
            setItemQty(itemQty - 1);
        }
    }

    //handle item total on quantity change
    useEffect(() => {
        const newItemTotal = itemQty * unitPrice;
        setItemTotal(newItemTotal);
    }, [itemQty])

    const handleOnRemoveItemClick = (id: string) => {
        dispatch(deleteItem(id))
    }


    return (
        <tr key={index} className='checkout-table-details'>
            <td>{index + 1}</td>
            <td>
                <Image src={cartItem.image} className='checkout-table-item-image' fluid={false}/>
            </td>
            <td>{cartItem.name}</td>
            <td className='px-lg-5'>
                <MinusCircle size="20" className="hover-pointer table-item-icon" id="increaseQty"
                             onClick={handleOnItemQtyDecrease}/>
                <span className="px-1 ">{itemQty}</span>
                <PlusCircle size="20" className="hover-pointer table-item-icon" id="decreaseQty"
                            onClick={handleOnItemQtyIncrease}/>
            </td>
            <td><NumberFormat className='checkout-number-format' prefix="Rs." value={unitPrice} decimalScale={2}
                              fixedDecimalScale={true} readOnly/></td>
            <td><NumberFormat className='checkout-number-format' prefix="Rs." value={itemTotal} decimalScale={2}
                              fixedDecimalScale={true}/></td>
            <td className='delete-trash'><Trash className="hover-pointer checkout-remove"
                                                onClick={() => handleOnRemoveItemClick(cartItem.id)}/></td>
        </tr>

    )
}

export default CheckOutTableItem;
