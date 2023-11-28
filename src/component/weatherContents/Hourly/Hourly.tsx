import React, { useEffect, useRef, useState, useCallback } from "react";

import { DailyWeather, SunRiseAndSet } from "../../../modules/weather";

import { CSSProperties } from "styled-components";
import ScrollBtn from "../../ScrollBtn";
import Graph from "./Graph";

type HourlyProperty = {
  todaySunInform: Error | SunRiseAndSet;
  threeDay: DailyWeather[];
};

const Hourly = ({ todaySunInform, threeDay }: HourlyProperty) => {
  const [tableStyle, setTableStyle] = useState<CSSProperties>({
    transform: `translateX(0px)`,
  });

  const translateX = useRef<number>(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollAreaWidth = useRef<number>(0);
  const min = useRef<number>(0);
  /**
   * scrollArea::before 이 화면에 보이는 조건
   */
  const scrollBeforeOn = useRef<boolean>(false);
  /**
   * scrollArea::after 가 화면에 보이는 조건
   */
  const scrollAfterOn = useRef<boolean>(true);
  const scrollChart = useRef<boolean>(false);
  const startX = useRef<number>(0);

  const getTranslateXValue = useCallback(() => {
    const string = "translateX(";
    const transform = tableStyle.transform as string;
    const x = transform.slice(string.length);
    const value = x.includes("px")
      ? x.slice(0, x.indexOf("px"))
      : x.slice(0, x.indexOf(")"));
    return Number(value);
  }, [tableStyle.transform]);

  const startScroll = useCallback((clientX: number) => {
    scrollChart.current = true;
    startX.current = clientX;
    const value = getTranslateXValue();
    translateX.current = Number(value);
  }, []);

  const moveScroll = useCallback((clientX: number) => {
    if (scrollChart.current) {
      const gap = clientX - startX.current;
      const x = translateX.current + gap;
      const value = x >= 0 ? 0 : x <= -min.current ? -min.current : x;
      scrollAfterOn.current = value > -min.current;
      scrollBeforeOn.current = value < 0;
      setTableStyle({
        transform: `translateX(${value}px)`,
      });
    }
  }, []);
  const endScroll = useCallback(() => {
    startX.current = 0;
    scrollChart.current = false;
    translateX.current = 0;
  }, []);

  const clickScrollBtn = (pre: boolean) => {
    const value = getTranslateXValue();
    const scrollWidth = scrollAreaWidth.current - 40;
    const x = pre ? value + scrollWidth : value - scrollWidth;
    scrollAfterOn.current = x > -min.current;
    scrollBeforeOn.current = x < 0;
    setTableStyle({
      transform:
        x <= -min.current
          ? `translateX(${-min.current}px)`
          : x >= 0
          ? "translateX(0px)"
          : `translateX(${x}px)`,
    });
  };

  useEffect(() => {
    if (tableRef.current !== null) {
      const tableWidth = tableRef.current?.clientWidth;
      const scrollArea = tableRef.current.parentElement;
      if (scrollArea !== null) {
        scrollAreaWidth.current = scrollArea.clientWidth;
        min.current = tableWidth - scrollArea.clientWidth;
      }
    }
  }, [tableRef]);

  return (
    <div className="hourly">
      <Graph
        todaySunInform={todaySunInform}
        tableStyle={tableStyle}
        tableRef={tableRef}
        scrollBeforeOn={scrollBeforeOn}
        scrollAfterOn={scrollAfterOn}
        threeDay={threeDay}
        startScroll={startScroll}
        moveScroll={moveScroll}
        endScroll={endScroll}
      />
      <ScrollBtn
        clickEvent={() => clickScrollBtn(true)}
        className={` ${tableStyle.transform !== "translateX(0px)" ? "on" : ""}`}
        name={"tempchart_scrollBtn_pre"}
        pre={true}
      />

      <ScrollBtn
        clickEvent={() => clickScrollBtn(false)}
        className={`${
          min.current !== undefined &&
          tableStyle.transform !== `translateX(${-min.current}px)`
            ? "on"
            : ""
        }`}
        name={"tempchanrt_scrollBtn_next"}
        pre={false}
      />
    </div>
  );
};

export default React.memo(Hourly);
