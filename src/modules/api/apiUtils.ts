import { FETCH_URL, INQURY_SHORT, SHORT_FCAST_API } from "../../constants";
import { SFInqury } from "./types";
/**
 * 초단기 실황, 초단기 예보, 단기 예보 api를 요청할 때 사용할 url을 반환하는 함수
 * @param inqury api 조회 기능
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param baseTime  발표시간(tt00)
 * @returns url (type string)
 */
export const getSFApiUrl = (
  inqury: SFInqury,
  nx: string,
  ny: string,
  baseDate: string,
  baseTime: string,
  numOfRows: string
) => {
  const url = `${SHORT_FCAST_API.url}/${INQURY_SHORT[inqury]}?dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&numOfRows=${numOfRows}`;
  return url;
};

/**
 * url 에 요청을 보내 외부 api에서 data를 가져오는 함수
 * @param apiUrl  데이터를 가져올 api 주소
 * @param keyOfFetchUrl 백엔드 서버에 요청 시 주소로 '/weather_react' 뒷 부분
 * @returns Promise<any>
 */
export const getAPIItems = async (
  apiUrl: string,
  keyOfFetchUrl: keyof typeof FETCH_URL,
  userAreaCode: string | number
): Promise<any | Error> => {
  const fetchBody = {
    url: apiUrl,
  };
  const fetchUrl = FETCH_URL[keyOfFetchUrl];
  const sessionItemKey = `user_${[fetchUrl]}`;
  const sessionStorageItem = sessionStorage.getItem(sessionItemKey);
  if (sessionStorageItem) {
    const item = JSON.parse(sessionStorageItem);
    if (item.apiUrl === apiUrl && item.areaCode === userAreaCode) return item;
  }
  try {
    const result = await (
      await fetch(`/weather_react/${fetchUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchBody),
      })
    ).json();
    if (result.message === undefined) {
      sessionStorage.setItem(
        sessionItemKey,
        JSON.stringify({
          ...result,
          apiUrl: apiUrl,
          areaCode: userAreaCode,
        })
      );
      return result;
    } else {
      const error = new Error(result.message);
      return error;
    }
  } catch (error) {
    return new Error(`[Error] Fail fetch ${fetchUrl}`);
  }
};
