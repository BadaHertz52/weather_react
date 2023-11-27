import {
  DailyWeather,
  Day,
  HourWeather,
  SunRiseAndSet,
  WeatherState,
} from "../../weather";
import { PmGrade, SVFDay, SVFTime } from "../types";
import { getWsd } from "../wind";
import { SFGridItem } from "../../position";
import { findLandTaCode, getApAreaCode } from "../area";
import { ApiAreaCode } from "../types";
import {
  getSkyCode,
  getUSSkyCode,
  getTimeData,
  getSVFcast,
  getUSNcast,
  getMidFcast,
  getApFcst,
  getApNow,
  getSunInform,
  changeMidToDay,
  changeNType,
  changeSvfToDay,
} from "./index";
/**
 * 현 위치에 대한  현재 날씨, 앞으로의 기상 전망, 일몰,전국 날씨를 반환하거나 error 메시지가 담긴 글을 반환
 * @param sfGrid
 * @param longitude
 * @param latitude
 * @returns
 */
export const getWeatherData = async (
  sfGrid: SFGridItem,
  longitude: string,
  latitude: string
): Promise<Error | WeatherState> => {
  const userAreaCode = sfGrid.areaCode;
  const { nX, nY } = changeNType(sfGrid);
  const stationName: string[] =
    sfGrid.arePt3 !== null && sfGrid.arePt2 !== null
      ? [sfGrid.arePt1, sfGrid.arePt2, sfGrid.arePt3]
      : sfGrid.arePt2 !== null
      ? [sfGrid.arePt1, sfGrid.arePt2]
      : [sfGrid.arePt1];
  const { landRegId, taRegId } = findLandTaCode(sfGrid);
  const sidoName: ApiAreaCode = getApAreaCode(sfGrid);
  const {
    hours,
    minutes,
    threeDays,
    baseDate_today,
    baseDate_yesterday,
    baseDate_skyCode,
    baseDate_svf,
    baseTime_svf,
    preFcstTime,
    fcstTime,
    baseTime_skyCode,
    timeArray,
    todayTimeArray,
  } = getTimeData();
  //get api data
  const skyCode = await getUSSkyCode(
    nX,
    nY,
    baseDate_skyCode,
    baseTime_skyCode,
    fcstTime,
    userAreaCode
  );
  const uSNcst = await getUSNcast(
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
    threeDays,
    userAreaCode
  );
  const midFcst =
    landRegId !== undefined && taRegId !== undefined
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
  const nowApGrade: PmGrade | Error = await getApNow(
    sidoName,
    stationName,
    userAreaCode
  );

  const tomorrowApGrade: PmGrade | Error =
    hours > 5 || (hours === 5 && minutes > 10)
      ? await getApFcst(
          baseDate_today,
          threeDays[1],
          sidoName,
          sfGrid,
          userAreaCode
        )
      : {
          pm10Grade: null,
          pm25Grade: null,
        };

  const sunInform: (Error | SunRiseAndSet)[] = await getSunInform(
    longitude,
    latitude,
    threeDays,
    userAreaCode
  );
  // const nationData: NationType = await getNationData(
  //   baseDate_skyCode,
  //   baseDate_today,
  //   baseDate_yesterday,
  //   baseTime_skyCode,
  //   fcstTime,
  //   preFcstTime,
  //   minutes,
  //   hours,
  //   userAreaCode
  // );
  //state로 변경
  const changeHourItem = (t: SVFTime): HourWeather => ({
    date: t.fcstDate,
    hour: t.fcstTime,
    sky: getSkyCode(t.sky),
    temp: t.tmp,
    //강수확률(%)
    pop: t.pop,
    //강수량(mm)
    pcp: t.pcp,
    sno: t.sno,
    wind: {
      vec: getWsd(t.wsd, t.vec),
      wsd: t.wsd,
    },
    reh: t.reh,
  });
  const sunInformHasError = sunInform
    .map((i) => i instanceof Error)
    .includes(true);
  if (
    !(skyCode instanceof Error) &&
    !(sVFcst instanceof Error) &&
    !(uSNcst instanceof Error) &&
    !(midFcst instanceof Error) &&
    !sunInformHasError
  ) {
    const targetSVFcst = sVFcst.map((i: SVFDay) => {
      if (sVFcst.indexOf(i) === 0) {
        return sVFcst[0].filter((t: SVFTime) =>
          todayTimeArray.includes(t.fcstTime)
        );
      } else {
        return i;
      }
    });
    const svfDay: Day[] = changeSvfToDay(sVFcst);
    const midDay: Day[] = changeMidToDay(midFcst);
    const threeDay = targetSVFcst.map((d: SVFDay) => {
      const daily: DailyWeather = {
        date: threeDays[targetSVFcst.indexOf(d)],
        hourly: d.map((t: SVFTime) => changeHourItem(t)),
      };
      return daily;
    });
    const weather: WeatherState = {
      state: "success",
      error: null,
      nowWeather: {
        tmp: uSNcst.t1h,
        sky: skyCode,
        reh: uSNcst.reh,
        wind: {
          vec: getWsd(uSNcst.wsd, uSNcst.vec),
          wsd: uSNcst.wsd,
        },
        pm10Grade: nowApGrade instanceof Error ? null : nowApGrade.pm10Grade,
        pm25Grade: nowApGrade instanceof Error ? null : nowApGrade.pm25Grade,
      },
      tomorrowWeather: {
        pm10Grade:
          tomorrowApGrade instanceof Error ? null : tomorrowApGrade.pm10Grade,
        pm25Grade:
          tomorrowApGrade instanceof Error ? null : tomorrowApGrade.pm25Grade,
        am: svfDay[1].am,
        pm: svfDay[1].pm,
        tmn: svfDay[1].tmn,
        tmx: svfDay[1].tmx,
      },
      threeDay: threeDay,
      week: [...svfDay, ...midDay],
      nation: null,
      sunRiseAndSet: [...sunInform],
    };

    return weather;
  } else {
    const errorData = {
      skyCode: skyCode instanceof Error,
      sVFcst: sVFcst instanceof Error,
      uSNcst: uSNcst instanceof Error,
      midFcst: midFcst instanceof Error,
      nowApGrade: nowApGrade instanceof Error,
      tomorrowApGrade: tomorrowApGrade instanceof Error,
      sunInform: sunInformHasError,
    };
    const error = new Error(`[Error : weather data]:${errorData}`);
    console.error(error);
    return error;
  }
};
