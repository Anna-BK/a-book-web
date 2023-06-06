import React, { ChangeEvent, useCallback, useState } from 'react';
import { CellProps, Column, ColumnInstance } from 'react-table';
import styled from 'styled-components';
import { Option } from '../common';
import { TableRowData } from '../screens/Home/Home';

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
    createFn? : any;
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

const leftPadZero = function(str : string){
    return (str.length === 1 ? '0'+ str : str );
}

const getFormattedDate = function (date : Date) {

    const monthStr = date.getMonth()+1 + '';
    const dateStr = date.getDate() + '';

    const dateFormat = date.getFullYear() + "-" + leftPadZero(monthStr) + "-" + leftPadZero(dateStr);

    return dateFormat;

    // // Get year, month, and day part from the date
    // var year = date.toLocaleString("default", { year: "numeric" });
    // var month = date.toLocaleString("default", { month: "2-digit" });
    // var day = date.toLocaleString("default", { day: "2-digit" });

    // // Generate yyyy-mm-dd date string
    // var formattedDate = year + "-" + month + "-" + day;
    // return formattedDate;
}

function AddableCell({
    value : {
        value : initialValue,
        id : columnDataId
    },
    column ,
    row,
    cell,
    updateFn,
    createFn,
} : EditableInputProps){

    if(column?.columnType === "2" && initialValue === ""){
        initialValue = getFormattedDate(new Date());
    }

    const [value, setValue] = useState(initialValue);

    const handleFocus = () => {
            console.log("=== For Edit ===");
            //createFn(column.id, initialValue);
            
            const addColData : TableRowData = JSON.parse(JSON.stringify(row.original)); 
            addColData[column.id] = {
                id : 0,
                value : value
            };
            createFn(addColData);
    }

    if(column?.columnType === "1"){
        return (
            <select value={value} onFocus={handleFocus}>
                {column.options?.map((opt)=>(
                    <option key={opt.id} value={opt.id}>{opt.title}</option>
                ))}
            </select>
        )
    }

    return <EditStyleInput type={ getInputType(column?.columnType as ColumnType) } value={value}  onFocus={handleFocus} />
}

export default AddableCell;