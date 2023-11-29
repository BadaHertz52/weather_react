import React from "react";
import styled from "styled-components";
import { PM_STATE } from "../../../../constants";

const Dd = styled.dd`
  color: ${(props) =>
    props.className !== "notYet"
      ? PM_STATE[props.className as keyof typeof PM_STATE].color
      : PM_STATE.undefined.color};
`;

export default React.memo(Dd);
