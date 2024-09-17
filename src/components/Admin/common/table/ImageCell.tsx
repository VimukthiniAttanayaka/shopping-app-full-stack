import {Image} from "react-bootstrap";
import {getProductImageLink} from "../../../../utills";

const ImageCell = ({image} : {image: string}) => {
    return (
        <div>
            <Image src={getProductImageLink(image)} className="product-item-image"/>
        </div>
    );
};

export default ImageCell;