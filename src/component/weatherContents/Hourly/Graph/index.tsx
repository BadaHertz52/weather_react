import React, { RefObject, MutableRefObject } from "react";
import { CSSProperties } from "styled-components";
import TempChart from "./TempChart";
import GraphThead, { GraphTheadProperty } from "./GraphThead";
import GraphTr from "./GraphTr";
import { GRAPH_TABLE_HEAD_ARRAY } from "../../../../constants";

type GraphProperty = GraphTheadProperty & {
  tableStyle: CSSProperties;
  tableRef: RefObject<HTMLTableElement>;
  scrollBeforeOn: MutableRefObject<boolean>;
  scrollAfterOn: MutableRefObject<boolean>;
  startScroll: (clientX: number) => void;
  moveScroll: (clientX: number) => void;
  endScroll: () => void;
};

const Graph = ({
  todaySunInform,
  tableStyle,
  tableRef,
  scrollBeforeOn,
  scrollAfterOn,
  threeDay,
  startScroll,
  moveScroll,
  endScroll,
}: GraphProperty) => {
  const SUMMARY =
    "시간별 날씨(온도,하늘상태,강수확률, 강수,적설,바람-풍향/풍속, 습도) 정보를 제공합니다.";

  return (
    <div className="weather_graph">
      <div className="scrollControl">
        <div
          className={`scrollArea ${scrollBeforeOn.current ? "beforeOn" : ""} ${
            scrollAfterOn.current ? "afterOn" : ""
          }`}
          onMouseDown={(event) => startScroll(event.clientX)}
          onMouseMove={(event) => moveScroll(event.clientX)}
          onMouseUp={endScroll}
          onTouchStart={(event) => startScroll(event.touches[0].clientX)}
          onTouchMove={(event) => moveScroll(event.touches[0].clientX)}
          onTouchEnd={endScroll}
        >
          <table ref={tableRef} style={tableStyle} summary={SUMMARY}>
            <caption>
              <span className="blind">시간별 날씨 표</span>
            </caption>
            <GraphThead threeDay={threeDay} todaySunInform={todaySunInform} />
            <tbody>
              <TempChart threeDay={threeDay} />
              {GRAPH_TABLE_HEAD_ARRAY.map((v) => (
                <GraphTr threeDay={threeDay} trTarget={v} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Graph);
