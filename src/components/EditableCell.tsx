import React, { ChangeEvent, useCallback, useState } from 'react';
import { CellProps, Column, ColumnInstance } from 'react-table';
import styled from 'styled-components';

// todo : 기존 타입에 내가 커스텀한 필드를 추가하고자하는데 에러가남 

interface myColumn extends ColumnInstance<{}> {
    columnType? : string;
}

interface EditableInputProps extends CellProps<{}>  {
    column : myColumn;
    value : string;
    updateFn? : any;  //todo  ? 붙이면 works (extends 포함관계 파악)
}


const EditStyleInput = styled.input`
    border : 0;
    font-size : medium;
`;

const INPUT_TYPE = {
    "4" : "number",
    "3" : "text",
    "2" : "date",
}

type ColumnType =  keyof (typeof INPUT_TYPE) | undefined;

const getInputType = function(columnType : ColumnType){
    if (!columnType) {
       return "text"; 
    }

    return INPUT_TYPE[columnType];
}

function EditableCell({
    value : initialValue,
    column ,
    row,
    cell,
    updateFn,
    ...others 
} : EditableInputProps){

    console.log('column, row, cell');
    console.log(column, row, cell);

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

    return <EditStyleInput type={ getInputType(column?.columnType as ColumnType) } {...others} value={value} onChange={handleInputChange} onBlur={handleInputBlur}  />
}

export default EditableCell;