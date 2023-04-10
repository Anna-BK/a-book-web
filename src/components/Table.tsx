import React from 'react';
import {useTable} from 'react-table';
import EditableCell from './EditableCell';


type TableProps = {
    columns? : any,
    data? : any
}

function Table({ columns , data } : TableProps){

    console.log(columns);
    console.log(data);

    const defaultColumn = {
      Cell: EditableCell
    };
    
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
      defaultColumn 
    });

    return (
      <table className="a_book_table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  
   

    return(
        <table className="a_book_table">
        <thead>
          {/* <th></th>
          <th>분류</th>
          <th>날짜</th>
          <th>제목</th>
          <th>비용</th>
          <th>수단</th>
          <th>구분</th> */}
        </thead>
        <tbody>
          {/* <tr>
            <td><input type={'checkbox'} /></td>
            <td>식비</td>
            <td>2023/2/19</td>
            <td>뱃살도둑 샐러드</td>
            <td>5,900</td>
            <td>현대카드</td>
            <td>#배민</td>
          </tr> */}
        </tbody>
      </table>
    );

}

export default Table;