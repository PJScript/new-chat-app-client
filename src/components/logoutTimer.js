import React, { useEffect, useState, useRef } from "react"
import useStore from '../store/store'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const LogoutTimer = () => {
    // const sec = useStore((state)=>state.sec)
    // const setSec = useStore((state)=>state.setSec)
    const navigate = useNavigate();

    const [sec, setSec] = useState(600);

    const timeId = useRef(null)
    const SessionTimerReset = () => {
        const url = `http://localhost:8080/api/user/session`
        fetch(url,{
            method: 'GET',
            credentials: "include", // to send HTTP only cookies
            headers: { 'Content-Type': 'application/json' }
        }
            ).then((res) => {
            if (res.status === 200) {
                alert('로그인 연장 되었습니다')
                setSec(() => 600)
            }
        })
    }
    useEffect(() => {
        timeId.current = setInterval(() => {
            setSec((sec) => sec - 1)

        }, [1000])

        return () => {
            clearInterval(timeId.current)
        }
    }, [])

    useEffect(() => {

        if (sec <= 0) {
            clearInterval(timeId.current)
            navigate('/')
            let timer = setTimeout(() => {
                alert('세션 만료')
                return clearTimeout(timer)
            }, 1000)
        }
    }, [sec])

    return (<>
        <TimerWrapper>
            로그인 유효 시간 {sec} 초
            <ResetLoginTimer onClick={SessionTimerReset}>로그인 연장</ResetLoginTimer>

        </TimerWrapper>
    </>


    )
}

export default LogoutTimer

const TimerWrapper = styled.div`
  width:100%;
  height:auto;
  font-size:14px;
  color:gray;
  display:flex;
`

const ResetLoginTimer = styled.div`
  width:fit-content;
  /* height:20px; */
  display:flex;
  justify-content:center;
  align-items:center;
  color:black;
  font-weight:bold;
  margin-left:6px;

  &:hover{
    cursor:pointer;
  }
`

