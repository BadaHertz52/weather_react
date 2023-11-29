import React, { useRef, useState, useCallback, useMemo } from "react";
import { CSSProperties } from "styled-components";
import { checkDayOrNight } from "../../../utils";
import {
  NowWeather,
  SunRiseAndSet,
  TomorrowWeather,
} from "../../../modules/weather";
import ScrollBtn from "../../ScrollBtn";
import Current from "./Current";
import SummaryCurrent from "./SummaryCurrent";
import SummaryTomorrow from "./SummaryTomorrow";
import { SummaryType } from "../../../types";
import TabList from "./TabList";

type NowProperty = {
  nowWeather: NowWeather;
  tomorrowWeather: TomorrowWeather;
  todaySunInform: Error | SunRiseAndSet;
};

const Now = ({ nowWeather, tomorrowWeather, todaySunInform }: NowProperty) => {
  const now = new Date();
  const hours = now.getHours();

  const daytime = checkDayOrNight(hours, todaySunInform);

  const wrapRef = useRef<HTMLDivElement>(null);
  const currentWrapStyle: CSSProperties = useMemo(
    () => ({
      transform: "translateX(0%)",
    }),
    []
  );
  const tomorrowWrapStyle: CSSProperties = useMemo(
    () => ({
      transform: `translateX(-100%)`,
    }),
    []
  );
  const [wrapStyle, setWrapStyle] = useState<CSSProperties>(currentWrapStyle);
  const scrollEvent = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const moveX = useRef<number>(0);
  const initialSummary = useRef<SummaryType>("current");

  const showCurrent = useCallback(() => {
    initialSummary.current = "current";
    setWrapStyle(currentWrapStyle);
  }, [initialSummary, setWrapStyle, currentWrapStyle]);

  const showTomorrow = useCallback(() => {
    initialSummary.current = "tomorrow";
    setWrapStyle(tomorrowWrapStyle);
  }, [initialSummary, setWrapStyle, tomorrowWrapStyle]);

  const startScroll = useCallback(
    (clientX: number) => {
      if (wrapStyle !== undefined) {
        startX.current = clientX;
        scrollEvent.current = true;
      }
    },
    [wrapStyle]
  );
  const moveScroll = useCallback(
    (clientX: number) => {
      if (scrollEvent.current && wrapRef.current !== null) {
        moveX.current = clientX;
        const gap = clientX - startX.current;
        const conditionMoveCurrent =
          initialSummary.current === "current" && gap < 0;
        const conditionTommorowCurrent =
          initialSummary.current === "tomorrow" && gap > 0;
        const wrapWidth = wrapRef.current.clientWidth;
        const percent = (gap / wrapWidth) * 100;
        if (conditionMoveCurrent || conditionTommorowCurrent) {
          setWrapStyle({
            ...wrapStyle,
            transform: conditionMoveCurrent
              ? `translateX(${percent}%)`
              : `translateX(${-100 + percent}%)`,
          });
        }
      }
    },
    [wrapStyle]
  );
  const endScroll = useCallback(() => {
    if (scrollEvent.current && wrapRef.current !== null) {
      const transform = wrapRef.current.style.transform;
      const startIndex = transform.indexOf("(");
      const lastIndex = transform.indexOf("%");
      const x = Number(transform.slice(startIndex + 1, lastIndex));
      if (initialSummary.current === "current") {
        x >= -50
          ? setWrapStyle(currentWrapStyle)
          : (initialSummary.current = "tomorrow");
      }
      if (initialSummary.current === "tomorrow") {
        x <= -50
          ? setWrapStyle(tomorrowWrapStyle)
          : (initialSummary.current = "current");
      }
    }
    scrollEvent.current = false;
    startX.current = 0;
    moveX.current = 0;
  }, [currentWrapStyle, tomorrowWrapStyle]);

  return (
    <div className="now" aria-details="현재 날씨">
      <Current nowWeather={nowWeather} daytime={daytime} />
      <div className="now_quickArea">
        <div className="scrollControl">
          <div
            className="scrollArea"
            onMouseDown={(event) => startScroll(event.clientX)}
            onMouseMove={(event) => moveScroll(event.clientX)}
            onMouseUp={endScroll}
            onTouchStart={(event) => startScroll(event.touches[0].clientX)}
            onTouchMove={(event) => moveScroll(event.touches[0].clientX)}
            onTouchEnd={endScroll}
          >
            <div className="summary_wrap" style={wrapStyle} ref={wrapRef}>
              <SummaryCurrent
                nowWeather={nowWeather}
                todaySunInform={todaySunInform}
              />
              <SummaryTomorrow
                tomorrowWeather={tomorrowWeather}
                daytime={daytime}
              />
            </div>
          </div>
          <TabList
            initialSummary={initialSummary}
            showCurrent={showCurrent}
            showTomorrow={showTomorrow}
          />
        </div>
        <ScrollBtn
          clickEvent={showCurrent}
          className={`now_scrollBtn ${
            initialSummary.current === "tomorrow" ? "on" : ""
          }`}
          name="이전 보기"
          pre={true}
        />
        <ScrollBtn
          className={`now_scrollBtn ${
            initialSummary.current === "current" ? "on" : ""
          }`}
          clickEvent={showTomorrow}
          name="다음 보기"
          pre={false}
        />
      </div>
    </div>
  );
};

export default React.memo(Now);
