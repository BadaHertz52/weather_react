import React from "react";
import Dd from "./Dd";
import { PmType } from "../../../../modules";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { PM_STATE } from "../../../../constants";

type PmDdProperty = {
  grade: PmType;
};

const PmDd = ({ grade }: PmDdProperty) => {
  return (
    <Dd className={grade === null ? "notYet" : grade}>
      {grade === null ? <BiDotsHorizontalRounded /> : PM_STATE[grade].name}
    </Dd>
  );
};

export default React.memo(PmDd);
