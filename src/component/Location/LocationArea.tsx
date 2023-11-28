import React from "react";
import { None } from "../index";
import { PositionState } from "../../modules";

type LocationAreaProperty = {
  position: PositionState;
};
const LocationArea = ({ position }: LocationAreaProperty) => {
  return (
    <div className="Location_area">
      {(position.state === "failure" || position.state === "none") && (
        <None target="현재 위치" />
      )}
      {position.state === "pending" && "위치 찾는 중"}
      {position.state === "success" &&
        (position.sfGrid !== null ? (
          position.sfGrid.arePt2 !== null ? (
            position.sfGrid.arePt3 !== null ? (
              `${position.sfGrid.arePt2}

                ${position.sfGrid.arePt3}`
            ) : (
              position.sfGrid.arePt2
            )
          ) : (
            position.sfGrid.arePt1
          )
        ) : (
          <None target="현재 위치" />
        ))}
    </div>
  );
};

export default React.memo(LocationArea);
