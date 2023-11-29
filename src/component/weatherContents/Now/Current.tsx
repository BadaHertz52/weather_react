import React from "react";
import SkyIcon from "../SkyIcon";
import { SKY } from "../../../constants";
import { NowWeather } from "../../../modules";

type CurrentProperty = {
  nowWeather: NowWeather;
  daytime: boolean;
};
const Current = ({ nowWeather, daytime }: CurrentProperty) => {
  return (
    <div className="now_current">
      <div className="summaryImg">
        <SkyIcon skyType={nowWeather.sky} daytime={daytime} />
      </div>
      <div className="summary">
        <div className="temp">
          <span className="blind">현재 온도</span>
          {nowWeather.tmp}
          <span className="degree">°</span>
        </div>
        <div className="sky">{SKY[nowWeather.sky]}</div>
      </div>
    </div>
  );
};

export default React.memo(Current);
