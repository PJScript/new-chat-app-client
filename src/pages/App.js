import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import * as S from "../style/common"
import useStore from "../store/store";

function App() {
  console.log = function no_console() {};
    console.warn = function no_console() {};
  const email = useStore((state) => state.email)
  const setEmail = useStore((state) => state.setEmail)
  const password = useStore((state)=>state.password)
  const setPassword = useStore((state)=>state.setPassword)

  const login = useStore((state) => state.login)
  const setLogin = useStore((state) => state.setLogin)



  const navigate = useNavigate()

  const inputEmail = (e) => {
    setEmail(e.target.value)
  }

  const inputPassword = (e) => {
    setPassword(e.target.value)
  }

  const clickLogin = () => {
    const url = `http://api.rudydy.xyz:8080/api/user/login`
    const body = {
      email:email,
      password:password
    }
    fetch(url,{
      method:'POST',
      credentials : "include", // to send HTTP only cookies
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(body)
    })
    .then((res)=> {
      if(res.status === 200){
        setLogin(true)
        navigate('/chat')
      }else if( res.status=== 401){
        navigate('/login')

        alert('허가 받지 않은 사용자 이거나 삭제된 사용자 입니다')
      }else{
        navigate('/login')
alert('알 수 없는 에러')
      }
    })}

    const onClickAdminBtn = () => {
navigate('/block')
    }

  useEffect(()=>{
    console.log(email)
  }, [email])

  useEffect(()=>{
    sessionStorage.setItem('p', Number(1))
  }, [])


  
  return (
  
  <S.Layout>
    <Inner>
      <LoginBox>
        <LoginBoxTitle>Secret Chat App</LoginBoxTitle>
        <S.InputBox>
          <S.InputBoxTitle >이메일</S.InputBoxTitle>
          <S.Input onChange={inputEmail}/>
        </S.InputBox>
        <S.InputBox>
          <S.InputBoxTitle >비밀번호</S.InputBoxTitle>
          <S.Input type="password" onChange={inputPassword}/>
        </S.InputBox>
        <S.DefaultButton className="hover" onClick={clickLogin}>로그인</S.DefaultButton>
        <SignUpTextBox>
          회원이 아니신가요?
          <SignUpText className="hover" onClick={() => navigate('/signup')}>회원 가입</SignUpText>
        </SignUpTextBox>
        <AdminText onClick={onClickAdminBtn}>관리자 페이지</AdminText>
      </LoginBox>
    </Inner>
  </S.Layout>
  );
}

export default App;


const Inner = styled.div`
  display:flex;
  overflow:scroll;
  justify-content:center;

  align-items:center;
  width:100%;
  height:100%;
  min-height:500px;
  @media screen and (max-width:768px){
  
  }

`

const LoginBox = styled.div`
  width:420px;
  height:auto;
  border:1px solid rgb(128,128,128,0.3);
  border-radius:4px;
  padding:8px;
  
`

const LoginBoxTitle = styled.div`
  font-size:24px;
  font-weight:bold;
  text-align:center;
`

const SignUpTextBox = styled.div`
  display:flex;

  color:gray;
  font-size:14px;
  margin-top:10px;
`
const SignUpText = styled.div`
  margin-left:10px;
  font-weight:bold;
  color:blue;
`

const AdminText = styled.div`
  font-size:14px;
  font-weight:bold;
  color:gray;
  margin-top:10px;
  &:hover{
    cursor: pointer;;
  }

`


