import { FC } from "react";
import { Placeholder } from "react-bootstrap";

type SkeletonProps = {
  className: string
}

const Skeleton:FC<SkeletonProps> = ({className}) => {
    return (
        <Placeholder as="p" animation="glow" className={`${className} w-100`}>
        <Placeholder xs={12}  className='h-100 w-100' />
      </Placeholder>
    );
};

export default Skeleton;