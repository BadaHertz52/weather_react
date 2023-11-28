import React, { useState } from "react";
import { Day, NationType, SunRiseAndSet } from "../../../modules";
import { checkDayOrNight } from "../../../utils";
import Map from "./Map";
import WeeklyListItem from "./WeeklyListItem";

export type TargetTime = "now" | "am" | "pm";

type NationProperty = {
  nation: NationType;
  todaySunInform: Error | SunRiseAndSet;
};

const Nation = ({ nation, todaySunInform }: NationProperty) => {
  const today = new Date();
  const hours = today.getHours();
  const today_date = today.getDate();
  const [targetDayLater, setTargetDayLater] = useState<number>(0);
  const [targetTime, setTargetTime] = useState<TargetTime>("now");
  const weeklyList = nation.areas[0].day?.map(
    (d: Day) => d.daysLater
  ) as number[];
  const daytime = checkDayOrNight(hours, todaySunInform);

  return (
    <div className="nation">
      <div className="inner">
        <h2 className="title">전국날씨</h2>
        <ul className="weekly_list">
          {weeklyList.map((i: number) => (
            <WeeklyListItem
              dayLater={i}
              today_date={today_date}
              targetDayLater={targetDayLater}
              setTargetDayLater={setTargetDayLater}
              targetItem={targetTime}
              setTargetItem={setTargetTime}
            />
          ))}
        </ul>
        <div className="map_wrap">
          <Map
            nation={nation}
            daytime={daytime}
            targetTime={targetTime}
            targetDayLater={targetDayLater}
            setTargetTime={setTargetTime}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Nation);
