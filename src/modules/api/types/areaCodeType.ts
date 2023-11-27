import {
  API_AREA,
  MID_TA,
  경기남부,
  경기북부,
  영동,
  영서,
} from "../../../constants/areaCode";

export type MidTaKEY = keyof typeof MID_TA;
export type ApiAreaCode = keyof typeof API_AREA;

export type ApFcstAreaCode =
  | ApiAreaCode
  | typeof 경기북부
  | typeof 경기남부
  | typeof 영서
  | typeof 영동;
