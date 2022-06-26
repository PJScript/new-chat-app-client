import styled from "styled-components";


export const Layout = styled.div`
  width:100vw;
  height:100vh;
`

export const LayoutRow = styled.div`

`


export const InputBox = styled.div`
  width:100%;
  height:auto;
  margin-bottom:22px;
`

export const InputBoxTitle = styled.div`
  width:100%;
  font-size: 16px;
  font-weight:bold;
  margin-bottom:7px;

`

export const Input = styled.input`
  width:100%;
  height: 40px;
  /* outline:none; */
  border:1px solid gray;
  border-radius: 4px;
  padding:6px;
`


export const DefaultButton = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:50px;
  font-weight:bold;
  background:blue;
  color:white;
`




export const ChatBoxSystemDateItem = styled.div`
display:flex;
justify-content:center;
align-items:center;
  width:100%;
  height:50px;
  background:white;
  padding:10px;
  font-size:14px;
  font-weight:bold;
  color:gray;
`


export const ChatBoxChatItem = styled.li`
  display:flex;
  width:100%;
  height:auto;
  margin-bottom:10px;
  list-style:none;
`

export const ChatProfile = styled.img`

`

export const ChatDataBox = styled.div`
  width:100%;
  height:auto;
  display:flex;
  flex-direction:column;
  margin-left:10px;
  margin-bottom:10px;
`

export const ChatDataBoxUserInfo = styled.div`
  display:flex;
`
export const ChatDataBoxUserName = styled.div`
 font-weight:bold;
`

export const ChatDataBoxDate = styled.div`
margin-left:6px;
  color:gray;
  font-size:15px;

`

export const ChatDataBoxMsg = styled.div`
  background:whitesmoke;  //default other chat color
  /* background:rgb(220, 215, 201); */

  padding:10px;
  width:fit-content;
  border-radius: 4px;
  word-break: break-all;
  border:1px solid whitesmoke;

`

export const ChatDataBoxImg = styled.img`
  width:36%;
  height:auto;
  border:1px solid gray;
  @media screen and (max-width:768px){
    width:55%;
    height:auto;
  }
`


export const MyChatDataBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items: flex-end;
  width:100%;
  height:auto;
  margin-right:30px;
  margin-top:20px;

`

export const MyChatDataBoxMsg = styled.div`
  width:fit-content;
  max-width:50%;
  height:auto;
  padding:10px;
  word-break: break-all;

  background:rgb(254, 240, 27); // kakao yellow
background: rgb(55,27,88);
background: linear-gradient(137deg, rgba(55,27,88,0.4) 0%, rgba(15,0,249,0.4) 100%, rgba(255,255,255,0.22) 100%);
background: rgb(219,223,253);
border:1px solid rgb(219,223,253,0.2);

  /* padding-left:50%; */
  text-align:left;
  border-radius:4px;
`

export const MyChatDataBoxImg = styled.img`
    width:35%;
  height:auto;
  border:1px solid gray;
  @media screen and (max-width:768px){
    width:55%;
    height:auto;
  }
  border:1px solid gray;
`

export const MyChatDataBoxUserInfo = styled.div`
 width:fit-content;
 display:flex;
`

export const MyChatDataBoxUserName = styled.div`
  font-weight: bold;
  margin-left:20px;
`
export const MyChatDataBoxDate = styled.div`
  font-size:15px;
  color:gray;
`











