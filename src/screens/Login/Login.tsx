import { gql, useMutation} from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { logUserIn } from '../../apollo';
import PageTitle from '../../components/PageTitle';

import './Login.css';

type Inputs = {
    id: string,
    password: string,
};


function Login() {
    const location = useLocation();
    const navigate = useNavigate();


    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        mode: "onSubmit"
    });
    const onSubmit: SubmitHandler<Inputs> = function (data) {
        //console.log(data);
        const { id, password } = data;

        login({
            variables : {
                username : id,
                password
            }
        })
        
    };

    const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          ok
          error
        }
      }`;

    const [login , {loading}] = useMutation(LOGIN, {
        onCompleted : function(data) {
            console.log('onCompleted', data);
            const { login : { ok, error, token } } = data;

            // token 있는 경우 (사용자 정보 일치)
            if(ok && token){
                console.log('ok')
                // 로그인 (token 저장)
                logUserIn(token);
                

                // 바로 /login 요청한 경우의 처리 
                if(!location.state){
                    navigate("/");
                    return;
                }
                // 원래 요청한 페이지로 이동
                navigate(location.state.from.pathname);
                
                
            }

            if(!ok && error){
                //에러 메시지 출력
            }
            
        }
    });



    //console.log(watch());
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
                                        <div className={"input_row" + (errors.id ? " focus" : "")}>
                                            <input className="input_text" type="text" placeholder="아이디" {...register("id", { required: true })} />
                                        </div>
                                        <div className={"input_row" + (errors.password && !errors.id ? " focus" : "")}>
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