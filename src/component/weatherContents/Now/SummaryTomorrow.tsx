import React from "react";
import { TomorrowWeather } from "../../../modules";
import AmPmTr from "./Table/AmPmTr";

type SummaryTomorrowProperty = {
  tomorrowWeather: TomorrowWeather;
  daytime: boolean;
};
const SummaryTomorrow = ({
  tomorrowWeather,
  daytime,
}: SummaryTomorrowProperty) => {
  const SUMMARY =
    "내일 오전,오후 날씨(온도,강수량,하늘상태,미세먼지 단계, 초미세먼지 단계)를 제공하는 표";

  return (
    <div className="summary tomorrow">
      <div className="summary_inner">
        <table className="summary_table" summary={SUMMARY}>
          <caption>
            <span className="blind">내일 오전,오후 날씨 표</span>
          </caption>
          <thead className="blind">내일 날씨</thead>
          <tbody>
            <AmPmTr
              am={true}
              tomorrowWeather={tomorrowWeather}
              daytime={daytime}
            />
            <AmPmTr
              am={false}
              tomorrowWeather={tomorrowWeather}
              daytime={daytime}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(SummaryTomorrow);
