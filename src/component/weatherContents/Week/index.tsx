import React from "react";
import { Day } from "../../../modules/weather";
import Item from "./Item";

type WeekProperty = {
  week: Day[];
};

const Week = ({ week }: WeekProperty) => {
  const twoDays = week.slice(0, 2);
  return (
    <div className="week" aria-details="주간 예보">
      <h2 className="title">주간 예보</h2>
      <ul className="box">
        {twoDays.map((d: Day) => (
          <Item item={d} />
        ))}
      </ul>
      <div className="scrollControl">
        <ul className="scrollArea">
          {week.map((d: Day) => (
            <Item item={d} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Week);
