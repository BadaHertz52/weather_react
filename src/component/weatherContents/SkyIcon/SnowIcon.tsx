import React from "react";
import { BsSnow2 } from "react-icons/bs";
import Icon from "./Icon";

type SnowIconProperty = {
  className?: string;
};

const SnowIcon = ({ className }: SnowIconProperty) => {
  return (
    <Icon
      sky="snow"
      className={className}
      firstStopProperty={{
        stopColor: "#a7e7fb",
        offset: "5%",
      }}
      secondStopProperty={{
        stopColor: "#019cef",
        offset: "100%",
      }}
    >
      <BsSnow2 />
    </Icon>
  );
};
export default React.memo(SnowIcon);
