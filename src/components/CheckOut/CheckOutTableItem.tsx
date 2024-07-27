import {BaseSyntheticEvent, FC, useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import {MinusCircle, PlusCircle, Trash} from "react-feather";
import {ICart} from "../../Types/ShoppingTypes";
import NumberFormat from 'react-number-format';
import {carrot, coconut} from "../../assets/images/images";

type checkOutTableItemProps = {
    onRemoveItem: (index: number) => void;
    cartItem: ICart;
    index: number;
}
const CheckOutTableItem: FC<checkOutTableItemProps> = (props) => {
    const {onRemoveItem, cartItem, index,} = props;
    const unitPrice: number = parseFloat(cartItem.price); //This should be replaced with the real unit value
    const [itemQty, setItemQty] = useState<number>(cartItem.quantity);
    const [itemTotal, setItemTotal] = useState<number>(itemQty * unitPrice)

    let image;
    if (cartItem.img === "carrot") {
        image = carrot;
    } else if (cartItem.img === "coconut") {
        image = coconut;
    }
    //Item quantity  increase handler
    const handleOnItemQtyIncrease = (event: BaseSyntheticEvent) => {
        console.log(event)
        const newQty = itemQty + 1;
        setItemQty(newQty);
    }

    //Item quantity  decrease handler
    const handleOnItemQtyDecrease = () => {
        if (itemQty === 0) {
            return;
        }
        const newQty = itemQty - 1;
        setItemQty(newQty);
    }

    //handle item total on quantity change
    useEffect(() => {
        const newItemTotal = itemQty * unitPrice;
        setItemTotal(newItemTotal);
    }, [itemQty])

    const handleOnRemoveItemClick = () => {
        onRemoveItem(index);
    }


    return (
        <tr key={index} className='checkout-table-details'>
            <td>{index + 1}</td>
            <td>
                <Image src={image} className='checkout-table-item-image' fluid={false}/>
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
                                                onClick={handleOnRemoveItemClick}/></td>
        </tr>

    )
}

export default CheckOutTableItem;
