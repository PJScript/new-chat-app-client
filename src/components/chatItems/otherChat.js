import React from 'react'
import * as S from "../../style/common"
import dateFixer from '../../hooks/dateFixer'
const OtherChat = ({item,idx, onClickImage,setImgLoad}) => {
    


    if (item.img_url) {
        return (
          <S.ChatBoxChatItem key={idx}>
            <S.ChatProfile src={require('../../assets/account.png')} width="40px" height="40px"></S.ChatProfile>
            <S.ChatDataBox>
              <S.ChatDataBoxUserInfo>
                <S.ChatDataBoxUserName>{item.nickname}</S.ChatDataBoxUserName>
                <S.ChatDataBoxDate>
                  {dateFixer(item.created_at)}
                </S.ChatDataBoxDate>
              </S.ChatDataBoxUserInfo>
              <S.ChatDataBoxImg  id={idx} onClick={onClickImage} onLoad={() => setImgLoad(1)} src={item.img_url} />
            </S.ChatDataBox>
          </S.ChatBoxChatItem>
        )
      }else{
        return (
          <S.ChatBoxChatItem key={idx}>
            <S.ChatProfile src={require('../../assets/account.png')} width="40px" height="40px"></S.ChatProfile>
            <S.ChatDataBox>
              <S.ChatDataBoxUserInfo>
                <S.ChatDataBoxUserName>{item.nickname}</S.ChatDataBoxUserName>
                <S.ChatDataBoxDate>
                  {dateFixer(item.created_at)}
                </S.ChatDataBoxDate>
              </S.ChatDataBoxUserInfo>
              <S.ChatDataBoxMsg>{item.message}</S.ChatDataBoxMsg>
            </S.ChatDataBox>
          </S.ChatBoxChatItem>
        )
      }
}


export default OtherChat