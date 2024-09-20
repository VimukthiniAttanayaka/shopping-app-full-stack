import NoDataImage from './../../assets/images/no-data.svg'
import {FC} from "react";

type NoDataProps = {
    message: string
}
const NoData:FC<NoDataProps> = (props) => {
    return (
        <div className='h-100 w-100 text-center my-5'>
            <img src={NoDataImage} alt={'No Data'} style={{width: '250px'}}/>
            <p className='mt-3 f-s4-w3'>{props.message}</p>
        </div>
    );
};

export default NoData;