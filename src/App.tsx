import React from 'react';
import './App.css';


function App() {
  return (
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
                  <div className="grid_container card_box_theme">
                    <div className="grid_header">
                      <div className="grid_title_wrapper">
                        <span>2023-02</span>
                      </div>
                      <div className="grid_menu_wrapper">
                        <div className="dropdown">
                          <button onClick={() => { document.querySelector('.dropdown')?.classList.toggle('active') }} className="dropdown_btn">more</button>
                          <div className="dropdown_content">
                            <ul>
                              <li><a href=''>Archive</a></li>
                              <li><a href=''>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <table className="a_book_table">
                        <thead>
                          <th></th>
                          <th>분류</th>
                          <th>날짜</th>
                          <th>제목</th>
                          <th>비용</th>
                          <th>수단</th>
                          <th>구분</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td><input type={'checkbox'} /></td>
                            <td>식비</td>
                            <td>2023/2/19</td>
                            <td>뱃살도둑 샐러드</td>
                            <td>5,900</td>
                            <td>현대카드</td>
                            <td>#배민</td>
                          </tr>
                          <tr>
                            <td><input type={'checkbox'} /></td>
                            <td>고정비</td>
                            <td>2023/2/22</td>
                            <td>통신비</td>
                            <td>72,600</td>
                            <td>기업은행</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><input type={'checkbox'} /></td>
                            <td>개인비</td>
                            <td>2023/2/25</td>
                            <td>축의금</td>
                            <td>100,000</td>
                            <td>기업은행</td>
                            <td>#경조사</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="grid_footer"></div>
                  </div>
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
  );
}

export default App;
