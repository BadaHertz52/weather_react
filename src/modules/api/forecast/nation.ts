import { AREA_ARRAY } from "../../../constants";
import { Area, AreaInform, Day, NationType } from "../../weather";
import { MidFcst, SVFBaseTime, SVFcst } from "../types";
import { changeMidToDay, changeNType, changeSvfToDay } from "./changeUtils";
import { getMidFcast } from "./middleTerm";
import { getSVFcast, getUSNcast } from "./shortTerm";
import { getUSSkyCode } from "./sky";

/**
 * weather 의 nation 값을 반환
 * @param baseDate_skyCode
 * @param baseDate_svf
 * @param baseDate_today
 * @param baseDate_yesterday
 * @param hours
 * @param baseTime_skyCode
 * @param fcstTime
 * @param preFcstTime
 * @param minutes
 * @param hours
 * @param baseTime_svf
 * @param timeArray
 * @param todayTimeArray
 * @param svfDays
 * @returns  Promise<Error | Area[]>
 */
export const getNationData = async (
  baseDate_skyCode: string,
  baseDate_svf: string,
  baseDate_today: string,
  baseDate_yesterday: string,
  baseTime_skyCode: string,
  fcstTime: string,
  preFcstTime: string,
  minutes: number,
  hours: number,
  baseTime_svf: SVFBaseTime,
  timeArray: string[],
  todayTimeArray: string[],
  svfDays: string[],
  userAreaCode: string | number
): Promise<NationType> => {
  const sessionItemKey = "nation_data";
  const sessionStorageItem = sessionStorage.getItem(sessionItemKey);
  if (sessionStorageItem) {
    const item = JSON.parse(sessionStorageItem) as NationType;
    if (item.searchTime === fcstTime) return item;
  }
  const getData = async (item: AreaInform) => {
    const { nX, nY } = changeNType(item.sfGrid);
    const { landRegId, taRegId } = item;
    const skyCode = await getUSSkyCode(
      nX,
      nY,
      baseDate_skyCode,
      baseTime_skyCode,
      fcstTime,
      userAreaCode
    );

    const nowWeather = await getUSNcast(
      nX,
      nY,
      baseDate_yesterday,
      baseDate_today,
      fcstTime,
      preFcstTime,
      minutes,
      hours,
      userAreaCode
    );

    const sVFcst = await getSVFcast(
      nX,
      nY,
      baseDate_svf,
      baseTime_svf,
      baseDate_yesterday,
      timeArray,
      todayTimeArray,
      svfDays,
      userAreaCode
    );

    const midFcst =
      landRegId && taRegId
        ? await getMidFcast(
            landRegId,
            taRegId,
            baseDate_today,
            baseDate_yesterday,
            hours,
            userAreaCode
          )
        : landRegId === undefined
        ? taRegId === undefined
          ? new Error("[Error] landRegId and taRegId are undefined")
          : new Error("[Error] landRegId is undefined")
        : new Error("[Error] taRegId is undefined");

    if (
      !(sVFcst instanceof Error) &&
      !(midFcst instanceof Error) &&
      !(skyCode instanceof Error) &&
      !(nowWeather instanceof Error)
    ) {
      const svfDay: Day[] = changeSvfToDay(sVFcst as SVFcst);
      const midDay: Day[] = changeMidToDay(midFcst as MidFcst);

      const area: Area = {
        areaInform: {
          ...item,
        },
        day: [...svfDay, ...midDay],
        now: {
          temp: nowWeather.t1h,
          sky: skyCode,
        },
      };
      return area;
    } else {
      const area: Area = {
        areaInform: {
          ...item,
        },
        day: null,
        now: null,
      };
      return area;
    }
  };

  let areaData: Area[] = [
    {
      areaInform: AREA_ARRAY[0],
      day: null,
      now: null,
    },
  ];

  for (let i = 0; i < AREA_ARRAY.length; i++) {
    const item = AREA_ARRAY[i];
    const data = await getData(item);
    if (i === 0) {
      areaData = [data];
    } else {
      areaData.push(data);
    }
  }
  const newNationData: NationType = {
    searchTime: fcstTime,
    areas: areaData,
  };
  sessionStorage.setItem(sessionItemKey, JSON.stringify(newNationData));
  return newNationData;
};
