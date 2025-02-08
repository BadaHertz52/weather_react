import React from "react";

type NoneTarget =
  | "현재 위치"
  | "현재 위치에 대한 날씨"
  | "실시간 날씨"
  | "일출,일몰"
  | "주간 날씨예보"
  | "시간별 날씨 예보"
  | "전국 날씨 예보";

type NoneProperty = {
  target: NoneTarget;
};

const None = ({ target }: NoneProperty) => {
  return (
    <div className="none">
      <p>{target}에 대한 정보를 찾을 수 없습니다.</p>
    </div>
  );
};

export default React.memo(None);
