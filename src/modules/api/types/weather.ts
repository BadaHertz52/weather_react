import {
  INQURY_AIR,
  INQURY_MID,
  INQURY_SHORT,
  INQURY_SUN,
  SVF_BASE_TIME,
} from "../../../constants";
import { PmType } from "../../weather/types";

export type SFInqury = keyof typeof INQURY_SHORT;

export type Api = {
  url: string;
  inqury:
    | typeof INQURY_SUN
    | typeof INQURY_SHORT
    | typeof INQURY_MID
    | typeof INQURY_AIR;
};
/**
 * 초단기 실황,초단기 예보 ,단기 예보 api data 속 item 의 공통 properties
 */
export type SFcstItemBase = {
  numOfRows: string;
  pageNo: string;
  totalCount: string;
  resultCode: string;
  resultMsg: string;
  dataType: string;
  baseDate: string;
  baseTime: string;
  category: string;
  nx: string;
  ny: string;
};
export type USNcstItem = SFcstItemBase & {
  obsrValue: string;
};
/**
 * 초단기 예보, 단기 예보 api item의 properties type
 */
export type SFcstItem = SFcstItemBase & {
  // 예보 값
  fcstValue: string;
  // 예보 날짜
  fcstDate: string;
  //예보 시각
  fcstTime: string;
};
/**
 * 초단기 실황 data
 */
export type USNcst = {
  baseDate: string;
  baseTime: string;
  //강수형태
  pty: string;
  //습도(%)
  reh: string;
  // 1시간 강수량(mm)
  rn1: string;
  //기온
  t1h: number;
  //풍향(deg)
  vec: number;
  //풍속(m/s)
  wsd: string;
};
/**
 * 단기 예보 data
 */

export type SVFBaseTime = keyof typeof SVF_BASE_TIME;

export type SVFTime = {
  //예보 날짜
  fcstDate: string;
  //예보 시각
  fcstTime: string;
  //강수확률
  pop: string;
  pty: string;
  //1시간 강수량
  pcp: string;
  reh: string;
  //1시간 신적설(cm)
  sno: string;
  sky: number;
  //1시간 기온
  tmp: number;
  //일 최저 기온
  tmn: string;
  //일 최고 기온
  tmx: string;
  vec: number;
  wsd: string;
};
export type SVFDay = SVFTime[];
export type SVFcst = SVFDay[];

//중기 예보
/**
 * 중기 육상 예보 data
 */
export type MidLandFcst = {
  dayLater: number;
  /**
   * 오전 날씨
   */
  wfAm: string;
  /**
   * 오후 날씨
   */
  wfPm: string;
  /**
   * 오전 강수 확률
   */
  rnStAm: string;
  /**
   * 오후 강수 확률
   */
  rnStPm: string;
}[];
/**
 * 중기 기온 예보 data
 */
export type MidTaFcst = {
  dayLater: number;
  taMin: number;
  taMax: number;
}[];
/**
 * 중기 예보 data
 */
export type MidFcstDay = {
  dayLater: number;
  /**
   * 오전 날씨
   */
  wfAm: string;
  /**
   * 오후 날씨
   */
  wfPm: string;
  /**
   * 오전 강수 확률
   */
  rnStAm: string;
  /**
   * 오후 강수 확률
   */
  rnStPm: string;
  /**
   * 최저기온
   */
  taMin: number;
  /**
   * 최고 기온
   */
  taMax: number;
};
export type MidFcst = MidFcstDay[];

//api;
export type ApNowItem = {
  stationName: string;
  mangName: string;
  sidoName: string;
  dataTime: string;
  so2Value: string;
  coValue: string;
  o3Value: string;
  no2Value: string;
  pm10Value: string;
  pm10Value24: string;
  pm25Value: string;
  pm25Value24: string;
  khaiValue: string;
  khaiGrade: string;
  so2Grade: string;
  coGrade: string;
  o3Grade: string;
  no2Grade: string;
  pm10Grade: string;
  pm25Grade: string;
  pm10Grade1h: string;
  pm25Grade1h: string;
  so2Flag: string;
  coFlag: string;
  o3Flag: string;
  no2Flag: string;
  pm10Flag: string;
  pm25Flag: string;
};
export type ApFcstItem = {
  resultCode: string;
  resultMsg: string;
  numOfRows: string;
  pageNo: string;
  totalCount: string;
  items: any;
  dataTime: string;
  informCode: string;
  informOverall: string;
  informCause: string;
  informGrade: string;
  actionKnack: any;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
  imageUrl6: string;
  imageUrl7: string;
  imageUrl8: string;
  imageUrl9: string;
  informData: string;
};
export type ApFcstInformGrade = {
  서울: PmType;
  제주: PmType;
  전남: PmType;
  전북: PmType;
  광주: PmType;
  경남: PmType;
  경북: PmType;
  울산: PmType;
  대구: PmType;
  부산: PmType;
  충남: PmType;
  충북: PmType;
  세종: PmType;
  대전: PmType;
  영동: PmType;
  영서: PmType;
  경기남부: PmType;
  경기북부: PmType;
  인천: PmType;
};

export type PmGrade = {
  pm10Grade: PmType;
  pm25Grade: PmType;
};
