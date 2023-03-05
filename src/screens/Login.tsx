import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="wrap">
            <header className="header">
                <div className="header_inner foot_logo">
                    <a href=""><h1>가계복</h1></a>
                </div>
            </header>
            <div className="container">
                <div className="content">
                    <div className="login_wrap card_box_theme_2">
                        <div className="login_inner">
                            <div className="title_wrap">
                            <a href="" className="logo"></a>
                            </div>
                            <form>
                                <div className="id_pw_wrap">
                                    <div className="input_row">
                                        <input className="input_text" type="text" placeholder="아이디" />
                                    </div>
                                    <div className="input_row">
                                        <input className="input_text" type="password" placeholder="비밀번호" />
                                    </div>
                                </div>
                                <div className="btn_login_wrap">
                                    <button className="btn_login btn_theme_1"><span className="btn_text">로그인</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    )
}

export default Login;