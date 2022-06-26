import React from 'react'
import * as S from "../../style/common"
import dateFixer from "../../hooks/dateFixer"
const MyChat = ({item,idx,setImgLoad,onClickImage}) => {
    if (item.img_url) {
        return (
          <S.ChatBoxChatItem key={idx}>
            <S.MyChatDataBox>
              <S.MyChatDataBoxUserInfo>
                <S.MyChatDataBoxDate>{dateFixer(item.created_at)}</S.MyChatDataBoxDate>
                <S.MyChatDataBoxUserName>Me</S.MyChatDataBoxUserName>
              </S.MyChatDataBoxUserInfo>
              <S.MyChatDataBoxImg  id={idx} onClick={onClickImage} onLoad={() => setImgLoad(1)} src={item.img_url} />
            </S.MyChatDataBox>
          </S.ChatBoxChatItem>
        )
      }else{

        return (
          <S.ChatBoxChatItem key={idx}>
            <S.MyChatDataBox>
              <S.MyChatDataBoxUserInfo>
                <S.MyChatDataBoxDate>
                  {dateFixer(item.created_at)}  </S.MyChatDataBoxDate>
                <S.MyChatDataBoxUserName>Me</S.MyChatDataBoxUserName>
              </S.MyChatDataBoxUserInfo>
              <S.MyChatDataBoxMsg>{item.message}</S.MyChatDataBoxMsg>
            </S.MyChatDataBox>
          </S.ChatBoxChatItem>
        )
      }
}


export default MyChat