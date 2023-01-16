import React from 'react';
import styled from "styled-components";
import {FcNext, FcPrevious} from 'react-icons/fc';

const BtnStyled = styled.button`
  border-radius:50%;
  width:36px;
  height:36px;
  font-size:30px;
  fill:#939393;
  background-color:#ffff;
  border:none;
  -webkit-box-shadow: 0px 0px 15px 2px rgba(112,112,112,0.28); 
  box-shadow: 0px 0px 15px 2px rgba(112,112,112,0.28);
`
type BtnProperty ={
  clickEvent :React.MouseEventHandler<HTMLButtonElement>,
  className:string ,
  name:string,
  pre:boolean,
};
const ScrollBtn =({clickEvent,className , name ,pre}:BtnProperty)=>{
  return (
  <BtnStyled 
    onClick={clickEvent} 
    className={`scrollBtn ${className} ${pre ? 'pre' : 'next'}`} 
    name ={name}
  >
    {pre ?
      <FcPrevious/>
    :
      <FcNext/>
    }

  </BtnStyled>
  )
};


export default React.memo(ScrollBtn)
