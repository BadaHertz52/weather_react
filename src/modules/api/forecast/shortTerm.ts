//단기 예보관련 데이버 수집
import { SVF_BASE_TIME } from "../../../constants";
import {
  SFcstItem,
  SVFBaseTime,
  SVFDay,
  SVFTime,
  SVFcst,
  USNcst,
  USNcstItem,
} from "../types";
import { getAPIItems, getSFApiUrl } from "../index";

/**
 * 현재 시점에 대한 초단기 실황 api 데이터를 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate_yesterday  발표일자(yyyymmdd)
 * @param baseDate_today  발표일자(yyyymmdd)
 * @param fcstTime   현재 시각
 * @param preFcstTime
 * @param minutes
 * @param hours
 * @return Promise<USNcst|string> fcstTime 기준으로 6시간 이내의 예보
 */
export const getUSNcast = async (
  nx: string,
  ny: string,
  baseDate_yesterday: string,
  baseDate_today: string,
  fcstTime: string,
  preFcstTime: string,
  minutes: number,
  hours: number,
  userAreaCode: string | number
) => {
  const baseDate =
    minutes < 40 && hours === 0 ? baseDate_yesterday : baseDate_today;
  const baseTime =
    minutes < 40 ? (hours === 0 ? "2300" : preFcstTime) : fcstTime;
  const url = getSFApiUrl("ultraSrtNcst", nx, ny, baseDate, baseTime, "16");
  const items = await getAPIItems(url, "usncst", userAreaCode);
  if (items instanceof Error) {
    return items;
  } else {
    const uNcst: USNcst = {
      baseDate: baseDate,
      baseTime: fcstTime,
      pty: items.item.filter((i: USNcstItem) => i.category === "PTY")[0]
        .obsrValue,
      reh: items.item.filter((i: USNcstItem) => i.category === "REH")[0]
        .obsrValue,
      rn1: items.item.filter((i: USNcstItem) => i.category === "RN1")[0]
        .obsrValue,
      t1h: Number(
        items.item.filter((i: USNcstItem) => i.category === "T1H")[0].obsrValue
      ),
      vec: Number(
        items.item.filter((i: USNcstItem) => i.category === "VEC")[0].obsrValue
      ),
      wsd: items.item.filter((i: USNcstItem) => i.category === "WSD")[0]
        .obsrValue,
    };
    return uNcst;
  }
};
/**
 * targetDaySVF를 SVFDay의 형식으로 변경한 객체
 */
export const getDaySvf = (
  array: string[],
  targetDaySVF: SFcstItem[],
  fcstData: string,
  tmn: SFcstItem,
  tmx: SFcstItem
): SVFTime[] => {
  return array.map((t: string) => {
    const timeSVF = targetDaySVF.filter((i: SFcstItem) => i.fcstTime === t);
    const fcast: SVFTime = {
      fcstDate: fcstData,
      fcstTime: t,
      pop: timeSVF.filter((i: SFcstItem) => i.category === "POP")[0].fcstValue,
      pty: timeSVF.filter((i: SFcstItem) => i.category === "PTY")[0].fcstValue,
      pcp: timeSVF.filter((i: SFcstItem) => i.category === "PCP")[0].fcstValue,
      reh: timeSVF.filter((i: SFcstItem) => i.category === "REH")[0].fcstValue,
      sno: timeSVF.filter((i: SFcstItem) => i.category === "SNO")[0].fcstValue,
      sky: Number(
        timeSVF.filter((i: SFcstItem) => i.category === "SKY")[0].fcstValue
      ),
      tmp: Number(
        timeSVF.filter((i: SFcstItem) => i.category === "TMP")[0].fcstValue
      ),
      tmn: tmn.fcstValue,
      tmx: tmx.fcstValue,
      vec: Number(
        timeSVF.filter((i: SFcstItem) => i.category === "VEC")[0].fcstValue
      ),
      wsd: timeSVF.filter((i: SFcstItem) => i.category === "WSD")[0].fcstValue,
    };
    return fcast;
  });
};
/**
 * 단기 예보 api를 받아와서 해당 데이터를 자정부터 23사까자 시간별로 예보가 담긴 객체를 날짜별로 나열한 SVFcst type으로 변경해 반환 하는 비동기 함수
 * @param nx 예보 지점 x 좌표
 * @param ny  예보 지점 y 좌표
 * @param baseDate  예보 발표 일자 (오늘 일자)
 * @param baseTime  예보 발표 시각 (예보 시각 중 현재 시각과 가장 가까운 시간)
 * @param yesterday 어제 일자
 * @param timArray  00:00 23:00 까지 string type의 시간을 담은 배열
 * @param todayTimeArray  현재 시각으로 부터 남은 시간 배열
 * @param svfDays  오늘 부터 2일 이후의 날짜들을 담은 배열
 * @returns  Promise<SVFcst|string>
 */
export const getSVFcast = async (
  nx: string,
  ny: string,
  baseDate: string,
  baseTime: SVFBaseTime,
  yesterday: string,
  timeArray: string[],
  todayTimeArray: string[],
  svfDays: string[],
  userAreaCode: string | number
): Promise<SVFcst | Error> => {
  const url1 = getSFApiUrl("vilageFcst", nx, ny, yesterday, "2300", "10000");
  const url2 = getSFApiUrl(
    "vilageFcst",
    nx,
    ny,
    baseDate,
    SVF_BASE_TIME[baseTime],
    "10000"
  );
  const items1 = await getAPIItems(url1, "svfcast", userAreaCode);
  const items2 = await getAPIItems(url2, "svfcast", userAreaCode);
  if (!(items1 instanceof Error) && !(items2 instanceof Error)) {
    /**
     * timeArray에서 todayTimeArray를 제한 것으로,예보 발표시각 이전의 예보를 선별하는데 사용함
     */
    const previousTime = timeArray.slice(0, 24 - todayTimeArray.length);
    const tmn = items2.item.filter((i: SFcstItem) => i.category === "TMN")[0];
    const tmx = items2.item.filter((i: SFcstItem) => i.category === "TMX")[0];
    const filteredItem1: SFcstItem[] = items1.item.filter(
      (i: SFcstItem) =>
        i.fcstDate === baseDate && previousTime.includes(i.fcstTime)
    );
    const preSVDay: SVFDay | undefined =
      filteredItem1[0] !== undefined
        ? getDaySvf(previousTime, filteredItem1, baseDate, tmn, tmx)
        : undefined;
    const sVFcst: SVFcst = svfDays.slice(0, 3).map((d: string) => {
      /**
       * items2 중에 오늘, 1일 후,2일 후 ,3일 후 중 타켓이 되는 날에 대한 단기 예보
       */
      const targetDaySVF: SFcstItem[] = items2.item.filter(
        (i: SFcstItem) => i.fcstDate === d
      );

      if (d === baseDate) {
        const daySVFcst: SVFDay = getDaySvf(
          todayTimeArray,
          targetDaySVF,
          d,
          tmn,
          tmx
        );
        return preSVDay !== undefined ? [...preSVDay, ...daySVFcst] : daySVFcst;
      } else {
        const daySVFcst: SVFDay = getDaySvf(
          timeArray,
          targetDaySVF,
          d,
          tmn,
          tmx
        );
        return daySVFcst;
      }
    });

    return sVFcst;
  } else {
    if (items1 instanceof Error) {
      if (items2 instanceof Error) {
        const error = new Error(`error 1: ${items1}// error2 : ${items2}`);
        return error;
      } else {
        return items1;
      }
    } else {
      return items2;
    }
  }
};
