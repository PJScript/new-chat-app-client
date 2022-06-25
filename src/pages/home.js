import React from "react";
import styled from "styled-components";
import * as S from '../style/common'

const Home = () => {

    {/* <S.Layout>
<Inner>
홈 입니다.

</Inner>
</S.Layout> */}
    return (
    <S.Layout>
        <Inner>
        홈 입니다.

        </Inner>
    </S.Layout>
    )
}



export default Home


const Inner = styled.div`
  width:100%;
  padding-top:40px;
  background:red;
  height:100%;
`


