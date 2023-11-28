import React from "react";
import { TiLocationArrow } from "react-icons/ti";
import { CSSProperties } from "styled-components";
import { WIND_DIRECTION, WIND_DIRECTION_ARRAY } from "../../../../constants";
import { WindType } from "../../../../modules";

type TdWindyProperty = {
  date: string;
  hours: string;
  wind: WindType;
};
const TdWindy = ({ date, hours, wind }: TdWindyProperty) => {
  const ymdt = `${date}${hours.slice(0, 2)}`;
  const index =
    WIND_DIRECTION[wind.vec] === "북풍"
      ? 0
      : WIND_DIRECTION_ARRAY.indexOf(wind.vec);
  const angle: number = (360 / 16) * index;
  const deg = -15 + angle;
  const arrowStyle: CSSProperties = {
    transform: `rotate(${deg}deg)`,
  };

  return (
    <td className="data" data-ymdt={ymdt}>
      <span className="icon_wind" aria-details={wind.vec}>
        <TiLocationArrow style={arrowStyle} />
      </span>
      <span className="unit_value color">
        <em>{wind.wsd}</em>
      </span>
    </td>
  );
};
export default React.memo(TdWindy);
