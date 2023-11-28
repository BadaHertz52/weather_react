import React from "react";
import { DailyWeather, HourWeather, SunRiseAndSet } from "../../../../modules";
import CnItemTime from "./CnItemTime";

type CnItemDayProperty = {
  todaySunInform: Error | SunRiseAndSet;
  dailyWeather: DailyWeather;
  index: number;
};

const CnItemDay = ({
  todaySunInform,
  dailyWeather,
  index,
}: CnItemDayProperty) => {
  const DAYS_KOR = ["오늘", "내일", "모레"];
  const DAYS_ENG = ["today", "tomorrow", "dayAfter"];
  const dayKor = DAYS_KOR[index];
  const dayEng = DAYS_ENG[index];

  return (
    <>
      {index === 0 && (
        <th className="data heading">
          <span className={`label ${dayEng}`}>{dayKor}</span>
        </th>
      )}
      {dailyWeather.hourly.map((h: HourWeather) => (
        <CnItemTime
          dayEng={dayEng}
          dayKor={dayKor}
          dailyWeather={dailyWeather}
          hourWeather={h}
          todaySunInform={todaySunInform}
        />
      ))}
    </>
  );
};

export default React.memo(CnItemDay);
