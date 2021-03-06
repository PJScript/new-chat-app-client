import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import * as S from "../style/common"
import styled from "styled-components"
import io from 'socket.io-client'
import useStore from '../store/store'
import { useNavigate } from "react-router-dom";
import dateFixer from '../hooks/dateFixer'
import Modal from '../components/modal'
import { MemoizedMessageInput,MessageInputComponent } from "../components/messageInput";
import {WindowScroller, CellMeasurer, CellMeasurerCache, AutoSizer, List, ListRowProps} from 'react-virtualized';
import LogoutTimer from '../components/logoutTimer'
import human from "../assets/account.png"

let socket
const Chat = () => {
  const email = useStore((state) => state.email)
  const setEmail = useStore((state) => state.setEmail)
  const page = useStore((state) => state.page)
  const setPage = useStore((state) => state.setPage)
  const navigate = useNavigate()

  const [list, setList] = useState([])
  const scrollBottom = useStore((state) => state.scrollBottom)
  const setScrollBottom = useStore((state) => state.setScrollBottom)
  const [scrollTop, setScrollTop] = useState(false)

  const [newMessage, setNewMessage] = useState();
  const [newMessageAlert, setNewMessageAlert] = useState(0);
  const [imgLoad, setImgLoad] = useState(0)
  
  const [moreMessageLoading, setMoreMessageLoading] = useState(true)

  const listBottomRef = useRef(null)
  const listTopRef = useRef(null)
  const listRef = useRef(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState();

  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState(false)
  const [img_url, setImg_url] = useState('')

  const [isRender, setIsRender] = useState(false);



  const socketListener = (scrollBottom)=>{
    let name = sessionStorage.getItem("name")
    socket.emit('user-info', { email: email, system: "connection" })
    socket.on('user-info', (data) => {
      console.log(data)
    })
    socket.on("broadcast-message", (data) => {
      
      
        

      console.log(data)
      console.log(list,"?????????")
      setList((list) => list.length >= 50 ? [...list.slice(1,list.length), data] : [...list, data] )
    })
    socket.on("broadcast-image", (data) => {
      setList((list) => [...list, data]);
    })
    socket.on("session-expired", () => {
      navigate('/')
      alert('?????? ?????? ????????? ????????? ???????????? ?????? ?????????')
    })
    socket.on("disconnect", () => {
      console.log("disconnect")
    })
  }
  

  

  const MoreMessage = () => {
    setMoreMessageLoading(true)
    if(!isLoading){
      alert('???????????? ??? ?????? ????????????.')
      return;
    }

    const url = `http://localhost:8080/api/chat/morechat?page=${Number(sessionStorage.getItem('p'))}`
    fetch(url, {
      method: 'GET',
      credentials: "include", // to send HTTP only cookies
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json())
      .then((data) => {
        if (data.data.length === 0) {
          alert('??? ?????? ????????? ?????????!')
          setMoreMessageLoading(false)
          setScrollTop(false)

        } else {
          const nextPage = sessionStorage.setItem('p', Number(sessionStorage.getItem('p')) + 1)
          setPage(nextPage)
          setList((list) => [...data.data, ...list]);
          setPrevScrollHeight(listRef.current.scrollHeight)
          setScrollTop(false)
          setMoreMessageLoading(false)

        }
        console.log(data)
      })

    // setIsLoading(true)
  }

  

 

  // scrollBottom 
  useEffect( () => {
    let who
  
    if(list.length > 0 && !scrollTop){
      who = list[list.length-1].email
      console.log(email)
      console.log(who)
      console.log(email === who)
    }

    if(scrollBottom || who === email){
      console.log('??????')
      listBottomRef.current?.scrollIntoView({hehavior:'smooth'});
      setNewMessageAlert(0);

    } else{
      // listBottomRef.current.scrollTo(0, listBottomRef.current.scrollHeight);
      setNewMessageAlert(1)
    }

    if(list.length > 0){
      setTimeout(()=>{
        setIsLoading(() => true)
      },1500)
    }
    


  }, [list])


  // inverse infinity scroll element size fix
  useEffect(() => {
    if (prevScrollHeight) {
      console.log(prevScrollHeight, "?????? ?????????")
      listRef.current.scrollTo(0, listRef.current.scrollHeight - prevScrollHeight + 20);
    }

  }, [scrollTop])


  // chat scrolling after image load
  useEffect(()=>{
    if(imgLoad){
      listBottomRef.current?.scrollIntoView({hehavior:'smooth'});
      setImgLoad(0);
    }
  }, [imgLoad])

  // socket connect
  useEffect(() => {
    socket = io.connect('http://localhost:8080')
    sessionStorage.setItem('p', 2)
    socketListener()

    return () => {
      console.log('????????????')
    }
  }, [])

 


  //scroll bottom intersection observe
 const onIntersectBottom = async ([entry],observer) => {
      // let scroll = data[0].intersectionRatio
      setScrollBottom(entry.isIntersecting)

      if (entry.isIntersecting) {
        listBottomRef.current?.scrollIntoView();
        
        observer.unobserve(entry.target);

        observer.observe(entry.target);
      }
      
    }
  useEffect(() => {
    const observerBottom = new IntersectionObserver(onIntersectBottom, { threshold: 0.5 });
    observerBottom.observe(listBottomRef.current);

    return () => observerBottom.disconnect()
  }, []);


  //scroll top intersection observe
  const onIntersectTop = async ([entry],observer) => {
      if (!entry.isIntersecting) {
        observer.unobserve(entry.target);
        observer.observe(entry.target);
      }else{
          MoreMessage();
      }
  }


  const onClickImage = (e) => {
    const id = e.target.getAttribute('id')
    console.log(list[id])
    
    console.log(view)
    setImg_url(list[id].img_url)
    setView(!view)
  }
  

   useEffect(() => {
    if(isLoading){
      const observerTop = new IntersectionObserver(onIntersectTop);
      observerTop.observe(listTopRef.current);
  
      return () => observerTop.disconnect()
    }
    
  }, [isLoading]);


  //prev chat request
  useEffect(() => {
    const url = `http://localhost:8080/api/chat/morechat?page=1`
    // const body = {
    //   email:email,
    //   password:password
    // }
    fetch(url, {
      method: 'GET',
      credentials: "include", // to send HTTP only cookies
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (res.status !== 200) {
          navigate('/')
          setTimeout(() => {
            alert('????????? ??? ?????? ??? ??? ????????????')
          }, 1000)

        } else {
          return res.json();
        }
      }).then(async (data) => {
        if(data.data.length === 0){
          alert('???????????? ??? ?????? ????????????!')

        sessionStorage.setItem('p', Number(1))

          // setIsLoading(true);
        }else{
          await setList(data.data)
          await listBottomRef.current?.scrollIntoView();
          setEmail(data.email)
          console.log(data.data)
        }

        
       
      })

  }, [])


  // useEffect(() => {
  //   console.log(isLoading)
  // }, [isLoading])

  const detectMobileKeyboard = (e) => {
    if(document.activeElement.tagName === 'INPUT'){
      listBottomRef.current?.scrollIntoView();
    }
    console.log('resize')
  }


  useLayoutEffect(()=>{
    console.log('test')
    window.addEventListener("rezise",detectMobileKeyboard)
    return () => window.removeEventListener("resize",detectMobileKeyboard)
  
  }, [])

  return (
    <S.Layout>
      <Modal view={view} setView={setView} img={img_url} />
      <ChatInner>
        <ChatSideBar>
<ChatSideBarItem>Secret Chat App</ChatSideBarItem>
        </ChatSideBar>

        <ChatListWrapper>
          <ChatBoxChatList ref={listRef} >
            {moreMessageLoading === true ?
              <TopLoadingBox>???????????? ???????????? ???..</TopLoadingBox>
              :
              <div style={{ height: '20px' }}></div>
            }
            <ScrollTopTargetBox isLoading={isLoading} ref={listTopRef}></ScrollTopTargetBox>

            {list.map((item, idx) => {
              if(item.email === "system date"){
                return (
                  <ChatBoxSystemDateItem>
                  {dateFixer(item.created_at)}
                </ChatBoxSystemDateItem>
                )
              }else if(item.email === "system alert"){
         <div>????????? ??????</div>
              }
              if (item.email !== email) {
                if (item.img_url) {
                  return (
                    <ChatBoxChatItem key={idx}>
                      <ChatProfile src={require('../assets/account.png')} width="40px" height="40px"></ChatProfile>
                      <ChatDataBox>
                        <ChatDataBoxUserInfo>
                          <ChatDataBoxUserName>{item.nickname}</ChatDataBoxUserName>
                          <ChatDataBoxDate>
                            {dateFixer(item.created_at)}
                          </ChatDataBoxDate>
                        </ChatDataBoxUserInfo>
                        <ChatDataBoxImg  id={idx} onClick={onClickImage} onLoad={() => setImgLoad(1)} src={item.img_url} />
                      </ChatDataBox>
                    </ChatBoxChatItem>
                  )
                }else{
                  return (
                    <ChatBoxChatItem key={idx}>
                      <ChatProfile src={require('../assets/account.png')} width="40px" height="40px"></ChatProfile>
                      <ChatDataBox>
                        <ChatDataBoxUserInfo>
                          <ChatDataBoxUserName>{item.nickname}</ChatDataBoxUserName>
                          <ChatDataBoxDate>
                            {dateFixer(item.created_at)}
                          </ChatDataBoxDate>
                        </ChatDataBoxUserInfo>
                        <ChatDataBoxMsg>{item.message}</ChatDataBoxMsg>
                      </ChatDataBox>
                    </ChatBoxChatItem>
                  )
                }
                
              } else {
                if (item.img_url) {

                  return (
                    <ChatBoxChatItem key={idx}>
                      <MyChatDataBox>
                        <MyChatDataBoxUserInfo>
                          <MyChatDataBoxDate>{dateFixer(item.created_at)}</MyChatDataBoxDate>
                          <MyChatDataBoxUserName>???</MyChatDataBoxUserName>
                        </MyChatDataBoxUserInfo>
                        <MyChatDataBoxImg  id={idx} onClick={onClickImage} onLoad={() => setImgLoad(1)} src={item.img_url} />
                      </MyChatDataBox>
                    </ChatBoxChatItem>
                  )
                }else{

                  return (
                    <ChatBoxChatItem key={idx}>
                      <MyChatDataBox>
                        <MyChatDataBoxUserInfo>
                          <MyChatDataBoxDate>
                            {dateFixer(item.created_at)}  </MyChatDataBoxDate>
                          <MyChatDataBoxUserName>???</MyChatDataBoxUserName>
                        </MyChatDataBoxUserInfo>
                        <MyChatDataBoxMsg>{item.message}</MyChatDataBoxMsg>
                      </MyChatDataBox>
                    </ChatBoxChatItem>
                  )
                }
              }
            })}
            <ScrollBottomTargetBox ref={listBottomRef}></ScrollBottomTargetBox>
          </ChatBoxChatList>

          <NewMessageAlert scroll={newMessageAlert}>????????? ?????????!</NewMessageAlert>
<LogoutTimer></LogoutTimer>
          <MessageInputComponent socket={socket} setList={setList}/>

        </ChatListWrapper>
      </ChatInner>
    </S.Layout>
  )
}

export default Chat

//rgb(74,21,75)
const ChatInner = styled.div`
 width:100%;
 height:100vh;
 position:relative;
`

const ChatHeader = styled.div`
  position:absolute;
  top:0;
  z-index: 999;
  width:100%;
  height:40px;
  background:rgb(74,21,75);
`
const ChatSideBar = styled.div`
  position:absolute;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  left:0;
  width:200px;
  height:100vh;
  background:rgb(74,21,75,0.9);
  
  @media screen and (max-width:768px){
    display:none;
  }
`

const ChatSideBarItem = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:250px;
  color:rgb(128,128,128,0.4);
  height:fit-content;
  padding-bottom:50px;
  font-size:33px;
  transform:rotate(-75deg);
`

const ChatListWrapper = styled.div`
  display:flex;
  flex-direction:column;
  padding-top:60px;
  padding-left:220px;
  padding-right:20px;
  /* background:blue; */
  width:100%;
  height:100vh;
  @media screen and (max-width:768px){
    padding-left:20px;
    padding-right:10px;
  }
`



// const ChatBodyMsgInputBox = styled.div`
//   display:flex;
//   flex-direction:column;
//   width:100%;
//   height:100%;
// `

const ChatBoxChatList = styled.ul`
  position:relative;
  width:100%;
  height:100%;
  margin:0;
  padding:0;
  list-style:none;
  overflow-y:scroll;
`

const ChatBoxChatItem = styled.li`
  display:flex;
  width:100%;
  height:auto;
  margin-bottom:10px;
  list-style:none;
`

const ChatProfile = styled.img`

`

const ChatDataBox = styled.div`
  width:100%;
  height:auto;
  display:flex;
  flex-direction:column;
  margin-left:10px;
  margin-bottom:10px;
`

const ChatDataBoxUserInfo = styled.div`
  display:flex;
`
const ChatDataBoxUserName = styled.div`
 font-weight:bold;
`

const ChatDataBoxDate = styled.div`
margin-left:6px;
  color:gray;
  font-size:15px;

`

const ChatDataBoxMsg = styled.div`
  background:whitesmoke;
  padding:10px;
  width:fit-content;
  border-radius: 4px;
  word-break: break-all;


`

const ChatDataBoxImg = styled.img`
  width:36%;
  height:auto;
  border:1px solid gray;
  @media screen and (max-width:768px){
    width:55%;
    height:auto;
  }
`


const MyChatDataBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items: flex-end;
  width:100%;
  height:auto;
  margin-top:20px;

`

const MyChatDataBoxMsg = styled.div`
  width:fit-content;
  max-width:50%;
  height:auto;
  padding:10px;
  word-break: break-all;

  background:rgb(254, 240, 27);
  /* padding-left:50%; */
  text-align:left;
  border:1px solid rgb(128,128,128,0.2);
  border-radius:20px;
`

const MyChatDataBoxImg = styled.img`
    width:35%;
  height:auto;
  border:1px solid gray;
  @media screen and (max-width:768px){
    width:55%;
    height:auto;
  }
  border:1px solid gray;
`

const MyChatDataBoxUserInfo = styled.div`
 width:fit-content;
 display:flex;
`

const MyChatDataBoxUserName = styled.div`
  font-weight: bold;
  margin-left:20px;
`
const MyChatDataBoxDate = styled.div`
  font-size:15px;
  color:gray;
`







const ScrollBottomTargetBox = styled.div`

  width:100%;
  height:10px;
  /* margin-top:-100px; */
`

const ScrollTopTargetBox = styled.div.attrs(()=>{

})`
  display:${(props) => props.isLoading ? "block":"none"};
  width:100%;
  /* margin-top:-100px; */
`

const NewMessageAlert = styled.div.attrs(() => { })`
  display:${(props) => props.scroll === 0 ? "none" : "block"};
  position:absolute;
  bottom:0;
  width:fit-content;
  padding-left:40px;
  padding-right:40px;
  height:20px;
  font-weight:bold;
  font-size:15px;
  bottom:130px;
  background:rgb(128,128,128,0.2);
`


const TopLoadingBox = styled.div`
  width:100%;
  height:50px;
  font-size:18px;
  text-align:center;
  font-weight:bold;
  color:gray;
`



const ChatBoxSystemDateItem = styled.div`
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




