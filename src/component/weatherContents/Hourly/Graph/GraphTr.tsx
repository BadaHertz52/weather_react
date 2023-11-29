import React from "react";
import TdDay from "./TdDay";
import Th from "./Th";
import { DailyWeather, HourWeather } from "../../../../modules";
import TdWindy from "./TdWindy";
import { GRAPH_TABLE_HEAD_MAP } from "../../../../constants";
import { TableHeadDataValueType, TableHeadTitleType } from "../../../../types";

type GraphTrProperty = {
  threeDay: DailyWeather[];
  trTarget: TableHeadTitleType;
};
const GraphTr = ({ threeDay, trTarget }: GraphTrProperty) => {
  const { title, unit } = GRAPH_TABLE_HEAD_MAP.get(
    trTarget
  ) as TableHeadDataValueType;

  return (
    <tr aria-details={trTarget}>
      <Th title={title} unit={unit} />
      {threeDay.map((d: DailyWeather) =>
        d.hourly.map((h: HourWeather) =>
          trTarget === "windy" ? (
            <TdWindy date={h.date} hours={h.hour} wind={h.wind} />
          ) : (
            <TdDay
              key={`${trTarget}_td_${h.date}${h.hour}`}
              date={h.date}
              hours={h.hour}
              figure={h.pcp}
              none={Number(h.pcp) <= 0}
            />
          )
        )
      )}
    </tr>
  );
};

export default React.memo(GraphTr);
