import {
  AREA,
  DATA_STATE,
  PM_STATE,
  PTY_CODE,
  SKY,
  SKY_CODE,
  WIND_DIRECTION,
} from "../../constants";
import { SFGridItem } from "../position";
import { weatherActions } from "./reducer";

const { request, success, reset, failure } = weatherActions;

export type SkyCodeType = keyof typeof SKY_CODE;

export type PtyCodeType = keyof typeof PTY_CODE;

export type SkyType = keyof typeof SKY;

export type WindDirectionType = keyof typeof WIND_DIRECTION;

export type WindType = {
  //풍향
  vec: WindDirectionType;
  wsd: string;
};

export type PmType = keyof typeof PM_STATE | null;

export type AmPmType = {
  sky: SkyType;
  /* 강수 확률(%)*/
  pop: number;
};

export type NowWeather = {
  /**온도*/
  tmp: number;
  sky: SkyType;
  /**습도*/
  reh: string;
  wind: WindType;
  /**미세먼지*/
  pm10Grade: PmType;
  /**초미세먼지*/
  pm25Grade: PmType;
};
export type TomorrowWeather = {
  //미세먼지
  pm10Grade: PmType;
  //초미세먼지
  pm25Grade: PmType;
  am: AmPmType;
  pm: AmPmType;
  tmn: number;
  tmx: number;
};
export type HourWeather = {
  date: string;
  hour: string; //24시간제
  sky: SkyType;
  /** 온도
   */
  temp: number;
  /**강수확률(%)*/
  pop: string;
  /**강수량(mm)*/
  pcp: string;
  /**1시간 신적설량(cm) */
  sno: string;
  wind: WindType;
  //습도
  reh: string;
};
export type DailyWeather = {
  date: string;
  hourly: HourWeather[];
};

export type Day = {
  daysLater: number; //(today=0)
  am: AmPmType;
  pm: AmPmType;
  //최저 기온
  tmn: number;
  //최고 기온
  tmx: number;
};

export type AreaName = keyof typeof AREA;

export type AreaInform = {
  name: AreaName;
  sfGrid: SFGridItem;
  landRegId: string | undefined;
  taRegId: string | undefined;
};

export type AreaNow = {
  temp: number;
  sky: SkyType;
};
export type Area = {
  areaInform: AreaInform;
  day: Day[] | null;
  now: AreaNow | null;
};
export type NationType = {
  searchTime: string;
  areas: Area[];
};
export type SunRiseAndSet = {
  date: string;
  sunRise: string | null | undefined;
  sunSet: string | null | undefined;
};

export type DataState = keyof typeof DATA_STATE;

export type WeatherState = {
  state: DataState;
  error: Error | null;
  nowWeather: NowWeather | null;
  tomorrowWeather: TomorrowWeather | null;
  threeDay: DailyWeather[] | null;
  week: Day[] | null;
  nation: NationType | null;
  sunRiseAndSet: (SunRiseAndSet | Error)[] | null;
};

export type WeatherAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof request>
  | ReturnType<typeof success>
  | ReturnType<typeof failure>;
