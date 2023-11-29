import React from "react";
import { RiEmotionSadLine } from "react-icons/ri";
import None from "../None";

const NoneWeather = () => {
  return (
    <div id="none_weather">
      <RiEmotionSadLine />
      <None target="현재 위치에 대한 날씨" />
    </div>
  );
};

export default React.memo(NoneWeather);
