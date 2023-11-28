import React from "react";
import TdDay from "../TdDay";
import Th from "../Th";
import { DailyWeather, HourWeather } from "../../../../modules";
import TdWindy from "../TdWindy";

type TrTarget = "pop" | "pcp" | "sno" | "reh" | "windy";
type GraphTrProperty = {
  threeDay: DailyWeather[];
  trTarget: TrTarget;
};
const GraphTr = ({ threeDay, trTarget }: GraphTrProperty) => {
  type DataItemValue = {
    title: string;
    unit: string;
  };
  const DATA_MAP: Map<TrTarget, DataItemValue> = new Map([
    ["pop", getDataItemValue("강수확률", "%")],
    ["pcp", getDataItemValue("강수", "mm")],
    ["sno", getDataItemValue("적설", "cm")],
    ["windy", getDataItemValue("바람", "m/s")],
    ["reh", getDataItemValue("습도", "%")],
  ]);
  const { title, unit } = DATA_MAP.get(trTarget) as DataItemValue;

  function getDataItemValue(title: string, unit: string): DataItemValue {
    return {
      title: title,
      unit: unit,
    };
  }

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
