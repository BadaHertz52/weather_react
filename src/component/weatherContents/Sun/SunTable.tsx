import React from "react";
import SunIconArea from "./SunIconArea";
import SunTr from "./SunTr";
import { SunRiseAndSet } from "../../../modules";

type SunTableProperty = {
  sunRiseAndSet: SunRiseAndSet[];
};
const SunTable = ({ sunRiseAndSet }: SunTableProperty) => {
  return (
    <table className="sun_table">
      <caption className="blind">
        <span>오늘부터 모레까지 일출 일몰 시간 정보</span>
      </caption>
      <thead>
        <tr>
          <th scope="col" className="blind">
            날짜
          </th>
          {["일출 시간", "일몰 시간"].map((t: string) => (
            <th scope="col">
              <SunIconArea sunrise={t === "일출 시간"} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sunRiseAndSet.map((i: SunRiseAndSet) => (
          <SunTr index={sunRiseAndSet.indexOf(i)} daySunInfo={i} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(SunTable);
