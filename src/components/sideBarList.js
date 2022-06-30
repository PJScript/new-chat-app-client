import React from "react";
import styled from "styled-components";

const SideBarList = () => {


    return(
<ChatSideBarLayout>
<ChatSideBarTitle>리스트</ChatSideBarTitle>

<ChatSideBarList>
<ChatSideBarItem >first</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >하이요</ChatSideBarItem>
<ChatSideBarItem >last</ChatSideBarItem>

<ChatSideBarFooter>리스트</ChatSideBarFooter>

      </ChatSideBarList>

</ChatSideBarLayout>
        
    )
}


export default SideBarList


const ChatSideBarLayout = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  position:relative;
  width:auto;
  min-width:350px;
  padding-top:40px;
  /* padding-bottom:70px; */
  border-right:1px solid rgb(128,128,128,0.4);
  /* border-radius:12px; */
  /* display:flex; */
  /* background:red; */
  /* overflow:hidden; */
  /* height:50px; */
  /* background:red; */
  @media screen and (max-width:768px){
    display:none;
  }
`


const ChatSideBarList = styled.ul`

  /* position:absolute; */
  /* position:relative; */
  /* display:flex; */
  z-index:1;
  /* justify-content:center; */
  align-items:center;

  /* justify-content:center; */
  /* align-items:center; */
  margin:0;
  padding:0;
  left:0;
  width:350px;
  overflow:scroll;
  height:calc(100% - 100px);

  /* height:calc(100% - 40px); */
  background:white;  
  /* padding-left:20px; */
  /* padding-right:20px; */
  border-right:1px solid rgb(128,128,128,0.4);

`

const ChatSideBarTitle = styled.div`
  width:349px;
  height:49px;
  background:white;
  color:black;
  /* background: black; */
  

  /* box-shadow:-6px 1px 10px 0px rgb(128,128,128,0.2); */
  /* border-bottom:1px solid rgb(128,128,128,0.4); */
  display:flex;
  justify-content:center;
  align-items:center;
  position:fixed;
  top:40px;
  z-index: 2;
  /* top:0; */
`


const ChatSideBarItem = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  color:rgb(128,128,128,0.4);
  height:50px;

  border-radius:12px;
  /* border-bottom:1px solid rgb(128,128,128,0.4); */
  /* transform:rotate(-75deg); */


  &:hover{
    background:rgb(128,128,128,0.3);
  }
`

const ChatSideBarFooter = styled.div`
  width:100%;
  height:51px;
  /* background:purple; */
  border-top:1px solid rgb(128,128,128,0.4);
  position:absolute;
  bottom:0;
`