import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

type EditableInputProps = {
    value : string,
    updateFn : any, 
};

const EditStyleInput = styled.input`
    border : 0;
    font-size : medium;
`;


function EditableInput({
    value : initialValue,
    updateFn

} : EditableInputProps){

    const [value, setValue] = useState(initialValue);

    const handleInputChange = useCallback(function (e : ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    },[]);

    const handleInputBlur = useCallback(()=>{
        updateFn(value);
    },[]);

    return <EditStyleInput value={value} onChange={handleInputChange} onBlur={handleInputBlur}  />
}

export default EditableInput;