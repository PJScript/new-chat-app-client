import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import styled from "styled-components"

export const MessageInputComponent = ({ socket, setList }) => {

    const inputRef = useRef(null);
    const imgInputRef = useRef();
    const [file, setFile] = useState();

    const email = useStore((state) => state.email)
    const setEmail = useStore((state) => state.setEmail)
    const nickname = useStore((state) => state.nickname)
    const setNickname = useStore((state) => state.setNickname)


    const page = useStore((state) => state.page)
    const setPage = useStore((state) => state.setPage)
    const setSec = useStore((state) => state.setSec)
    const navigate = useNavigate()

    const [message, setMessage] = useState("")



    const keyDownSubmit = useCallback((e) => {
        console.log(e.code, "zhem")
        console.log(message)
        if (e.code !== 'Enter') {
            return;
        } else {
            onClickSubmit()
        }

    }, [message, file])

    const onClickSubmit = async (e) => {
        console.log(message, "메세지")
        if (message.length <= 1 && !file) {
            alert('메시지를 입력하거나 파일을 업로드 해주세요')
            return;
        }
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            if (!file) {
                alert('이미지를 선택 해주세요')
                return;
            }
            // e.preventDefault()

            fetch('http://localhost:8080/api/chat/image', { // Your POST endpoint
                method: 'POST',
                credentials: "include",
                body: formData
            }).then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
            }).then(async (data) => {
                await socket.emit('img', { email: data.email, nickname: nickname, room: 'normal', message: data.message, img_url: data.img_url, created_at: data.created_at })

            })
            inputRef.current.value = ""
            imgInputRef.current.value = ""
            setFile()
            setMessage("")
            //   setScrollBottom(1)

        } else if (!file && message.length >= 0) {

            const url = `http://localhost:8080/api/chat`

            const body = {
                message: message,
                room: "normal"
            }

            await socket.emit('message', { email: email, nickname: nickname, message: message, room: "normal" })
            fetch(url, {
                method: 'POST',
                credentials: "include", // to send HTTP only cookies
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then((res) => {
                if (res.status !== 200) {
                    navigate('/login')
                    setTimeout(() => {
                        alert('세션이 만료 되었습니다')

                    }, 1000)
                }
            }).catch((err) => {
                navigate('/login')
                alert('세션이 만료 되었습니다')
            })
            //   setScrollBottom(1)
            inputRef.current.value = ""
            imgInputRef.current.value = ""
            setFile()
            setMessage("")
        }

        else {
            alert('에러')
        }


    }
    const onChangeImg = (e) => {
        setFile(e.target.files[0])
    }
    const onChangeMessage = (e) => {
    }
    const onClickRmChat = () => {
        const url = `http://localhost:8080/api/chat/removechat`
        if (window.confirm('정말 채팅을 지우시겠습니까?')) {
            fetch(url, {
                method: 'GET',
                credentials: "include", // to send HTTP only cookies
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                })
            setList([]);
        }
    }

    useEffect(() => {
        if (file) {
            inputRef.current.focus()
        }
        window.addEventListener('keyup', keyDownSubmit)

        return () => window.removeEventListener('keyup', keyDownSubmit)

    }, [message, file])
    
    return (
        <>
            <MessageInputBox>
                <MoreToolBox> + </MoreToolBox>
                <MessageInput onKeyDown={(e) => e.key === 'Enter' ? e.preventDefault() : ""} ref={inputRef} placeholder="메시지를 입력 해주세요" onChange={(e) => setMessage(e.target.value)} />
                <SubmitBtn onClick={onClickSubmit} onKeyDown={onClickSubmit}>전송</SubmitBtn>
            </MessageInputBox>
            {/* <FooterToolBox>
                <RemoveChatBtn onClick={onClickRmChat}>채팅 지우기</RemoveChatBtn>

                <ImageInputBox>
                    <input ref={imgInputRef} onKeyDown={(e) => e.key === 'Enter' ? e.preventDefault() : ""} type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={onChangeImg} />
                </ImageInputBox>
            </FooterToolBox> */}
        </>

    )
}


export const MemoizedMessageInput = React.memo(MessageInputComponent)



const MoreToolBox = styled.div`
  display:flex;
  height:100%;
  margin-top:10px;
  padding:10px;
  font-size:20px;
  font-weight:bold;
  border:2px solid rgb(128,128,128,0.6);
  margin-right:4px;
  border-radius:4px;

  justify-content:center;
  align-items:center;
`
const MessageInputBox = styled.div`
  display:flex;
  width:100%;
  height:50px;
  padding-bottom:10px;
  margin-bottom:30px;
  border-top:1px solid rgb(128,128,128,0.4);
  /* background:blue; */
`

const MessageInput = styled.textarea`
  width:100%;
  border-radius:4px;
  padding:10px;
  border:2px solid rgb(128,128,128,0.6);
  min-height:40px;
  height:auto;
  margin-top:10px;
  resize:none;
`

const SubmitBtn = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  font-weight:bold;
  width:60px;
  min-width: 40px;
  padding:10px;
  height:40px;
  margin-top:10px;
  margin-left:10px;
  border-radius:4px;
  background:yellow;
`


const FooterToolBox = styled.div`
  display:flex;
  margin-bottom:6px;
  font-size:14px;
  margin-top:2px;
  overflow:hidden;
`


const RemoveChatBtn = styled.div`
  width:100px;
  min-width:70px;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  /* padding:6px; */
  background:rgb(74,21,75,0.6);
  border-radius:4px;
  margin-right:10px;
  &:hover{
    cursor:pointer;
  }
`


const ImageInputBox = styled.div`
display:flex;
align-items:center;
  width:fit-content;
  overflow:hidden;
  height:100%;
  min-height:30px;
`

const ClearFileBtn = styled.div`
  width:100px;
  min-width:70px;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  /* padding:6px; */
  background:rgb(128,128,128,0.7);
  border-radius:4px;
  margin-right:4px;
  &:hover{
    cursor:pointer;
  }
`

