import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from '../style/common'
import useStore from "../store/store";
const Header = () => {
    const navigate = useNavigate()
    const email = useStore((state) => state.email)
    const setEmail = useStore((state) => state.setEmail)
    const login = useStore((state) => state.login)
    const setLogin = useStore((state) => state.setLogin)


    const onClickLogout = () => {
        if(!login){
            navigate('/login')
            return;
        }

const url = `http://api.rudydy.xyz:8080/api/user/logout`

if(email.length > 0){
    fetch(url,{
        method:'GET',
  credentials : "include", // to send HTTP only cookies
  headers: {'Content-Type': 'application/json'},
    })
    .then(()=>{
 setLogin(false)
 navigate('/login')
 setTimeout(()=>{
    alert('로그아웃')

 },1000);
    })
}else{
    navigate('/login')
}
}

// useEffect(()=>{
//     console.log(email)
//     },[email])

useEffect(()=>{
  console.log(login,"로그인")
}, [login])
    return (
        <HeaderLayout>
            <HeaderList>
                <HeaderItem onClick={() =>navigate('/chat')}>채팅</HeaderItem>
                <HeaderItem onClick={() =>navigate('/login')}>홈</HeaderItem>
                <HeaderItem onClick={onClickLogout}>
                    {login ? "로그아웃":
                    "로그인"
                }
                    </HeaderItem>
            </HeaderList>

        </HeaderLayout>
    )
}

export default Header

const HeaderLayout = styled.div`
  position:fixed;
  top:0;
  z-index: 999;
  width:100%;
  height:40px;
  background:rgb(74,21,75);
`


const HeaderList = styled.ul`
 width:100%;
 height:100%;
  list-style:none;
  margin:0;
  padding:0;
  display:flex;
  justify-content:space-between;
  padding-left:20px;
  padding-right:20px;
  align-items:center;
`

const HeaderItem = styled.li`
display:flex;
align-items:center;
justify-content:center;
min-width:100px;
  height:100%;
  color:white;
  font-weight:bold;
  /* background:green; */
  &:hover{
    background:orange;
    cursor:pointer;
  }
`

