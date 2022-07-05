import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import * as S from "../style/common"
import styled from "styled-components"
import useStore from '../store/store'
import dateFixer from '../hooks/dateFixer'
import { MemoizedMessageInput, MessageInputComponent } from "../components/messageInput";
import { WindowScroller, CellMeasurer, CellMeasurerCache, AutoSizer, List, ListRowProps } from 'react-virtualized';
import ChatList from '../components/chatList'
import Modal from '../components/modal'
import SideBarServerList from "../components/sideBarServerList";

import SideBarList from "../components/sideBarList";


const Chat = () => {
  const login = useStore((state) => state.login)
  



  return (
    <S.Layout>
      <ChatInner>


      <Modal />
          <ChatList/>
      </ChatInner>
    </S.Layout>
  )
}

export default Chat

//rgb(74,21,75)
const ChatInner = styled.div`
 width:100%;
 height:100%;
 /* margin-top:40px; */
 /* position:relative; */
 display:flex;

`

const ChatHeader = styled.div`
  position:absolute;
  top:0;
  z-index: 999;
  width:100%;
  height:40px;
  /* background:rgb(74,21,75); */

`






// const ChatBodyMsgInputBox = styled.div`
//   display:flex;
//   flex-direction:column;
//   width:100%;
//   height:100%;
// `












