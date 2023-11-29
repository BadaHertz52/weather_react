import React from "react";

type TdDayProperty = {
  date: string;
  hours: string;
  figure: string;
  /**
   * pcp, sno의 경우 비/눈이 오는지 여부
   */
  none: boolean;
};

/**
 * pop, pcp,sno, reh
 */
const TdDay = ({ date, hours, figure, none }: TdDayProperty) => {
  const ymdt = `${date}${hours.slice(0, 2)}`;

  return (
    <td className="data" data-ymdt={ymdt}>
      <span className={`unit_value ${none ? "" : "color"}`}>
        <em>{figure === "강수없음" ? "0" : figure}</em>
      </span>
    </td>
  );
};

export default React.memo(TdDay);
