import React from 'react'
import * as S from "../../style/common"
import dateFixer from '../../hooks/dateFixer'
const SystemChat = ({item,idx}) => {

    return (
        <S.ChatBoxSystemDateItem>
        {dateFixer(item.created_at)}
      </S.ChatBoxSystemDateItem>
    )
}


export default SystemChat