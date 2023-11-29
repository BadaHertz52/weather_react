import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import Icon from "./Icon";

const SunnyNightIcon = () => {
  return (
    <Icon
      sky="sunnyNight"
      firstStopProperty={{
        stopColor: "#fff2af",
        offset: "10%",
      }}
      secondStopProperty={{
        stopColor: "#ffd500",
        offset: "100%",
      }}
    >
      <BsMoonStarsFill />
    </Icon>
  );
};

export default React.memo(SunnyNightIcon);
