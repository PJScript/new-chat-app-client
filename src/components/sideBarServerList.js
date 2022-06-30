import React from "react";
import * as S from "../style/common"
import styled from "styled-components";


const SideBarServerList = () => {

    return (
<Layout>
  <CategoryList>
    <CategoryTitle>타이틀</CategoryTitle>
    <CategoryItem>first</CategoryItem>
    <CategoryItem>2</CategoryItem>
    <CategoryItem>3</CategoryItem>
    <CategoryItem>4</CategoryItem>
    <CategoryItem>6</CategoryItem>
    <CategoryItem>7</CategoryItem>
    <CategoryItem>8</CategoryItem>
    <CategoryItem>9</CategoryItem>
    <CategoryItem>10</CategoryItem>
    <CategoryItem>5</CategoryItem>
    <CategoryItem>5</CategoryItem>
    <CategoryItem>5</CategoryItem>
    <CategoryItem>5</CategoryItem>
    <CategoryItem>5</CategoryItem>
    <CategoryItem>last</CategoryItem>

<CategoryFooter>푸터</CategoryFooter>
  </CategoryList>
</Layout>
    )
}
export default SideBarServerList


const Layout = styled.div`
  display:flex;
  position:relative;
  flex-direction:column;
  justify-content: center;
  width:80px;
  min-width:80px;
  height:100%;
  /* background:purple; */
  padding-top:40px;
`

const CategoryTitle = styled.div`
  position:absolute;
  top:39px;
  left:0;
  background:white;
  width:100%;
  height:50px;
  border-bottom:1px solid rgb(128,128,128,0.4);
  border-right:1px solid rgb(128,128,128,0.4);

  /* background:purple; */

`

const CategoryFooter = styled.div`
  position:absolute;
  bottom:0;
  background:white;
  width:100%;
  height:51px;
  border-top:1px solid rgb(128,128,128,0.4);
  border-right:1px solid rgb(128,128,128,0.4);

  /* background:purple; */

`

const CategoryList = styled.ul`
  padding:0;
  margin:0;
  width:100%;
  height:calc(100% - 98px);
  list-style:none;
  overflow:scroll;
  border-right:1px solid rgb(128,128,128,0.4);
  margin-bottom:2px;
  
`

const CategoryItem = styled.li`
  width:100%;
  height:80px;
  /* border-bottom:1px solid gray; */
  &:hover{
    cursor:pointer;
  }
`

