import React from "react";
import SkyIcon from "../SkyIcon";
import { TargetTime } from ".";
import { Area, AreaNow, Day, SkyType } from "../../../modules";

export type ZoneProperty = {
  /**
   * 현재 시간이 낮인지
   */
  daytime: boolean;
  area: Area;
  targetTime: TargetTime;
  targetDayLater: number;
};

const Zone = ({ daytime, area, targetTime, targetDayLater }: ZoneProperty) => {
  const areaName = area.areaInform.name;
  const nowData = area.now as AreaNow;
  const dayData = area.day as Day[];
  const targetDayData = dayData[targetDayLater];
  const amData = targetDayData.am;
  const pmData = targetDayData.pm;
  type ZonWeatherData = {
    sky: SkyType;
    temp: number;
  };
  const zoneWeatherData = ((): ZonWeatherData => {
    switch (targetTime) {
      case "now":
        return {
          sky: nowData.sky,
          temp: nowData.temp,
        };
      case "am":
        return { sky: amData.sky, temp: targetDayData.tmn };
      case "pm":
        return { sky: pmData.sky, temp: targetDayData.tmx };
      default:
        return {
          sky: nowData.sky,
          temp: nowData.temp,
        };
    }
  })();

  return (
    <div id={`zone_${areaName}`} className="zone">
      <SkyIcon skyType={zoneWeatherData.sky} daytime={daytime} />
      <div className="text">
        <span className="areaName">{areaName}</span>
        <span className="temp">{zoneWeatherData.temp}°</span>
      </div>
    </div>
  );
};

export default React.memo(Zone);
