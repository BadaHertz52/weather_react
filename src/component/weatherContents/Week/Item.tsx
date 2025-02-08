import React from "react";
import { Day } from "../../../modules";
import { WEEK } from "../../../constants";
import AmPm from "./AmPm";

type ItemProperty = {
  item: Day;
};

const Item = ({ item }: ItemProperty) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date: string = `${month}.${today.getDate() + item.daysLater}`;
  const itemDayIndex = today.getDay() + item.daysLater;
  const itemDay =
    itemDayIndex > 6 ? WEEK[itemDayIndex - 6] : WEEK[itemDayIndex];
  const dayText: string =
    item.daysLater === 0 ? "오늘" : item.daysLater === 1 ? "내일" : itemDay;

  return (
    <li className={`item day${item.daysLater}`}>
      <div className="day_data">
        <div className="cell_date">
          <div className="date_inner">
            <strong className="day">{dayText}</strong>
            <div className="date">{date}</div>
          </div>
        </div>
        <div className="cell_weather">
          <AmPm data={item.am} am={true} />
          <AmPm data={item.pm} am={false} />
        </div>
        <div className="cell_temperature">
          <strong>
            <span className="lowest">{item.tmn}</span>
            <span className="bar">/</span>
            <span className="highest">{item.tmx}</span>
          </strong>
        </div>
      </div>
    </li>
  );
};

export default React.memo(Item);
