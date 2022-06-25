import React, { useState, useRef } from "react";
import styled from "styled-components";
import * as S from "../style/common"
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const email = useStore((state) => state.email)
    const setEmail = useStore((state) => state.setEmail)
    const password = useStore((state) => state.password)
    const setPassword = useStore((state) => state.setPassword)
    const nickname = useStore((state) => state.nickname)
    const setNickname = useStore((state) => state.setNickname)

    const [emailState, setEmailState] = useState(false)
    const [nicknameState, setNicknameState] = useState(false)
    const [passwordState, setPasswordState] = useState(false)

    const emailRef = useRef();
    const nicknameRef = useRef();
    const passwordRef = useRef();



    const clickSignup = () => {
        

        if (emailRef.current.value.length === 0) {
            emailRef.current.style.border = `1px solid orange`
            emailRef.current.placeholder = "이메일을 입력해주세요!"
            alert('이메일을 입력 해주세요')
            return;
        }
        if (nicknameRef.current.value.length === 0) {
            nicknameRef.current.style.border = `1px solid orange`
            nicknameRef.current.placeholder = "닉네임을 입력해주세요!"
            alert('닉네임을 입력 해주세요')
            return;
        }
        if (passwordRef.current.value.length === 0) {
            passwordRef.current.style.border = `1px solid orange`
            passwordRef.current.placeholder = "비밀번호를 입력해주세요!"
            alert('닉네임을 입력 해주세요')
            return;
        }

        const url = `http://api.rudydy.xyz:8080/api/user/signup`
        const body = {
            email: email,
            nickname: nickname,
            password: password
        }
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
        }).then(() => {

            navigate('/login')
            alert('회원 가입 완료')
            console.log('완료')
        })
            .catch((err) => {
                console.log(err, "에러")
            })







        console.log(emailRef.current.value)
        console.log(nicknameRef.current.value)
        console.log(passwordRef.current.value)

        console.log(body)
    }

    return (
        <S.Layout>
            <Inner>
                <LoginBox>
                    <LoginBoxTitle>회원 가입</LoginBoxTitle>
                    <S.InputBox>
                        <S.InputBoxTitle >이메일</S.InputBoxTitle>
                        <S.Input ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
                    </S.InputBox>
                    <S.InputBox>
                        <S.InputBoxTitle >닉네임</S.InputBoxTitle>
                        <S.Input ref={nicknameRef} onChange={(e) => setNickname(e.target.value)} />
                    </S.InputBox>
                    <S.InputBox>
                        <S.InputBoxTitle >비밀번호</S.InputBoxTitle>
                        <S.Input ref={passwordRef} onChange={(e) => setPassword(e.target.value)} />
                    </S.InputBox>
                    <S.DefaultButton className="hover" onClick={clickSignup}>회원 가입</S.DefaultButton>
                    <SignUpTextBox>
                        비밀번호를 잊지 않게 주의 해주세요
                    </SignUpTextBox>
                </LoginBox>
            </Inner>
        </S.Layout>
    )
}

export default Signup

const Inner = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100vh;
`

const LoginBox = styled.div`
  width:420px;
  height:auto;
  border:1px solid gray;
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