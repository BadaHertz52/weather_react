import React from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

type SunIconAreaProperty = {
  sunrise: boolean;
};

const SunIconArea = ({ sunrise }: SunIconAreaProperty) => {
  return (
    <span
      className="icon_area"
      aria-details={sunrise ? "sunrise time" : "sunset time"}
    >
      <span className="sunIcon_arrow">
        {sunrise ? (
          <HiArrowSmUp className="up" />
        ) : (
          <HiArrowSmDown className="down" />
        )}
      </span>
      <span className="sunIcon"></span>
    </span>
  );
};

export default React.memo(SunIconArea);
