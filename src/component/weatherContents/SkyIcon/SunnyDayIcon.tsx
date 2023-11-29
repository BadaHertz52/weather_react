import React from "react";
import { BsSunFill } from "react-icons/bs";
import Icon from "./Icon";

const SunnyDayIcon = () => {
  return (
    <Icon
      sky="sunnyDay"
      firstStopProperty={{
        stopColor: "#fae85d",
        offset: "20%",
      }}
      secondStopProperty={{
        stopColor: "#ff9500",
        offset: "100%",
      }}
    >
      <BsSunFill />
    </Icon>
  );
};

export default React.memo(SunnyDayIcon);
