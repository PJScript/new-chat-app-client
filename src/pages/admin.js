import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import * as S from "../style/common"

const Admin = () => {
    const [permitUsers, setPermitUsers] = useState();
    const [deniedUsers, setDeniedUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [pw, setPw] = useState();

    const onClickPermit = (e) => {
        const permitUrl = `http://localhost:8080/api/admin/permit`

        const id = Number(e.target.getAttribute('id'))

        if (!window.confirm(`${deniedUsers[id].email} 유저를 정말 허가 하시겠습니까?`)) {
            return;
        }


        const body = {
            email: deniedUsers[id].email
        }



        fetch(permitUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                console.log(data)
            })
    }

    const onClickDenied = (e) => {
        const deniedUrl = `http://localhost:8080/api/admin/denied`
        const id = Number(e.target.getAttribute('id'))


        if (!window.confirm(`${permitUsers[id].email} 유저를 정말 비허가 하시겠습니까?`)) {
            return;
        } else {
            if (permitUsers[id].email === 'admin') {
                alert('관리자용 계정은 비허가 할 수 없습니다')
                return;
            }
        }


        const body = {
            email: permitUsers[id].email
        }
        fetch(deniedUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                console.log(data)
            })
    }

    const onClickPermitUserDelete = (e) => {

        const deleteUrl = `http://localhost:8080/api/admin/rm`
        const id = Number(e.target.getAttribute('id'))
        console.log(id, "아이디")

        if (!window.confirm(`${permitUsers[id].email} 유저를 정말 삭제 하시겠습니까? 삭제시 되돌릴 수 없습니다`)) {
            return;
        } else {
            if (permitUsers[id].email === 'admin') {
                alert('관리자용 계정은 삭제 할 수 없습니다')
                return;
            }
        }


        const body = {
            email: permitUsers[id].email
        }

        fetch(deleteUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                console.log(data)
            })
    }

    const onClickDeniedUserDelete = (e) => {
        const deleteUrl = `http://localhost:8080/api/admin/rm`
        const id = Number(e.target.getAttribute('id'))

        if (!window.confirm(`${deniedUsers[id].email} 유저를 정말 삭제 하시겠습니까? 삭제시 되돌릴 수 없습니다`)) {
            return;
        }

        const body = {
            email: permitUsers[id].email
        }

        fetch(deleteUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                console.log(data)
            })
    }

    const submitPwChange = () => {
        const url = `http://localhost:8080/api/admin/password`
        const body = {
            password: pw
        }
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then((data) => {
            if (data.status !== 200) {
                alert('알 수 없는 오류')
                navigate('/')
            } else {
                alert('비밀번호가 정상적으로 변경 되었습니다.')

            }

        })
    }


    const onClickAllChatClear = () =>{
        const allClearUrl = `http://localhost:8080/api/admin/clearchat`


        if (!window.confirm(`정말 모든 유저의 채팅을 지우시겠습니까?`)) {
            return;
        }

        fetch(allClearUrl, {
            method: 'get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                console.log(data)
            })
    }
    
    const onClickAllChatClearUndo = () => {
        const allClearUrl = `http://localhost:8080/api/admin/undochat`


        if (!window.confirm(`정말 되돌리시겠습니까?`)) {
            return;
        }
        fetch(allClearUrl, {
            method: 'get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.reload();
                console.log(data)
            })
    }


    useEffect(() => {
        const url = `http://localhost:8080/api/admin/check`
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => {
                if (res.status === 401) {
                    navigate('/')
                } else if (res.status === 404) {
                    navigate('/')
                }
                else {
                    setIsLoading(false)
                    navigate('/admin')
                    // window.location.replace('/')
                    // alert('접근 거부')
                }
            })
    }, [])

    useEffect(() => {
        const permitUrl = `http://localhost:8080/api/admin/permituser`
        const deniedUrl = `http://localhost:8080/api/admin/denieduser`
        fetch(permitUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPermitUsers(data);
            })

        fetch(deniedUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDeniedUsers(data);
            })
    }, [])

    return (

        <S.Layout>
            {isLoading === false ?
                <Inner>

                    <AllUserList>
                        <h1>관리자 페이지</h1>

                        <AllUserItem>
                            <div>비허가 유저</div>

                            <ul>
                                {deniedUsers ?

                                    deniedUsers.map((item, idx) => {
                                        return (
                                            <SignUserItem key={idx} idx={idx}>
                                                <div>{item.email}</div>
                                                <div>
                                                    <AdminButton onClick={onClickPermit} id={idx}>허가</AdminButton>

                                                    <AdminButton onClick={onClickDeniedUserDelete} id={idx}>삭제</AdminButton>
                                                </div>
                                            </SignUserItem>

                                        )
                                    })
                                    : ""}

                            </ul>
                        </AllUserItem>
                        <AllUserItem>
                            <div>허가된 유저</div>
                            <ul>
                                {!permitUsers ? "" : permitUsers.map((item, idx) => {
                                    return (
                                        <SignUserItem key={idx} id={idx}>
                                            <div>{item.email}</div>
                                            <div>
                                                <AdminButton id={idx} onClick={onClickDenied}>비허가</AdminButton>
                                                <AdminButton id={idx} onClick={onClickPermitUserDelete} >삭제</AdminButton>
                                            </div>
                                        </SignUserItem>
                                    )
                                })}

                            </ul>
                        </AllUserItem>
                    </AllUserList>
                    <AllUserList>
                        <AllUserItem>
                            <ClearAllChatBtn onClick={onClickAllChatClear}>모든 유저 채팅 지우기</ClearAllChatBtn>
<ClearAllChatUndoBtn onClick={onClickAllChatClearUndo}>모든 유저 채팅 되돌리기</ClearAllChatUndoBtn>
                        </AllUserItem>
                    </AllUserList>
                    <AdminPasswordBox>
                        <div>
                            관리자 비밀번호 변경

                        </div>
                        <input onChange={(e) => setPw(e.target.value)}></input>
                        <button onClick={submitPwChange}>변경하기</button>
                    </AdminPasswordBox>
                </Inner>
                :
                <div></div>
            }


        </S.Layout>
    )
}

export default Admin


const Inner = styled.div`
  width:100%;;
  height:auto;
  min-height:500px;

  /* background:red; */
`


const AllUserList = styled.div`
 text-align: center;
padding: 15px 0px 50px;
/* background:rgb(135, 206, 235,0.05); */
margin-top:0;
height:90%;
`
const AllUserItem = styled.div`
position: relative;
    padding: 32px 35px;
    box-sizing: border-box;
    width:40%;
    height: 90%;
    min-height:500px;
    vertical-align: top;
    margin: 20px 15px;
    background-color: #ffffff;
    display: inline-block;
    text-align: left;
    box-shadow: 0px 0px 30px rgb(128,128,128,0.2);

    @media screen and (max-width:768px){
      width:90%;
    }
`


const SignUserItem = styled.li`
  margin-bottom:1px;
  border-bottom: 1px solid rgb(128,128,128,0.5);
  display:flex;
  justify-content: space-between;
  padding:10px;
`

const AdminButton = styled.span`
   /* width:100px; */
   padding:4px;
   height:50px;
   margin-left:10px;
   border-radius:4px;
   border:1px solid black;

   &:hover{
    cursor:pointer;
   }
`

const AdminPasswordBox = styled.div`
width:100%;
padding:20px;
`


const ClearAllChatBtn = styled.div`
  width:100%;
  height:40px;
  display:flex;
  justify-content:center;
  align-items:center;
  background:orange;
  margin-bottom:10px;

  &:hover{
    cursor:pointer;
  }
`

const ClearAllChatUndoBtn = styled.div`
  width:100%;
  height:40px;
  display:flex;
  justify-content:center;
  align-items:center;
  background:red;
  &:hover{
    cursor:pointer;
  }
`
