import { Day, HourWeather, SunRiseAndSet, WeatherState } from "../../weather";
import { PmGrade, SVFcst, SVFTime } from "../types";
import { getWsd } from "../wind";
import { SFGridItem } from "../../position";
import { findLandTaCode, getApAreaCode } from "../area";
import { ApiAreaCode } from "../types";
import {
  getSkyCode,
  getUSSkyCode,
  getUSNcast,
  getSVFcast,
  getMidFcast,
  getApFcst,
  getApNow,
  getSunInform,
  changeMidToDay,
  changeNType,
  changeSvfToDay,
  getTimeData,
} from "./index";

interface GetMidForecastParams {
  landRegId: string | undefined;
  taRegId: string | undefined;
  baseDate_today: string;
  baseDate_yesterday: string;
  hours: number;
  userAreaCode: number;
}
/**
 * 지역별 기상 데이터를 가져오는 함수
 */
const getMidForecast = async ({
  landRegId,
  taRegId,
  baseDate_today,
  baseDate_yesterday,
  hours,
  userAreaCode,
}: GetMidForecastParams) => {
  if (landRegId && taRegId) {
    return getMidFcast(
      landRegId,
      taRegId,
      baseDate_today,
      baseDate_yesterday,
      hours,
      userAreaCode
    );
  }

  throw new Error(
    landRegId === undefined && taRegId === undefined
      ? "[Error] landRegId and taRegId are undefined"
      : landRegId === undefined
      ? "[Error] landRegId is undefined"
      : "[Error] taRegId is undefined"
  );
};

interface GetTomorrowApGradeParams {
  hours: number;
  minutes: number;
  baseDate_today: string;
  svfDays: string[];
  sidoName: ApiAreaCode;
  sfGrid: SFGridItem;
  userAreaCode: number;
}
/**
 * 내일의 미세먼지 예보를 가져오는 함수
 */
const getTomorrowApGrade = async ({
  hours,
  minutes,
  baseDate_today,
  sidoName,
  sfGrid,
  userAreaCode,
  svfDays,
}: GetTomorrowApGradeParams) => {
  return hours > 5 || (hours === 5 && minutes > 10)
    ? getApFcst({
        baseDate: baseDate_today,
        tBaseDate: svfDays[1],
        sidoName,
        sfGrid,
        userAreaCode,
      })
    : { pm10Grade: null, pm25Grade: null };
};

const changeHourItem = (t: SVFTime): HourWeather => ({
  date: t.fcstDate,
  hour: t.fcstTime,
  sky: getSkyCode(t.sky),
  temp: t.tmp,
  pop: t.pop,
  pcp: t.pcp,
  sno: t.sno,
  wind: {
    vec: getWsd(t.wsd, t.vec),
    wsd: t.wsd,
  },
  reh: t.reh,
});

interface GetWeatherStateParams {
  skyCode: any;
  uSNcst: any;
  sVFcst: SVFcst;
  midFcst: any;
  nowApGrade: PmGrade | Error;
  tomorrowApGrade: PmGrade | Error;
  sunInformation: SunRiseAndSet[];
  todayTimeArray: string[];
  svfDays: string[];
}
/**
 * 날씨 데이터를 가져와 `WeatherState` 형태로 변환하는 함수
 */
const getWeatherState = ({
  skyCode,
  uSNcst,
  sVFcst,
  midFcst,
  nowApGrade,
  tomorrowApGrade,
  sunInformation,
  todayTimeArray,
  svfDays,
}: GetWeatherStateParams): WeatherState => {
  const targetSVFcst = sVFcst.map((i, index) =>
    index === 0
      ? i.filter((t: SVFTime) => todayTimeArray.includes(t.fcstTime))
      : i
  );

  const svfDay: Day[] = changeSvfToDay(sVFcst);
  const midDay: Day[] = changeMidToDay(midFcst);

  const threeDay = targetSVFcst.slice(0, 3).map((d, index) => ({
    date: svfDays[index],
    hourly: d.map(changeHourItem),
  }));

  return {
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
      am: svfDay[1]?.am,
      pm: svfDay[1]?.pm,
      tmn: svfDay[1]?.tmn,
      tmx: svfDay[1]?.tmx,
    },
    threeDay,
    week: [...svfDay, ...midDay],
    nation: null,
    sunRiseAndSet: [...sunInformation],
  };
};

interface FetchWeatherDataParams {
  sfGrid: SFGridItem;
  longitude: string;
  latitude: string;
}

const fetchWeatherData = async ({
  sfGrid,
  longitude,
  latitude,
}: FetchWeatherDataParams) => {
  const userAreaCode = Number(sfGrid.areaCode);
  const { nX, nY } = changeNType(sfGrid);
  const stationName = [sfGrid.arePt1, sfGrid.arePt2, sfGrid.arePt3].filter(
    Boolean
  );
  const { landRegId, taRegId } = findLandTaCode(sfGrid);
  const sidoName: ApiAreaCode = getApAreaCode(sfGrid);
  const timeData = getTimeData();

  try {
    const [
      skyCode,
      uSNcst,
      sVFcst,
      midFcst,
      nowApGrade,
      tomorrowApGrade,
      sunInformation,
    ] = await Promise.all([
      getUSSkyCode(
        nX,
        nY,
        timeData.baseDate_skyCode,
        timeData.baseTime_skyCode,
        timeData.fcstTime,
        userAreaCode
      ),
      getUSNcast(
        nX,
        nY,
        timeData.baseDate_yesterday,
        timeData.baseDate_today,
        timeData.fcstTime,
        timeData.preFcstTime,
        timeData.minutes,
        timeData.hours,
        userAreaCode
      ),
      getSVFcast(
        nX,
        nY,
        timeData.baseDate_svf,
        timeData.baseTime_svf,
        timeData.baseDate_yesterday,
        timeData.timeArray,
        timeData.todayTimeArray,
        timeData.svfDays,
        userAreaCode
      ),
      getMidForecast({
        landRegId,
        taRegId,
        baseDate_today: timeData.baseDate_today,
        baseDate_yesterday: timeData.baseDate_yesterday,
        hours: timeData.hours,
        userAreaCode,
      }),
      getApNow(sidoName, stationName, userAreaCode),
      getTomorrowApGrade({
        hours: timeData.hours,
        minutes: timeData.minutes,
        baseDate_today: timeData.baseDate_today,
        svfDays: timeData.svfDays,
        sidoName,
        sfGrid,
        userAreaCode,
      }),
      getSunInform(longitude, latitude, timeData.svfDays, userAreaCode),
    ]);

    return {
      skyCode,
      uSNcst,
      sVFcst,
      midFcst,
      nowApGrade,
      tomorrowApGrade,
      sunInformation,
      timeData,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

/**
 * 날씨 데이터를 가져오는 메인 함수
 */
export const getWeatherData = async (
  params: FetchWeatherDataParams
): Promise<Error | WeatherState> => {
  try {
    const {
      skyCode,
      uSNcst,
      sVFcst,
      midFcst,
      nowApGrade,
      tomorrowApGrade,
      sunInformation,
      timeData,
    } = await fetchWeatherData(params);

    if (sVFcst instanceof Error) return sVFcst;

    if (sunInformation.some(i => i instanceof Error)) {
      return new Error("[Error] Sun Information API failed.");
    }

    return getWeatherState({
      skyCode,
      uSNcst,
      sVFcst,
      midFcst,
      nowApGrade,
      tomorrowApGrade,
      sunInformation: sunInformation as SunRiseAndSet[],
      todayTimeArray: timeData.todayTimeArray,
      svfDays: timeData.svfDays,
    });
  } catch (error) {
    console.error(error);
    return error instanceof Error
      ? error
      : new Error("Unknown error occurred.");
  }
};
