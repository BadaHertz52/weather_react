import React from "react";
import styled from "styled-components";

const LocationBtn = styled.button`
  width: 30%;
  font-size: 1rem;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ebebeb 25%, #dad9d9e9 100%);
  background-color: #ededed;
  border-radius: 6px;
  border: 1px solid #cacaca;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    background: linear-gradient(to bottom, #c6c5c5e9, 25%, #ebebeb 100%);
    background-color: #c6c5c5e9;
  }
`;

export default React.memo(LocationBtn);
