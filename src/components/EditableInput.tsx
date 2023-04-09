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
        console.log('handleInputChange');
        setValue(e.target.value);
    },[]);


    // Bad Code )
    // const handleInputBlur = useCallback(()=>{
    //     updateFn(value); //value는 초기값만 계속 기억하고 있으므로(자기가 선언된 시점의 함수의 변수값) setValue 이후에 변화된 값을 가져오지 못한다.
    // },[]);

    // Good Code )
    const handleInputBlur = ()=>{
        updateFn(value);
    };

    return <EditStyleInput value={value} onChange={handleInputChange} onBlur={handleInputBlur}  />
}

export default EditableInput;