import React from "react";
import { DailyWeather, SunRiseAndSet } from "../../../../modules";
import CnItemDay from "./CnItemDay";

export type GraphTheadProperty = {
  todaySunInform: Error | SunRiseAndSet;
  threeDay: DailyWeather[];
};

const GraphThead = ({ threeDay, todaySunInform }: GraphTheadProperty) => {
  return (
    <thead>
      <tr className="thead_cnTimeTable">
        {threeDay.map((d: DailyWeather) => (
          <CnItemDay
            key={`cnItemDay_${threeDay.indexOf(d)}`}
            todaySunInform={todaySunInform}
            dailyWeather={d}
            index={threeDay.indexOf(d)}
          />
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(GraphThead);
