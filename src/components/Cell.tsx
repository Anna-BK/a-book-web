import React from 'react';
import { CellProps, Column, ColumnInstance } from 'react-table';
import { Option } from '../common';
import AddableCell from './AddableCell';
import EditableCell from './EditableCell';

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


function Cell( props : EditableInputProps){
    console.log('Cell Props Value', props.value);
    console.log('Cell Props', props);
    //onFocus시에 나머지 컬럼 데이터도 같이 columnDatas에 포함되도록 해야함 (안그러면 추가한 데이터 출력시 props.value.id에서 undefined 문제생김)
    return <></>;
    return(props?.value?.id === 0? <AddableCell {...props}/> : <EditableCell {...props} />)
}

export default Cell;