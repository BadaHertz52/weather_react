import React, { Dispatch, SetStateAction } from "react";
import Zone, { ZoneProperty } from "./Zone";
import { TargetTime } from ".";
import mapImg from "../../../assets/map.jpg";
import { Area, NationType } from "../../../modules";

type MapProperty = Omit<ZoneProperty, "area"> & {
  nation: NationType;
  setTargetTime: Dispatch<SetStateAction<TargetTime>>;
};
const Map = ({
  nation,
  daytime,
  targetTime,
  targetDayLater,
  setTargetTime,
}: MapProperty) => {
  return (
    <div className="map">
      <div className="time_area">
        {targetDayLater === 0 && (
          <button
            onClick={() => {
              setTargetTime("now");
            }}
            name="timeBtn_now"
            className={`timeBtn ${targetTime === "now" ? "on" : ""}`}
          >
            현재
          </button>
        )}
        <button
          onClick={() => {
            setTargetTime("am");
          }}
          name="timeBtn_am"
          className={`timeBtn 
        ${
          (targetTime === "now" && targetDayLater !== 0) || targetTime === "am"
            ? "on"
            : ""
        }`}
        >
          오전
        </button>
        <button
          onClick={() => {
            setTargetTime("pm");
          }}
          name="timeBtn_pm"
          className={`timeBtn ${targetTime === "pm" ? "on" : ""}`}
        >
          오후
        </button>
      </div>
      <img className="map_img" src={mapImg} alt="mapImg" />
      {nation.areas.map((area: Area) =>
        area.day !== null ? (
          <Zone
            daytime={daytime}
            area={area}
            targetTime={targetTime}
            targetDayLater={targetDayLater}
          />
        ) : (
          "no data"
        )
      )}
    </div>
  );
};

export default React.memo(Map);
