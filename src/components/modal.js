import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import useStore from "../store/store";
// import img from "../assets/main01.png"
// import img02 from "../assets/woman.jpg"


const Modal = () => {

    const view = useStore( ( state ) => state.view)
    const setView = useStore( ( state ) => state.setView)
    const img = useStore( ( state ) => state.img)

    const onClickImg = (e) => {
        e.stopPropagation();
    }

    const onClickWrapper = () => {

    }


 


    // useEffect(()=>{
    //     if(wrapper && !inner){
    //         setView(!view)
    //     }
    // }, [view])
    return (
        
      <ModalWrapper  view={view} onClick={()=>setView(false)}>
        <ModalInner img={img} onClick={onClickImg}>
            <ModalCloseBtn onClick={() => setView(false)}>X</ModalCloseBtn>

  {/* <Img src={require("../assets/woman.jpg")}></Img> */}
  {/* <Img src={require("../assets/main01.png")}></Img> */}

        </ModalInner>
      </ModalWrapper>
    )
}

export default React.memo(Modal);


const ModalWrapper = styled.div.attrs(()=>{})`
  padding-top:50px;
  position:fixed;
  display:${(props) => props.view === true ? 'flex':'none'};
  justify-content:center;
  align-items:center;
  width:100vw;
  height:100vh;
  background:rgb(128,128,128,0.5);
  z-index: 998;
`


const ModalInner = styled.div.attrs(()=>{})`
  position:relative;
  /* top:0; */
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:999;
  width:90vw;
  height:86vh;
  overflow: hidden;
  &::after{
    position:absolute;
    top:0;
    left:0;
    width:90vw;
    height:86vh;
    z-index:-1;
    content:"";
    background:rgb(255,255,255,0.6);
  background-image:url(${props => props.img }); 
   background-size:contain;
  background-repeat:no-repeat;
  background-position:center;


    /* opacity:0.2; */
  }
  /* background:green; */

  /* @media screen and (max-width:768px){
    width:100vw;
    height:auto;
  } */
`


const ModalCloseBtn = styled.div`
  width:50px;
  height:50px;
  position:absolute;
  top:6px;
  right:6px;
  color:white;
  padding:10px;
  background:rgb(0,0,0,0.8);
  font-weight:bold;
  display:flex;
  justify-content:center;
  align-items:center;
  
  border-radius:50%;
  font-size:16px;
`


const Img = styled.img`
  /* position:absolute; */
  /* width:80vw; */
  /* width:100%; */
  
  max-width: 100%;
  height: auto;
  display: block;
  background:black;

  /* @media screen and (max-width:768px){
    width:100%;
    heightauto;
  } */


`


