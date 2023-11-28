import React, { Dispatch, SetStateAction } from "react";
import { TargetTime } from ".";
import { WEEK } from "../../../constants";

type WeeklyListItemProperty = {
  dayLater: number;
  today_date: number;
  targetDayLater: number;
  setTargetDayLater: Dispatch<SetStateAction<number>>;
  targetItem: TargetTime;
  setTargetItem: Dispatch<SetStateAction<TargetTime>>;
};

const WeeklyListItem = ({
  dayLater,
  today_date,
  targetDayLater,
  setTargetDayLater,
  targetItem,
  setTargetItem,
}: WeeklyListItemProperty) => {
  const itemDate = new Date(new Date().setDate(today_date + dayLater));
  const TODAY = "오늘";
  const month = itemDate.getMonth() + 1;
  const date = itemDate.getDate();
  const day = itemDate.getDay();
  const item_day = day > 6 ? WEEK[day - 6] : WEEK[day];

  const onClickBtn = () => {
    setTargetDayLater(dayLater);
    if (dayLater === 0 && targetItem === "now") {
      setTargetItem("am");
    }
  };

  return (
    <li className={`item ${targetDayLater === dayLater ? "on" : ""}`}>
      <button type="button" className="dayBtn" onClick={onClickBtn}>
        <span className="day">{item_day}</span>
        <span className="date">
          {dayLater === 0 ? TODAY : `${month}.${date}`}
        </span>
      </button>
    </li>
  );
};

export default React.memo(WeeklyListItem);
