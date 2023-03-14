import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PageTitle from '../../components/PageTitle';

import './Login.css';

type Inputs = {
    id: string,
    password: string,
};


function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        mode: "onSubmit"
    });
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    console.log(watch());
    return (
        <>
            <PageTitle title='로그인' />
            <div className="wrap">
                <header className="header">
                    <div className="header_inner">
                        <a href=""><h1>  </h1></a>
                    </div>
                </header>
                <div className="container">
                    <div className="content">
                        <div className="login_wrap card_box_theme_2">
                            <div className="login_inner">
                                <div className="title_wrap">
                                    <a href="" className="logo"></a>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="id_pw_wrap">
                                        <div className={"input_row" + (errors.id? " focus" : "")}>
                                            <input className="input_text" type="text" placeholder="아이디" {...register("id", { required: true })} />
                                        </div>
                                        <div className={"input_row" + (errors.password && !errors.id? " focus" : "")}>
                                            <input className="input_text" type="password" placeholder="비밀번호" {...register("password", { required: true })} />
                                        </div>
                                    </div>
                                    <div className="login_error_wrap">
                                        {errors.id && <span>아이디를 입력하세요</span>}
                                        {errors.password && !errors.id && <span>비밀번호를 입력하세요</span>}
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
        </>
    )
}

export default Login;