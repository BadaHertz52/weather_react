import React from "react";
import PmDd from "./Table/PmDd";
import { WIND_DIRECTION } from "../../../constants";
import { NowWeather, SunRiseAndSet } from "../../../modules";

type SummaryCurrentProperty = {
  nowWeather: NowWeather;
  todaySunInform: Error | SunRiseAndSet;
};
const SummaryCurrent = ({
  nowWeather,
  todaySunInform,
}: SummaryCurrentProperty) => {
  const sunInformError = todaySunInform instanceof Error;

  return (
    <div className="summary current">
      <div className="summary_inner">
        <ul className="summary_table">
          <li>
            <dl>
              <dt>습도</dt>
              <dd>
                {nowWeather.reh}
                <span className="unit">%</span>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>{WIND_DIRECTION[nowWeather.wind.vec]}</dt>
              <dd>
                {nowWeather.wind.wsd}
                <span className="unit">m/s</span>
              </dd>
            </dl>
          </li>
        </ul>
        <ul className="summary_table">
          <li>
            <dl>
              <dt>미세</dt>
              <PmDd grade={nowWeather.pm10Grade} />
            </dl>
          </li>
          <li>
            <dl>
              <dt> 초미세</dt>
              <PmDd grade={nowWeather.pm25Grade} />
            </dl>
          </li>
          <li>
            <dl>
              <dt>일몰</dt>
              <dd>{!sunInformError ? todaySunInform.sunSet : "error"}</dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(SummaryCurrent);
