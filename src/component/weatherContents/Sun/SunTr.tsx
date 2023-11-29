import React from "react";
import { SunRiseAndSet } from "../../../modules";

type SunTrProperty = {
  index: number;
  daySunInfo: SunRiseAndSet;
};

const SunTr = ({ index, daySunInfo }: SunTrProperty) => {
  const TH_ARRAY = ["오늘", "내일", "모레"];
  const date = `${daySunInfo.date.slice(0, 2)}.${daySunInfo.date.slice(2)}`;

  return (
    <tr className="sun_tr">
      <th scope="row" className="sun_th">
        <span>{TH_ARRAY[index]}</span>
        <span className="sun_day">{date}</span>
      </th>
      <td>
        <span>일출</span>
        <strong className="sun_time">{daySunInfo.sunRise}</strong>
      </td>
      <td>
        <span>일몰</span>
        <strong className="sun_time">{daySunInfo.sunSet}</strong>
      </td>
    </tr>
  );
};

export default React.memo(SunTr);
