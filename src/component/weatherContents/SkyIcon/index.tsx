import React from "react";
import { SkyType } from "../../../modules/weather";
import CloudyIcon from "./CloudyIcon";
import SnowIcon from "./SnowIcon";
import SunnyDayIcon from "./SunnyDayIcon";
import SunnyNightIcon from "./SunnyNightIcon";
import VeryCloudyIcon from "./VeryCloudyIcon";
type SkyIconProperty = {
  skyType: SkyType;
  daytime: boolean;
};

const SkyIcon = ({ skyType, daytime }: SkyIconProperty) => {
  return (
    <div className="skyIcon">
      {skyType === "cldSnow" && (
        <div className="overlapping">
          <CloudyIcon className="behind" rain={false} shower={false} />
          <SnowIcon className="front" />
        </div>
      )}

      {skyType === "cldRain" && (
        <CloudyIcon className="behind" rain={true} shower={false} />
      )}

      {skyType === "cldRainSnow" && (
        <div className="overlapping">
          <CloudyIcon className="behind" rain={true} shower={false} />
          <SnowIcon className="front" />
        </div>
      )}

      {(skyType === "shower" ||
        skyType === "spellRain" ||
        skyType === "cldShower") && <CloudyIcon rain={false} shower={true} />}

      {skyType === "cloudy" && <CloudyIcon rain={false} shower={false} />}

      {skyType === "snow" && <SnowIcon />}

      {skyType === "sunny" && (daytime ? <SunnyDayIcon /> : <SunnyNightIcon />)}

      {skyType === "vrCldSnow" && (
        <div className="overlapping">
          <VeryCloudyIcon className="behind" rain={false} shower={false} />
          <SnowIcon className="front" />
        </div>
      )}

      {(skyType === "rainy" || skyType === "vrCldRain") && (
        <VeryCloudyIcon rain={true} shower={false} />
      )}

      {(skyType === "snowRain" || skyType === "vrCldRainSnow") && (
        <div className="overlapping">
          <VeryCloudyIcon className="behind" rain={true} shower={false} />
          <SnowIcon className="front" />
        </div>
      )}

      {skyType === "vrCldShower" && (
        <VeryCloudyIcon rain={false} shower={true} />
      )}

      {skyType === "veryCloudy" && (
        <VeryCloudyIcon rain={false} shower={false} />
      )}
    </div>
  );
};

export default React.memo(SkyIcon);
