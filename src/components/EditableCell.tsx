import React, { ChangeEvent, useCallback, useState } from 'react';
import { CellProps, Column, ColumnInstance } from 'react-table';
import styled from 'styled-components';
import { Option } from '../common';

// todo : 기존 타입에 내가 커스텀한 필드를 추가하고자하는데 에러가남 

interface myColumn extends ColumnInstance<{}> {
    columnType? : string;
    options? : Option[];
}

interface EditableInputProps extends CellProps<{}>  {
    column : myColumn;
    value : {
        id : number;
        value : string;
    };
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
    value : {
        value : initialValue,
        id : columnDataId
    },
    column ,
    row,
    cell,
    updateFn,
} : EditableInputProps){

    console.log('initialValue',initialValue);

    console.log('column, row, cell');
    console.log(column, row, cell);

    const [value, setValue] = useState(initialValue);

    const handleInputChange = useCallback(function (e : ChangeEvent<HTMLInputElement>) {
        console.log('handleInputChange');
        setValue(e.target.value);
    },[]);


    const handleSelectChange = useCallback(function (e : ChangeEvent<HTMLSelectElement>) {
        setValue(e.target.value);
        updateFn(columnDataId, e.target.value);
    }, [columnDataId]);


    // Bad Code )
    // const handleInputBlur = useCallback(()=>{
    //     updateFn(value); //value는 초기값만 계속 기억하고 있으므로(자기가 선언된 시점의 함수의 변수값) setValue 이후에 변화된 값을 가져오지 못한다.
    // },[]);

    // Good Code )
    const handleInputBlur = ()=>{
        updateFn(columnDataId, value);
    };

    if(column?.columnType === "1"){
        return (
            <select value={value} onChange={handleSelectChange}>
                {column.options?.map((opt)=>(
                    <option key={opt.id} value={opt.id}>{opt.title}</option>
                ))}
            </select>
        )
    }

    return <EditStyleInput type={ getInputType(column?.columnType as ColumnType) } value={value} onChange={handleInputChange} onBlur={handleInputBlur}  />
}

export default EditableCell;