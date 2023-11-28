import React from "react";
import { SunRiseAndSet, WeatherState } from "../modules/weather";
import None from "./None";
import { Hourly, Nation, Now, Sun, Week } from "./weatherContents";
type ContentProps = {
  weather: WeatherState;
};
const Content = ({ weather }: ContentProps) => {
  /**
   * weather.sunRiseAndSet이 Error type 의 요소를 가지고 있으면 false, 그렇지 않으면(요소들이 모두 SunSetAndRise type)true를 반환하는 함수
   * @returns boolean type
   */
  const checkSunInfoType = (
    sunRiseAndSet: null | (Error | SunRiseAndSet)[]
  ) => {
    if (sunRiseAndSet !== null) {
      // 요소들의 값은 weather.sunRiseAndSet의 각 요소들의 타입이 Error type 여부
      const array = sunRiseAndSet.map(
        (e: Error | SunRiseAndSet) => e instanceof Error
      );
      if (array.includes(true)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  return (
    <div id="content">
      <div className="section_wrap">
        <div className="section_center">
          {weather.nowWeather !== null &&
          weather.tomorrowWeather !== null &&
          weather.sunRiseAndSet !== null ? (
            <Now
              nowWeather={weather.nowWeather}
              tomorrowWeather={weather.tomorrowWeather}
              todaySunInform={weather.sunRiseAndSet[0]}
            />
          ) : (
            <None target={"실시간 날씨"} />
          )}
          {weather.threeDay !== null && weather.sunRiseAndSet !== null ? (
            <Hourly
              threeDay={weather.threeDay}
              todaySunInform={weather.sunRiseAndSet[0]}
            />
          ) : (
            <None target={"시간별 날씨 예보"} />
          )}
          {weather.week !== null ? (
            <Week week={weather.week} />
          ) : (
            <None target={"주간 날씨예보"} />
          )}
        </div>
        <div className="section_right">
          {weather.nation !== null && weather.sunRiseAndSet !== null && (
            <Nation
              nation={weather.nation}
              todaySunInform={weather.sunRiseAndSet[0]}
            />
          )}
          {weather.sunRiseAndSet !== null &&
          checkSunInfoType(weather.sunRiseAndSet) ? (
            <Sun sunRiseAndSet={weather.sunRiseAndSet as SunRiseAndSet[]} />
          ) : (
            <None target={"일출,일몰"} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Content;
