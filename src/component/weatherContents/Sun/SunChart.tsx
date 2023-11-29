import React, { useCallback, useEffect, useState } from "react";
import SunIconArea from "./SunIconArea";
import { CSSProperties } from "styled-components";
import { SunRiseAndSet, changeTwoDigit } from "../../../modules";

type SunChartProperty = {
  sunRiseAndSet: SunRiseAndSet[];
};

const SunChart = ({ sunRiseAndSet }: SunChartProperty) => {
  const now = new Date();
  const hours = Number(now.getHours());
  const min = changeTwoDigit(Number(now.getMinutes()));
  const time = Number(`${hours}${min}`);
  const todaySunInfo = sunRiseAndSet[0];
  /**
   * .moveSun를 회전 시킬 때 기준이 되는 각도 (n번 회전시, n * 기준 각도 만큼 회전함)
   */
  const ms_ra = 180 / 16;
  /**
   * .bar를 회전 시킬 때 기준이 되는 각도 (n번 회전시, n * 기준 각도 만큼 회전함)
   */
  const bar_ra = (270 - 45) / 16;

  const [moveSunStyle, setMoveSunStyle] = useState<CSSProperties | undefined>(
    undefined
  );
  const [barStyle, setBarStyle] = useState<CSSProperties>({
    transform: "rotate(45deg)",
  });

  const changeRotate = useCallback(
    (part: number) => {
      setMoveSunStyle({
        transform:
          part === 16
            ? "rotate(181deg)"
            : part === 0
            ? "rotate(10deg)"
            : `rotate(${ms_ra * part}deg)`,
      });
      setBarStyle({
        transform: part !== 0 ? `rotate(${bar_ra * part}deg)` : "rotate(45deg)",
      });
    },
    [ms_ra, bar_ra]
  );

  useEffect(() => {
    if (
      todaySunInfo.sunRise !== null &&
      todaySunInfo.sunRise !== undefined &&
      todaySunInfo.sunSet !== null &&
      todaySunInfo.sunSet !== undefined
    ) {
      const sunrise = Number(
        `${todaySunInfo.sunRise.slice(1, 2)}${todaySunInfo.sunRise.slice(3)}`
      );
      const sunset = Number(
        `${todaySunInfo.sunSet.slice(0, 2)}${todaySunInfo.sunSet.slice(3)}`
      );
      const term = (sunset - sunrise) / 16;
      if (time >= sunset) {
        changeRotate(16);
      } else if (time <= sunrise) {
        changeRotate(0);
      } else {
        const gap = time - sunrise;
        const quotient = Math.floor(gap / term);
        changeRotate(quotient);
      }
    }
  }, [todaySunInfo, time, changeRotate]);

  return (
    <div className="sun_chart">
      <div className="move_sun" style={moveSunStyle}></div>
      <div className="progress_bar">
        <div className="current_bar">
          <span className="bar" style={barStyle}></span>
        </div>
      </div>
      <div className="sun_info">
        <SunIconArea sunrise={false} />
        <dl className="time_list">
          <dt className="time_title">일출</dt>
          <dd className="time_sun">{sunRiseAndSet[0].sunRise}</dd>
          <dt className="time_title set">일몰</dt>
          <dd className="time_sun">{sunRiseAndSet[0].sunSet}</dd>
        </dl>
      </div>
    </div>
  );
};

export default React.memo(SunChart);
