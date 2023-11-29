import React from "react";
import PmDd from "./PmDd";
import PopIcon from "./PopIcon";
import SkyIcon from "../../SkyIcon";
import { TomorrowWeather } from "../../../../modules";

type AmPmTrProperty = {
  am: boolean;
  tomorrowWeather: TomorrowWeather;
  daytime: boolean;
};

const AmPmTr = ({ am, tomorrowWeather, daytime }: AmPmTrProperty) => {
  const weatherData = am ? tomorrowWeather.am : tomorrowWeather.pm;
  return (
    <tr>
      <th scope="row">
        <span className="term">
          <span>내일</span>
          <span>{am ? "오전" : "오후"}</span>
        </span>
      </th>
      {/* sky  , tmo*/}
      <td>
        <SkyIcon daytime={daytime} skyType={weatherData.sky} />
        <dl className="dl_number">
          <dt className="blind">기온</dt>
          <dd>
            <span>{am ? tomorrowWeather.tmn : tomorrowWeather.tmx}</span>
            <span className="degree">°</span>
          </dd>
        </dl>
      </td>
      {/* 강수량 */}
      <td>
        <PopIcon pop={weatherData.pop} />
        <dl className="dl_number">
          <dt className="blind">강수 확률</dt>
          <dd>
            {Math.round(weatherData.pop)}
            <span className="unit">%</span>
          </dd>
        </dl>
      </td>
      {/*미세*/}
      <td>
        <dl className="dl_grade">
          <dt>미세</dt>
          <PmDd grade={tomorrowWeather.pm10Grade} />
        </dl>
        <dl className="dl_grade">
          <dt>초미세</dt>
          <PmDd grade={tomorrowWeather.pm25Grade} />
        </dl>
      </td>
    </tr>
  );
};

export default React.memo(AmPmTr);
