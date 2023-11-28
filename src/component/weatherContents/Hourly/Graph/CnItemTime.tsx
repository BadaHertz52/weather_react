import React from "react";
import { DailyWeather, HourWeather, SunRiseAndSet } from "../../../../modules";
import SkyIcon from "../../SkyIcon";
import { checkDayOrNight } from "../../../../utils";

type CnItemTimeProperty = {
  dayKor: string;
  dayEng: string;
  dailyWeather: DailyWeather;
  hourWeather: HourWeather;
  todaySunInform: Error | SunRiseAndSet;
};

const CnItemTime = ({
  dayKor,
  dayEng,
  dailyWeather,
  hourWeather,
  todaySunInform,
}: CnItemTimeProperty) => {
  const date = dailyWeather.date;
  const getHour = (h: HourWeather) => {
    return h.hour[0] === "0" ? h.hour.slice(1, 2) : h.hour.slice(0, 2);
  };
  const hour = getHour(hourWeather);
  const className = `data top cnItemTime ${hour === "0" ? dayEng : ""}`;

  return (
    <th
      id={`hourly-${date}${hourWeather.hour.slice(0, 2)}`}
      className={className}
      data-tmpr={hourWeather.temp}
      data-sky={hourWeather.sky}
      data-ymdt={`${date}${hourWeather.hour.slice(0, 2)}`}
    >
      {hour === "0" ? (
        <span className={`label ${dayEng}`}>{dayKor}</span>
      ) : (
        <span className={`time ${dayEng}`}>{hour}</span>
      )}
      <SkyIcon
        skyType={hourWeather.sky}
        daytime={checkDayOrNight(Number(hour), todaySunInform)}
      />
    </th>
  );
};

export default React.memo(CnItemTime);
