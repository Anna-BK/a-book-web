import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useCallback,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { logUserOut } from '../../apollo';
import EditableInput from '../../components/EditableInput';
import Grid from '../../components/Grid';
import MoreDropDown from '../../components/MoreDropDown';
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import { Option } from '../../common';
import './Home.css';

type Book = {
  id : number,
  archieved: Boolean,
  historys: History[],
  title: string,
  userId: number,
}

type History = {
  id : number,
  createdAt : string,
  updatedAt : string,
  columnDatas :  ColumnData[],
  book :  Book,
  bookId : number,
}

type ColumnData = {
  id  : number,
  value : string,
  createdAt: string,
  updatedAt : string,
  history :  History,
  historyId : number,
  column :  Column ,
  columnId : number,
}


type Column =  {
  id : number,
  title : string,
  columnType : number,
  createdAt : string,
  updatedAt : string,
  options :  Option[],
  columnDatas : ColumnData[],
  //user User @relation(fields: [userId], references : [id], onDelete: Cascade)
  //userId Int
}


// { columnId : value, .... } 형태...
const historyToObject = function (colDatas : ColumnData[]) : object {
  return colDatas.reduce((accum : any , colData : ColumnData)=>{
      accum[colData.columnId?.toString()] = {
        id : colData.id,  //columnDataId
        value : colData.value
      }
      return accum;
  }, {});
}

const formatColumns = function (columns : Column[]) : { Header: string; accessor: string; columnType : string; options : Option[] }[] {
  console.log('columns', columns);
  return columns.map((col)=>(
    {
      Header: col.title,
      accessor: col.id.toString(),
      columnType : col.columnType.toString(),
      options : col.options
    }
  ))
}

const getDefaultDataForAdd = function(len : number){

    const data : any = {};

    for (let i = 1; i <= len; i++) {
        data[i+''] = { id : 0, value : ''};
    }

    return [ data ];
}

const GET_BOOKS_COLUMNS = gql`
query Books($offset: Int!, $limit: Int!) {
books(offset: $offset, limit: $limit) {
  ok
  error
  books {
    id
    archieved
    historys {
      columnDatas {
        id
        value
        columnId
      }
    }
    userId
    title
  }
}
columns {
  ok
  columns {
    columnType
    id
    title
    options {
        id
        title
    }
  }
}
}`;

const CREATE_BOOK = gql`
mutation CreateBook($title: String!) {
  createBook(title: $title) {
    error
    ok
    book {
      archieved
      historys {
        columnDatas {
          columnId
          value
        }
      }
      userId
      title
    }
  }
}
`;

const MODIFY_BOOK = gql`
mutation ModifyBook($bookId: Int!, $title: String, $archieved: Boolean) {
  modifyBook(bookId: $bookId, title: $title, archieved: $archieved) {
    error
    ok
  }
}
`;

const DELETE_BOOK = gql`
mutation DeleteBook($bookId: Int!) {
  deleteBook(bookId: $bookId) {
    error
    ok
  }
}
`;

const MODIFY_COLUMNDATA = gql`
mutation ModifyColumnData($columnDataId: Int!, $value: String!) {
  modifyColumnData(columnDataId: $columnDataId, value: $value) {
    ok
    error
  }
}`;

const refetchBookOption = {
  refetchQueries: [
    {query: GET_BOOKS_COLUMNS, variables : {
      offset: 0,
      limit: 10
    } }, // DocumentNode object parsed with gql
    'Books' // Query name
  ],
};

function App() {

  const navigate = useNavigate();

    const { loading, data } = useQuery(GET_BOOKS_COLUMNS, {
      variables: {
        offset: 0,
        limit: 10
      }
    });

    const [ createBook, { data : createBookData }] = useMutation(CREATE_BOOK, {
      refetchQueries: [
        {query: GET_BOOKS_COLUMNS, variables : {
          offset: 0,
          limit: 10
        } }, // DocumentNode object parsed with gql
        'Books' // Query name
      ],
    });


    const [ modifyBook ] = useMutation(MODIFY_BOOK, {
      refetchQueries: [
        {query: GET_BOOKS_COLUMNS, variables : {
          offset: 0,
          limit: 10
        } }, // DocumentNode object parsed with gql
        'Books' // Query name
      ],
    });

    const [ modifyColumnData ] = useMutation(MODIFY_COLUMNDATA);


    const [ deleteBook ] = useMutation(DELETE_BOOK, refetchBookOption);


    // 토큰 만료 에러 처리 예시 (임시)
    // https://www.apollographql.com/docs/react/data/error-handling/
    // 에러 메시지가 아닌 NetworkError나 권한 없음 의미하는 300 코드가 필요함 (공통코드)
     if(createBookData?.createBook.error === "Please log in."){
        logUserOut();
        navigate('/login');
    }
    
 

console.log(loading, data);


const handleBookAddBtnClick = useCallback(function () {
  console.log('handleBookAddBtnClick');

  createBook({
    variables : {
      title : "Untitled"
    }
  });
},[]);

const handleGridTitleBlur = useCallback(function (bookId : number, value : string) {
  console.log('handleGridTitleBlur', bookId, value);

  modifyBook({
    variables : {
      bookId,
      title : value,
    }
  });


  
},[]);

const handleCellBlur = useCallback(function (columnDataId : number, value : string) {
  console.log('handleCellBlur', columnDataId, value);

  modifyColumnData({
    variables : {
      columnDataId,
      value
    }
  });

},[]);

const handleBookDeleteClick = useCallback((bookId : number)=>{
    console.log('handleBookDeleteClick', bookId);

    deleteBook({
      variables : {
        bookId
      }
    });
    
},[]);

  return (
    <>
      <PageTitle title='가계복' />
      <div className="app">
        <header id="top_header" className="header">
          <div className="login_group">
            <div id="profile">
              <a href="javascript:;">
                <img id="gnb_profile_img" src="https://ssl.pstatic.net/static/common/myarea/myInfo.gif" height={26} />
                <span id="gnb_profile_name" >복이누나</span>
              </a>
              <div id="profile_layer" className="dropdown_content naver_theme">
                <ul>
                  <li className="active"><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <nav id="nav_snb">
            <div className="list_menu naver_theme">
              <ul>
                <li className="active"><a>Active Menu</a></li>
                <li><a>Inactive Menu</a></li>
              </ul>
            </div>
          </nav>
          <main>
            <div id='content_wrapper'>
              <div id="content">
                <div id="content_header">
                  <div id="book_add_menu_btn_wrap" className='btn_wrap'>
                    <button onClick={handleBookAddBtnClick} id='book_add_btn' className='custom_btn'><span>+</span></button>
                  </div>
                </div>
                <div id="content_body" >
                  <div id="grid_wrapper">
                    {/* 하나의 가계부 그리드 */}
                    {data?.books?.books?.map((book : Book)=>(
                      <Grid key={book.id} menu={<MoreDropDown list={[{title : 'Delete', onClickFn : handleBookDeleteClick.bind(null, book.id)}]} />} title={<EditableInput value={book.title} updateFn={handleGridTitleBlur.bind(null, book.id)} />}>
                          <Table columns={formatColumns(data?.columns?.columns)} data={[...book.historys?.map((history)=>(
                            historyToObject(history.columnDatas)
                          )), ...getDefaultDataForAdd(data?.columns?.columns.length)]} 
                          updateFn={handleCellBlur}/>
                      </Grid>
                    ))}
                  </div>
                </div>
                <div id="content_footer"></div>
                <div id="floating_bar_wrapper" className="card_box_theme">
                  <div id="floating_bar" className="menu_panel">
                    <div></div>
                    <div></div>
                    <div id="delete_menu_wrap" className='btn_wrap'><button id="delete_btn" className="custom_btn"><span>삭제하기</span></button></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
