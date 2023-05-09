import React from "react";
import styled from "styled-components";
import { FcNext, FcPrevious } from "react-icons/fc";

const BtnStyled = styled.button`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 100%;
  fill: #939393;
  background-color: #ffff;
  border: none;
  -webkit-box-shadow: 0px 0px 10x 1px rgba(112, 112, 112, 0.28);
  box-shadow: 0px 0px 10px 1px rgba(112, 112, 112, 0.28);
`;
type BtnProperty = {
  clickEvent: () => void;
  className: string;
  name: string;
  pre: boolean;
};
const ScrollBtn = ({ clickEvent, className, name, pre }: BtnProperty) => {
  return (
    <BtnStyled
      onClick={clickEvent}
      className={`scrollBtn ${className} ${pre ? "pre" : "next"}`}
      name={name}
      type="button"
    >
      {pre ? <FcPrevious /> : <FcNext />}
    </BtnStyled>
  );
};

export default React.memo(ScrollBtn);
