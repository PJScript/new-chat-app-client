import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useNavigate } from "react-router-dom";
import * as S from '../style/common'
import styled from 'styled-components'
import useStore from '../store/store'
import MyChat from './chatItems/myChat'
import OtherChat from './chatItems/otherChat'
import io from 'socket.io-client'
import Modal from './modal'
import LogoutTimer from './logoutTimer'
import { MessageInputComponent } from './messageInput'

let socket

const ChatList = () => {
  const email = useStore((state) => state.email)
  const setEmail = useStore((state) => state.setEmail)
  const setNickname = useStore((state) => state.setNickname)

  const setPage = useStore((state) => state.setPage)
  const setLogin = useStore((state) => state.setLogin)
  const navigate = useNavigate()

  const [list, setList] = useState([])
  const scrollBottom = useStore((state) => state.scrollBottom)
  const setScrollBottom = useStore((state) => state.setScrollBottom)
  const [scrollTop, setScrollTop] = useState(false)

  const [newMessage, setNewMessage] = useState();
  const [newMessageAlert, setNewMessageAlert] = useState(0);
  const [newMessageAlertContent, setNewMessageAlertContent] = useState({ name: "", message: "" })
  const [imgLoad, setImgLoad] = useState(0)

  const [moreMessageLoading, setMoreMessageLoading] = useState(true)

  const listBottomRef = useRef(null)
  const listTopRef = useRef(null)
  const listRef = useRef(null);
  const prevScrollHeight = useStore((state) => state.prevScrollHeight)
  const setPrevScrollHeight = useStore((state) => state.setPrevScrollHeight)

  const liveScrollHeight = useStore((state) => state.liveScrollHeight)
  const setLiveScrollHeight = useStore((state) => state.setLiveScrollHeight)


  const [whoMessage, setWhoMessage] = useState('');


  const isLoading = useStore((state) => state.isLoading)
  const setIsLoading = useStore((state) => state.setIsLoading)


  const setView = useStore((state) => state.setView)
  const setImg = useStore((state) => state.setImg)


  const [isRender, setIsRender] = useState(false);



  const socketListener = (scrollBottom) => {
    let name = sessionStorage.getItem("name")
    socket.emit('user-info', { email: email, system: "connection" })
    socket.on('user-info', (data) => {
      console.log(data)
    })
    socket.on("broadcast-message", (data) => {
      setPrevScrollHeight(listRef.current?.scrollHeight)
      // setList((list) => list.length >= 10 ? [data,...list.slice(1, list.length) ] : [data,...list])
      setWhoMessage(data.email)
      
      // setList((list) => [data,...list.slice(0,9) ] )
      setList((list) => [data, ...list]);
    })
    socket.on("broadcast-image", (data) => {
      setList((list) => [...list, data]);
    })
    socket.on("session-expired", () => {
      navigate('/login')
      alert('일정 시간 입력이 없어서 로그인을 해제 합니다')
    })
    socket.on("disconnect", () => {
      console.log("disconnect")
    })
  }






  const MoreMessage = () => {
    // setMoreMessageLoading(true)
    // if (!isLoading) {
    //   alert('메시지가 더 이상 없습니다.')
    //   return;
    // }
    setIsLoading(false);

    const url = `http://api.rudydy.xyz:8080/api/chat/morechat?page=${Number(sessionStorage.getItem('p'))}`
    fetch(url, {
      method: 'GET',
      credentials: "include", // to send HTTP only cookies
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {

      if (res.status !== 200) {
        navigate('/')
        setTimeout(() => {
          alert('로그인 후 이용 할 수 있습니다')
        }, 1000)
      } else {
        return res.json()
      }
    }).then((data) => {
      if (data.data.length === 0) {
        alert('더 이상 채팅이 없어요!')
        setEmail(data.email)
        setNickname(data.nickname)
        setMoreMessageLoading(false)
        setScrollTop(false)

      } else {
        setNickname(data.nickname)
        setList((list) => [...list, ...data.data]);
        setEmail(data.email)
        const nextPage = sessionStorage.setItem('p', Number(sessionStorage.getItem('p')) + 1)
        setPage(nextPage)
        if (data.email) {
          setLogin(true)
        }
        setMoreMessageLoading(false)
      }


      console.log(data)
    })

    // setIsLoading(true)
  }





  // scrollBottom 
  useEffect(() => {
    let who

    const totalScroll = listRef.current?.scrollHeight
    let resultMoveScroll = (totalScroll - prevScrollHeight)
    resultMoveScroll = resultMoveScroll + Math.abs(liveScrollHeight)
    resultMoveScroll = -resultMoveScroll
    if (listRef.current.scrollTop !== 0 && whoMessage !== email && isLoading) {
      listRef.current.scrollTo(0, resultMoveScroll);
      setNewMessageAlert(1);
      setWhoMessage("");
    } else if (scrollBottom) {
      listBottomRef.current?.scrollIntoView({ hehavior: 'smooth' });
    } else if (!scrollBottom && whoMessage === email) {
      listBottomRef.current?.scrollIntoView({ hehavior: 'smooth' });
    }

    setIsLoading(true)


  }, [list])


  useEffect(() => {

  }, [newMessageAlertContent])




  // chat scrolling after image load
  useEffect(() => {
    if (imgLoad) {
      setImgLoad(0);
    }
  }, [imgLoad])

  // socket connect
  useEffect(() => {
    socket = io.connect('http://api.rudydy.xyz:8080')
    sessionStorage.setItem('p', 1)
    socketListener()
    MoreMessage();

    return () => {
      console.log('언마운트')
    }
  }, [])




  //scroll bottom intersection observe
  const onIntersectBottom = async ([entry], observer) => {

    if (!entry.isIntersecting) {
      setScrollBottom(entry.isIntersecting)
      setLiveScrollHeight(listRef.current?.scrollTop)

      observer.unobserve(entry.target);

      observer.observe(entry.target);
    } else {
      setScrollBottom(entry.isIntersecting)
      setNewMessageAlert(0);
      setIsLoading(false);


    }

  }
  useEffect(() => {
    const observerBottom = new IntersectionObserver(onIntersectBottom, { threshold: 0.5 });
    observerBottom.observe(listBottomRef.current);

    return () => observerBottom.disconnect()
  }, []);




  //scroll top intersection observe
  const onIntersectTop = async ([entry], observer) => {


    if (!entry.isIntersecting) {


      observer.unobserve(entry.target);
      observer.observe(entry.target);
      setScrollTop(() => entry.isIntersecting)
    } else {

      setMoreMessageLoading(true)   

      if(Number(sessionStorage.getItem('p')) >= 2){
        MoreMessage();
      }
        setScrollTop(() => entry.isIntersecting)

    }
  }

  useEffect(() => {
      const observerTop = new IntersectionObserver(onIntersectTop);
      observerTop.observe(listTopRef.current);

      return () => observerTop.disconnect()

  }, []);


  const onClickImage = (e) => {
    const id = e.target.getAttribute('id')

    setImg(list[id].img_url)
    setView(true)
  }

  const detectMobileKeyboard = (e) => {

    listBottomRef.current?.scrollIntoView();

  }

  useEffect(() => {

    window.addEventListener("resize", detectMobileKeyboard)
    return () => window.removeEventListener("resize", detectMobileKeyboard)

  }, [])






  return (
    <ChatListWrapper>
      <ChatBoxChatList ref={listRef} >
        {/* <Modal /> */}

        <ScrollBottomTargetBox ref={listBottomRef}></ScrollBottomTargetBox>


        {list.map((item, idx) => {
          if (item.email !== email) {
            return <OtherChat item={item} idx={idx} setImgLoad={setImgLoad} onClickImage={onClickImage} />
          } else {
            return <MyChat item={item} idx={idx} setImgLoad={setImgLoad} onClickImage={onClickImage} />
          }

        }
        )}
        {moreMessageLoading === true ?
        <TopLoadingBox>메시지를 기다리는 중..</TopLoadingBox>
          :
        <TopLoadingBox>마지막 메시지</TopLoadingBox>
        }

<ScrollTopTargetBox ref={listTopRef}></ScrollTopTargetBox>

      </ChatBoxChatList>
{list.length > 0 ?

<NewMessageAlert scroll={newMessageAlert} onClick={() => listBottomRef.current?.scrollIntoView()}>
 <NewMessageAlertContent>
   <NewMessageAlertTitle>New Message
   <span style={{color:'black',marginLeft:"30px"}}>&#183;</span>
   </NewMessageAlertTitle>
   <NewMessageAlertProfile>ㅁ</NewMessageAlertProfile>
   <NewMessageAlertNickname>{list[0].nickname} </NewMessageAlertNickname>
   <NewMessageAlertMessage>{list[0].message}</NewMessageAlertMessage>
 </NewMessageAlertContent>
</NewMessageAlert>
:
""

}
  
      <MessageInputComponent socket={socket} setList={setList} />
    </ChatListWrapper>


  )
}

export default ChatList

const ChatListWrapper = styled.div`
  display:flex;
  flex-direction:column;
  position:relative;
  align-items:center;
  justify-content:center;
  padding:0;
  margin:0;
  /* padding-left:220px; */
  /* padding-right:20px; */
  /* background:blue; */
  /* padding-left:20px; */
  background:white;
  width:100%;
  height:100%;
  /* background:red; */
  overflow:hidden;
  /* width:calc(100vw - 350px); */
  /* width:calc(100% - 350px); */
  /* height:100vh; */
  @media screen and (max-width:768px){
    /* width:100vw; */
  }
`

const ChatBoxTitleBar = styled.div`
position:absolute;
display:flex;
justify-content:left;
padding-left:10px;
align-items:center;
  width:100%;
  height:50px;
  /* background:white; */
  top:40px;
  background:rgb(231,236,255,1);

  /* box-shadow:0px 1px 10px 0px rgb(128,128,128,0.2); */
`


const ChatBoxTitleBarItem = styled.div`
  width:fit-content;
  /* background:blue; */
  margin-right:34px;
`


const ChatBoxTitleText = styled.div`
  font-weight:bold;
  font-size:16px;
`



const ChatBoxTitleIconBox = styled.span`
width:100%;
font-size:16px;
color:skyblue;
margin-left:10px;
&:hover{
    cursor:pointer;
  }
`

const ChatBoxChatList = styled.ul`
  display:flex;
  /* position:fixed; */
  width:100%;
  flex-direction:column-reverse;
  height:calc(100% - 100px); // bottom chat input & header & notice size
  /* min-height:80vh; */
  margin:0;
  padding:0;
  /* margin-top:40px; */
  /* margin-top:40px; */

  padding-left:10px;
  /* padding-bottom:20px; */

  list-style:none;
  overflow-y:scroll;
`


const ScrollBottomTargetBox = styled.div`

  width:100%;
  /* margin-top:-100px; */
`

const ScrollTopTargetBox = styled.div.attrs(() => {

})`
  /* display:${(props) => props.isLoading ? "block" : "none"}; */
  width:100%;
  /* margin-top:-100px; */
`


const TopLoadingBox = styled.div`
  /* padding-top:60px; */
  width:100%;
  height:60px;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:60px;
  font-size:18px;
  text-align:center;
  font-weight:bold;
  color:gray;
`


const NewMessageAlert = styled.div.attrs(() => { })`
  display:${(props) => props.scroll === 0 ? "none" : "flex"};
  flex-direction:column;
  justify-content:center;
  position:absolute;
  /* bottom:0; */
  padding-left:10px;
  padding-right:10px;
  width:100%;
  height:fit-content;
  font-size:15px;
  bottom:54px;
  /* left:0; */

`

const NewMessageAlertTitle = styled.div`
  color:black;
  font-weight:bold;
  margin-left:20px;
  margin-right:46px;
`

const NewMessageAlertContent = styled.div`
  display:flex;
  width:100%;
  border-radius:8px;
  background:rgb(160,160,160,0.9);
  padding-top:10px;
  padding-bottom:10px;
  &:hover{
    cursor:pointer;
  }

`

const NewMessageAlertProfile = styled.div`
  font-size:16px;
  font-weight:bold;
`

const NewMessageAlertNickname = styled.div`
  font-weight:bold;
  margin-right:20px;
`

const NewMessageAlertMessage = styled.div`
  /* font-weight: */
`