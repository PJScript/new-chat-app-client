import styled from "styled-components";


export const Layout = styled.div`
  width:100vw;
  height:100vh;
`

export const LayoutRow = styled.div`
  display:flex;
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
  /* margin-bottom:10px; */
  list-style:none;
  margin-bottom:10px;
`

export const ChatProfile = styled.img`
  border:1px solid gray;
  margin-top:4px;
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
display:flex;
line-height:24px;
height:100%;
margin-left:6px;
  color:rgb(128,128,128,0.8);
  font-size:14px;

`

export const ChatDataBoxMsg = styled.div`
  /* background:whitesmoke;  //default other chat color */
  /* background:rgb(220, 215, 201); */

  padding-top:4px;
  width:fit-content;
  border-radius: 4px;
  word-break: break-all;
  /* border:1px solid whitesmoke; */
  font-weight:400;
  color:rgb(51,51,51,1);
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
  padding-right:0px;

  word-break: break-all;

  /* background:rgb(254, 240, 27); // kakao yellow */
/* background: rgb(55,27,88);
background: linear-gradient(137deg, rgba(55,27,88,0.4) 0%, rgba(15,0,249,0.4) 100%, rgba(255,255,255,0.22) 100%);
background: rgb(219,223,253); */
/* border:1px solid rgb(219,223,253,0.2); */

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
  color:rgb(128,128,128,0.8);
  font-size:14px;
`


export const FlexFullItem = styled.div`
  flex:1 1 0;
  /* background:red; */
  color:gray;
  text-align:right;
  padding-right:26px;
`











