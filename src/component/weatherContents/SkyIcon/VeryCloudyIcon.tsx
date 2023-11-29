import React from "react";
import { CloudyProperty } from "./CloudyIcon";
import { BsCloudyFill, BsFillCloudRainFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";
import Icon from "./Icon";

const VeryCloudyIcon = ({ className, rain, shower }: CloudyProperty) => {
  return (
    <Icon
      sky="veryCloudy"
      className={className}
      firstStopProperty={{
        stopColor: "#c4c2c2",
        offset: "10%",
      }}
      secondStopProperty={{
        stopColor: "#7a7a7a",
        offset: "100%",
      }}
    >
      {rain ? (
        <BsFillCloudRainFill />
      ) : shower ? (
        <FaCloudShowersHeavy />
      ) : (
        <BsCloudyFill />
      )}
    </Icon>
  );
};

export default React.memo(VeryCloudyIcon);
