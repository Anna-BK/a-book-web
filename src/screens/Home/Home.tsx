import { gql, useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Grid from '../../components/Grid';
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import './Home.css';

type Book = {
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
  //options Option[]
  columnDatas : ColumnData[],
  //user User @relation(fields: [userId], references : [id], onDelete: Cascade)
  //userId Int
}


// { columnId : value, .... } 형태...
const historyToObject = function (colDatas : ColumnData[]) : object {
  return colDatas.reduce((accum : any , colData : ColumnData)=>{
      accum[colData.columnId?.toString()] = colData.value;
      return accum;
  }, {});
}

function App() {

  const GET_BOOKS = gql`
  query Books($offset: Int!, $limit: Int!) {
  books(offset: $offset, limit: $limit) {
    ok
    error
    books {
      archieved
      historys {
        columnDatas {
          value
          columnId
        }
      }
      userId
      title
    }
  }
}`;


  const { data } = useQuery(GET_BOOKS, {
    variables: {
      offset: 0,
      limit: 10
    }
  });



console.log(data);

  //임시값 (user의 column 조회 API 필요)
  const columns = useMemo(()=>(
    [ {
      Header: '날짜',
      accessor: '2',
    }, {
      Header: '제목',
      accessor: '3',
    }, {
      Header: '비용',
      accessor: '4',
    },]
  ),[]);


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
                <div id="content_header"></div>
                <div id="content_body" >
                  <div id="grid_wrapper">
                    {/* 하나의 가계부 그리드 */}
                    {data?.books?.books?.map((book : Book)=>(
                      <Grid title={book.title}>
                          <Table columns={columns} data={book.historys?.map((history)=>(
                            historyToObject(history.columnDatas)
                          ))}/>
                      </Grid>
                    ))}
                  </div>
                </div>
                <div id="content_footer"></div>
                <div id="floating_bar_wrapper" className="card_box_theme">
                  <div id="floating_bar">
                    <div></div>
                    <div></div>
                    <div id="delete_menu_wrap"><button id="delete_btn" className="custom_btn"><span>삭제하기</span></button></div>
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
