import {Spinner} from "react-bootstrap";

const Loading = () => {
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center gap-2'>
            <Spinner animation="grow" size='sm'/>
            <Spinner animation="grow" size='sm'/>
            <Spinner animation="grow" size='sm'/>
        </div>
    );
};

export default Loading;