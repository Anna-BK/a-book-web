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
            <div id="profile_layer" className="naver_theme">
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
              <div id="content_body">
                <div id="grid_container">
                    <div id="grid_header"></div>
                    <div id="grid">
                      <table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>복이누나</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div id="grid_footer"></div>
                </div>
              </div>
              <div id="content_footer"></div>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default App;
