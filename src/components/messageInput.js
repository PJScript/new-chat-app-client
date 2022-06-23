import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import styled from "styled-components"

export const MessageInputComponent = ({socket,setList}) => {

    const inputRef = useRef(null);
    const imgInputRef = useRef();
    const [file, setFile] = useState();

  const email = useStore((state) => state.email)
  const setEmail = useStore((state) => state.setEmail)
  const page = useStore((state) => state.page)
  const setPage = useStore((state) => state.setPage)
  const setSec = useStore((state) => state.setSec)
  const navigate = useNavigate()

  const [message, setMessage] = useState("")


    const onClickSubmit = async (e) => {
        if(message.length <= 0 && !file){
          alert('메시지를 입력하거나 파일을 업로드 해주세요')
          return;
        }
        
        if(file){
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
            if(res.status === 200){
              return res.json()
            }
          }).then( async (data) => {
          await socket.emit('img',{email:data.email,room:'normal', message:data.message,img_url:data.img_url,created_at:data.created_at})
            
        })      
          inputRef.current.value = ""
          imgInputRef.current.value = ""
          setFile()
        //   setScrollBottom(1)
    
        }else if(!file && message.length >= 0){
    
          const url = `http://localhost:8080/api/chat`
    
          const body = {
            message: message,
            room: "normal"
          }
      
          await socket.emit('message', { email: email, message: message, room: "normal" })
          fetch(url, {
            method: 'POST',
            credentials: "include", // to send HTTP only cookies
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          }).then((res) => {
            if (res.status !== 200) {
              navigate('/')
              setTimeout(() => {
                alert('세션이 만료 되었습니다')
      
              }, 1000)
            }
          }).catch((err) => {
            navigate('/')
            alert('세션이 만료 되었습니다')
          })
          inputRef.current.value = ""
        //   setScrollBottom(1)
        }
        
        else{
          alert('에러')
        }
    
       
    }
 const onChangeImg = (e) => {
    setFile(e.target.files[0])    
  }
  const onChangeMessage = (e) => {
    setMessage(e.target.value)
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

    return (
        <>
         <MessageInputBox>
            <MessageInput ref={inputRef} placeholder="메시지를 입력 해주세요" onChange={onChangeMessage} />
            <SubmitBtn onClick={onClickSubmit}>전송</SubmitBtn>
          </MessageInputBox>
          <FooterToolBox>
            <RemoveChatBtn onClick={onClickRmChat}>채팅 지우기</RemoveChatBtn>

            <ImageInputBox>
              <ClearFileBtn>파일 초기화</ClearFileBtn>
              <div class="button">
                {/* <label for="chooseFile">
            👉 이미지 업로드 👈
        </label> */}
              </div>
              <input ref={imgInputRef} type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={onChangeImg} />
            </ImageInputBox>
          </FooterToolBox>
        </>
       
    )
}


// export const MemoizedMessageInput = React.memo(MessageInputComponent)


const MessageInputBox = styled.div`
  display:flex;
  width:100%;
  height:auto;
  padding-bottom:10px;
  border-top:1px solid rgb(128,128,128,0.4);
  /* background:blue; */
`

const MessageInput = styled.textarea`
  width:100%;
  border-radius:4px;
  padding:10px;
  border:1px solid gray;
  min-height:70px;
  height:auto;
  margin-top:10px;
`

const SubmitBtn = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  font-weight:bold;
  width:80px;
  min-width: 80px;
  padding:10px;
  height:70px;
  margin-top:10px;
  margin-left:10px;
  border-radius:4px;
  background:yellow;
`


const FooterToolBox = styled.div`
  display:flex;
  margin-bottom:6px;
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

