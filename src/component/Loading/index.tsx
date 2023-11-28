import React from "react";
import { DataState } from "../../modules";
import LoadingState from "./LoadingState";

type LoadingProperty = {
  positionState: DataState;
  weatherState: DataState;
};
const Loading = ({ positionState, weatherState }: LoadingProperty) => {
  const getProgress = (state: DataState) => {
    switch (state) {
      case "none":
        return 0;
      case "pending":
        return 25;
      case "success":
        return 50;
      case "failure":
        return 50;
      default:
        return 0;
    }
  };

  const progress = getProgress(positionState) + getProgress(weatherState);

  return (
    <div id="loading">
      <div className="inner">
        <div className="state_area">
          <LoadingState data={"position"} state={positionState} />
          <LoadingState data={"weather"} state={weatherState} />
        </div>
        <div className="loading_area">
          <div className={`bar_wrap progress_${progress}`}>
            <div className="bar_state">
              {progress === 100
                ? positionState === "failure" || weatherState === "failure"
                  ? "failure..."
                  : "success!!"
                : "loading..."}
            </div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Loading);
