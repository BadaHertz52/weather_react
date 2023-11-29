import React from "react";
import { BsCloudyFill, BsFillCloudRainFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";
import Icon from "./Icon";

export type CloudyProperty = {
  className?: string;
  rain: boolean;
  shower: boolean;
};

const CloudyIcon = ({ className, rain, shower }: CloudyProperty) => {
  return (
    <Icon
      sky="cloudy"
      className={className}
      firstStopProperty={{
        stopColor: "#ececec",
        offset: "10%",
      }}
      secondStopProperty={{
        stopColor: "#c5c5c5",
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

export default React.memo(CloudyIcon);
