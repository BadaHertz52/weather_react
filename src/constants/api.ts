import { Api } from "../modules/api/types/weather";

export const SORT = {
  shortFcast: "VilageFcstInfoService_2.0",
  midFcast: "MidFcstInfoService",
};
export const AP_INFORM_API_URL =
  "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

export const SUN_API_URL =
  "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService";

/**
 * 단기 예보
 * ultraSrtNcst: 초단기실황조회 :현재,
 * ultraSrtFcst:초단기예보조회 : 현재부터 6시간이내
 *  vilageFcst : 단기예보조회 :현재부터 3일 이내
 */
export const INQURY_SHORT = {
  ultraSrtNcst: "getUltraSrtNcst",
  ultraSrtFcst: "getUltraSrtFcst",
  vilageFcst: "getVilageFcst",
};
/**
 *중기 예보
 *midLandFcst :중기 육상예보:강수확률,날씨;
 *midTa :중기기온조회;
 */
export const INQURY_MID = {
  midLandFcst: "getMidLandFcst",
  midTa: "getMidTa",
};
/**
 * 대기오염 예보
 * ctprvnRltmMesureDnsty : 시도별 실시간 대기오염 측정 정보 조회
 * minuDustFrcstDspth :시도별 대기오염 예보
 */
export const INQURY_AIR = {
  ctprvnRltmMesureDnsty: "getCtprvnRltmMesureDnsty",
  minuDustFrcstDspth: "getMinuDustFrcstDspth",
};

export const INQURY_SUN = "getLCRiseSetInfo";

export const FETCH_URL = {
  svfcast: "svfcast",
  sky: "sky",
  usncst: "usncst",
  midFcastLandItems: "midFcast_landItems",
  midFcastTaItems: "midFcast_taItems",
  apNow: "apNow",
  apfcst: "apfcst",
};

export const SVF_BASE_TIME = {
  am2: "0200",
  am5: "0500",
  am8: "0800",
  am11: "1100",
  pm2: "1400",
  pm5: "1700",
  pm8: "2000",
  pm11: "2300",
};

/**
 * Api for short-term forecast
 */
const API_URL = "https://apis.data.go.kr/1360000/";

export const SHORT_FCAST_API: Api = {
  url: `${API_URL}${SORT.shortFcast}`,
  inqury: INQURY_SHORT,
};
/**
 * Api for medium term forecas
 */
export const MID_FCAST_API: Api = {
  url: `${API_URL}${SORT.midFcast}`,
  inqury: INQURY_MID,
};

/**
 * Api for air pollution
 */
export const AP_INFORMATION_API: Api = {
  url: AP_INFORM_API_URL,
  inqury: INQURY_AIR,
};

/**
 * Api for sunset and sunrise
 */
export const SUN_API: Api = {
  url: SUN_API_URL,
  inqury: INQURY_SUN,
};
