import React, { MutableRefObject } from "react";
import { SummaryType } from "../../../types";

type TabListProperty = {
  initialSummary: MutableRefObject<SummaryType>;
  showCurrent: () => void;
  showTomorrow: () => void;
};
const TabList = ({
  initialSummary,
  showCurrent,
  showTomorrow,
}: TabListProperty) => {
  return (
    <div className="tabList">
      <button
        className={
          initialSummary.current === "current" ? "tabBtn on" : "tabBtn"
        }
        onClick={showCurrent}
        name="현재 날씨"
        type="button"
      >
        <span className="screen-only">현재 날씨</span>
      </button>
      <button
        className={
          initialSummary.current === "tomorrow" ? "tabBtn on" : "tabBtn"
        }
        onClick={showTomorrow}
        name="내일 날씨"
        type="button"
      >
        <span className="screen-only">내일 날씨</span>
      </button>
    </div>
  );
};

export default React.memo(TabList);
