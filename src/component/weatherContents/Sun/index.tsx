import React from "react";
import { SunRiseAndSet } from "../../../modules/weather";

import SunChart from "./SunChart";
import SunTable from "./SunTable";

type SunProperty = {
  sunRiseAndSet: SunRiseAndSet[];
};
const Sun = ({ sunRiseAndSet }: SunProperty) => {
  return (
    <div className="sun">
      <div className="inner">
        <h2 className="title">일출일몰</h2>
        <div className="sun_contents">
          <div className="sun_panel">
            <SunChart sunRiseAndSet={sunRiseAndSet} />
          </div>
          <div className="sun_panel">
            <SunTable sunRiseAndSet={sunRiseAndSet} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sun);
