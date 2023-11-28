import React from "react";
import { CSSProperties } from "styled-components";

type TempValueProperty = {
  temp: number;
  minY: number;
  maxY: number;
};

const TempValue = ({ temp, minY, maxY }: TempValueProperty) => {
  const gap = minY < 0 ? -minY : minY;
  const newMax = maxY + gap;
  const percent = (100 * (temp + gap)) / newMax;
  const style: CSSProperties = {
    position: "absolute",
    bottom: `${percent + 4}%`,
    left: "calc(50% - 12px)",
  };

  return (
    <div className="temp">
      {temp !== null && <em style={style}>{temp}°</em>}
    </div>
  );
};

export default React.memo(TempValue);
