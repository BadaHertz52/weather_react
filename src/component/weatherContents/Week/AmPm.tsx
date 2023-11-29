import React from "react";
import { AmPmType } from "../../../modules";
import SkyIcon from "../SkyIcon";

type AmPmProperty = {
  data: AmPmType;
  am: boolean;
};

const AmPm = ({ data, am }: AmPmProperty) => {
  return (
    <div className={`weather_inner ${am ? "am" : "pm"}`}>
      <strong className="inner_text left">
        <span className="time-part">{am ? "오전" : "오후"}</span>
        <span className={`rainfall ${data.pop === 0 ? "none" : ""}`}>
          {Math.round(data.pop)}%
        </span>
      </strong>
      <SkyIcon skyType={data.sky} daytime={true} />
    </div>
  );
};

export default React.memo(AmPm);
