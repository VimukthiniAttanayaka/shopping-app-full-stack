import React, {FC} from 'react';
import {Form} from "react-bootstrap";

type FormGroupProps = {
    value?: string
    handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    isDisabled?: boolean
    label: string
    type: string
    placeholder?: string
    isRequired?: boolean
    min?: string
    as?: any
    allowNegative?: boolean
    thousandSeparator? : boolean
    rows?: number
    name?: string
}

const InputGroup:FC<FormGroupProps> = (props) => {
    const {
        handleOnChange,
        isDisabled,
        label,
        type,
        placeholder,
        isRequired,
        value,
        min,
        as,
        allowNegative,
        thousandSeparator,
        rows,
        name
    } = props;
    return (
        <Form.Group className="mb-3 data-field">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                value={value}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                onChange={handleOnChange}
                disabled={isDisabled}
                min={min}
                as={as}
                allowNegative={allowNegative}
                thousandSeparator={thousandSeparator}
                rows={rows}
                name={name}
            />
        </Form.Group>
    );
};

export default InputGroup;