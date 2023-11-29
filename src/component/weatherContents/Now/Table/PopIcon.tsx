import React from "react";
import { GiWaterDrop } from "react-icons/gi";

type PopIconProperty = {
  pop: number;
};

const PopIcon = ({ pop }: PopIconProperty) => {
  return (
    <div className="popIcon weatherIcon">
      <svg width="0" height="0">
        <linearGradient id="pop_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#e3e3e3" offset={JSON.stringify(100 - pop)} />
          <stop stopColor="#0098d8" offset="100%" />
        </linearGradient>
      </svg>
      <div style={{ fill: "url(#pop_gradient)" }} className="iconWrap">
        <GiWaterDrop />
      </div>
    </div>
  );
};

export default React.memo(PopIcon);