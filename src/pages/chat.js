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
  //prev chat request
  // useEffect(() => {
  //   const url = `http://localhost:8080/api/chat/morechat?page=1`
  //   // const body = {
  //   //   email:email,
  //   //   password:password
  //   // }
  //   fetch(url, {
  //     method: 'GET',
  //     credentials: "include", // to send HTTP only cookies
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         navigate('/login')
  //         setTimeout(() => {
  //           alert('로그인 후 이용 할 수 있습니다')
  //         }, 1000)

  //       } else {
  //         return res.json();
  //       }
  //     }).then(async (data) => {
  //       if (data.data.length === 0) {
  //         alert('데이터가 더 이상 없습니다!')

  //         sessionStorage.setItem('p', Number(1))

  //         // setIsLoading(true);
  //       } else {
  //         await setList(data.data)
  //         await listBottomRef.current?.scrollIntoView();
  //         setEmail(data.email)
  //         console.log(data.data)
  //       }
  //     })

  // }, [])


  // useEffect(() => {
  //   if(!login){
  //     window.location.replace('/')
  //     alert('로그인 후 이용할 수 있습니다')
  //   }
  // }, [])


 

  return (
    <S.Layout>
      <ChatInner>
<SideBarServerList>하이요</SideBarServerList>

      <Modal />
      <SideBarList />

          <ChatList/>

          {/* <WindowScroller> */}

          {/* {({ height, scrollTop, isScrolling, onChildScroll }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                ref={listRef}
                                autoHeight
                                height={height}
                                width={width}
                                isScrolling={isScrolling}
                                overscanRowCount={0}
                                onScroll={onChildScroll}
                                scrollTop={scrollTop}
                                rowCount={posts.length}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                                deferredMeasurementCache={cache}
                            />
                        )}
                    </AutoSizer>
                )} */}



          {/* </WindowScroller> */}
         

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












