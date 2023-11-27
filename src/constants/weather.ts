import { WindDirectionType, PmType } from "../modules/weather";

export const SKY_CODE = {
  sunny: "맑음", // sky code :1
  cloudy: "구름많음", // sky code :3
  veryCloudy: "흐림", // sky code :4
};

export const PTY_CODE = {
  sunny: SKY_CODE.sunny,
  rainy: "비", // pty code :1 or 5
  snowRain: "비 또는 눈", //pty :2 or 6
  snow: "눈", // pty code :3 or 7
  shower: "소나기", //pty code:4
};

export const SKY = {
  ...SKY_CODE,
  ...PTY_CODE,
  spellRain: "한때 비",
  cldRain: "구름많고 비",
  cldSnow: "구름많고 눈",
  cldRainSnow: "구름많고 비/눈",
  cldShower: "구름많고 소나기",
  vrCldRain: "흐리고 비",
  vrCldSnow: "흐리고 눈",
  vrCldRainSnow: "흐리고 비/눈",
  vrCldShower: "흐리고 소나기",
};

export const WIND_DIRECTION = {
  north: "북풍",
  nne: "북북동풍",
  ne: "북동풍",
  nw: "북서풍",
  nnw: "북북서풍",
  south: "남풍",
  sse: "남남동풍",
  se: "남동풍",
  sw: "남서풍",
  ssw: "남남서풍",
  east: "동풍",
  ene: "동북동풍",
  ese: "동남동풍",
  west: "서풍",
  wnw: "서북서풍",
  wsw: "서남서풍",
};

export const WIND_DIRECTION_ARRAY: WindDirectionType[] = Object.keys(
  WIND_DIRECTION
) as WindDirectionType[];

export const PM_STATE = {
  common: { name: "보통", color: "#42a5f5" },
  good: { name: "좋음", color: "#15921b" },
  bad: { name: "나쁨", color: "#ff7b00" },
  veryBad: { name: "매우 나쁨", color: "#ef5350" },
  undefined: { name: "정보없음", color: "#6d6d6d" },
};

export const GRADE_ARRAY: PmType[] = Object.keys(PM_STATE) as PmType[];
