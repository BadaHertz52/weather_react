import {
  ApFcstAreaCode,
  ApiAreaCode,
  MidLandAreaCode,
  midLandAreaCodeZip,
  midTaArea,
  midTaAreaCode,
  MidTaAreaCode,
  west,
} from "./areaCodeType";
import {
  Area,
  areaArray,
  AreaInform,
  DailyWeather,
  Day,
  getSkyCode,
  getSkyType,
  getWsd,
  gradeArray,
  HourWeather,
  NationType,
  PmType,
  SkyCodeType,
  SunRiseAndSet,
  WeatherState,
} from "./weather/types";
import {
  USNcstItem,
  SVFcst,
  USNcst,
  SFcstItem,
  SVFTime,
  SVFDay,
  MidFcst,
  PmGrade,
  ApNowItem,
  SVFBaseTime,
  KakaoDocumentType,
  MidFcstDay,
  ApFcstItem,
} from "./apiType";
import { sfGrid } from "./sfGrid";
import { SFGridItem } from "./position/types";

const returnApiUrl = (sort: string): string => {
  const base = `https://apis.data.go.kr/1360000/${sort}`;
  return base;
};
//inqury_short
/**
 * 초단기실황조회 :현재
 */
const inqury_short_ultraSrtNcst = "getUltraSrtNcst";
/**
 * 초단기예보조회 : 현재부터 6시간 이내
 */
const inqury_short_ultraSrtFcst = "getUltraSrtFcst";
/**
 * 단기예보조회 :현재부터 3일 이내
 */
const inqury_short_vilageFcst = "getVilageFcst";

/**
 * 중기 육상예보:강수확률,날씨
 */
const inqury_mid_midLandFcst = "getMidLandFcst";
/**
 * 중기기온조회
 */
const inqury_mid_midTa = "getMidTa";

/**
 * 시도별 실시간 대기오염 측정 정보 조회
 */
const inqury_air_ctprvnRltmMesureDnsty = "getCtprvnRltmMesureDnsty";
/**
 * 시도별 대기오염 예보
 */
const inqury_air_minuDustFrcstDspth = "getMinuDustFrcstDspth";

type SFInqury =
  | typeof inqury_short_ultraSrtFcst
  | typeof inqury_short_ultraSrtNcst
  | typeof inqury_short_vilageFcst;

type Api = {
  url: string;
  inqury: string;
};

/**
 * Api for short-term forecast
 */

const shortFcstApi: Api = {
  url: returnApiUrl("VilageFcstInfoService_2.0"),
  inqury:
    inqury_short_ultraSrtFcst ||
    inqury_short_ultraSrtNcst ||
    inqury_short_vilageFcst,
};
/**
 * Api for medium term forecas
 */
const midFcstApi: Api = {
  url: returnApiUrl("MidFcstInfoService"),
  inqury: inqury_mid_midLandFcst || inqury_mid_midTa,
};

/**
 * Api for air pollution
 */
const apInformApi: Api = {
  url: "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc",
  inqury: inqury_air_ctprvnRltmMesureDnsty || inqury_air_minuDustFrcstDspth,
};

/**
 * Api for sunset and sunrise
 */
const sunApi: Api = {
  url: "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService",
  inqury: "getLCRiseSetInfo",
};

/**
 * url 에 요청을 보내 외부 api에서 data를 가져오는 함수
 * @param apiUrl  데이터를 가져올 api 주소
 * @param fetchUrl 백엔드 서버에 요청 시 주소로 '/weather_react' 뒷 부분
 * @returns Promise<any>
 */
const getAPIItems = async (
  apiUrl: string,
  fetchUrl: string,
  userAreaCode: string | number
): Promise<any | Error> => {
  const fetchBody = {
    url: apiUrl,
  };
  const sessionItemKey = `user_${fetchUrl}`;
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
/**
 * 초단기 실황, 초단기 예보, 단기 예보 api를 요청할 때 사용할 url을 반환하는 함수
 * @param inqury api 조회 기능
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param baseTime  발표시간(tt00)
 * @returns url (type string)
 */
const getSFApiUrl = (
  inqury: SFInqury,
  nx: string,
  ny: string,
  baseDate: string,
  baseTime: string,
  numOfRows: string
) => {
  const url = `${shortFcstApi.url}/${inqury}?dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&numOfRows=${numOfRows}`;
  return url;
};
/**
 * 현재 시점에 대한 초단기 예보 api 데이터 중 SKY에 대한 값을 SkyType으로 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param fcstTime 현재 시
 * @return Promise<SkyCodeType| string>
 */
const getUSSkyCode = async (
  nx: string,
  ny: string,
  baseDate: string,
  baseTime: string,
  fcstTime: string,
  userAreaCode: string | number
): Promise<SkyCodeType | Error> => {
  const numOfRows = JSON.stringify(10000);
  const url = getSFApiUrl(
    inqury_short_ultraSrtFcst,
    nx,
    ny,
    baseDate,
    baseTime,
    numOfRows
  );
  const items =  await getAPIItems(url, "sky", userAreaCode);
  if (items instanceof Error) {
    return items;
  } else {
    const skyItems = items.item.filter((i: SFcstItem) => i.category === "SKY");
    const targetItem: SFcstItem = skyItems.filter(
      (i: SFcstItem) => (i.fcstTime = fcstTime)
    )[0];
    const skyCode = getSkyCode(Number(targetItem.fcstValue));
    return skyCode;
  }
};
/**
 * 현재 시점에 대한 초단기 실황 api 데이터를 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate_yeaterday  발표일자(yyyymmdd)
 * @param baseDate_today  발표일자(yyyymmdd)
 * @param fcstTime   현재 시각
 * @param preFcstTime
 * @param minutes
 * @param hours
 * @return Promise<USNcst|string> fcstTime 기준으로 6시간 이내의 예보
 */
const getUSNcast = async (
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
  const url = getSFApiUrl("getUltraSrtNcst", nx, ny, baseDate, baseTime, "16");
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
const getDaySvf = (
  srray: string[],
  targetDaySVF: SFcstItem[],
  fcstData: string,
  tmn: SFcstItem,
  tmx: SFcstItem
): SVFTime[] => {
  return srray.map((t: string) => {
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
 * @param threeDays  오늘 부터 2일 이후의 날짜들을 담은 배열
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
  threeDays: string[],
  userAreaCode: string | number
): Promise<SVFcst | Error> => {
  const url1 = getSFApiUrl(
    inqury_short_vilageFcst,
    nx,
    ny,
    yesterday,
    "2300",
    "10000"
  );
  const url2 = getSFApiUrl(
    inqury_short_vilageFcst,
    nx,
    ny,
    baseDate,
    baseTime,
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
    const fiteredItem1: SFcstItem[] = items1.item.filter(
      (i: SFcstItem) =>
        i.fcstDate === baseDate && previousTime.includes(i.fcstTime)
    );
    const preSVDay: SVFDay | undefined =
      fiteredItem1[0] !== undefined
        ? getDaySvf(previousTime, fiteredItem1, baseDate, tmn, tmx)
        : undefined;
    const sVFcst: SVFcst = threeDays.map((d: string) => {
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

/**
 *
 * @param landRegId 중기 육상 예보 요청 메세지에 필요한 지역코드
 * @param taRegId  중기 기온 예보 요청 메세지에 필요한 지역코드
 * @param today 오늘 (형태:YYYDD)
 * @param yesterday 어제 (형태:YYYDD)
 * @param hours 현재 시각
 * @returns Promise<MidFcst|string>
 */
export const getMidFcast = async (
  landRegId: MidLandAreaCode,
  taRegId: MidTaAreaCode,
  today: string,
  yesterday: string,
  hours: number,
  userAreaCode: string | number
): Promise<MidFcst | Error> => {
  const tmFcTime: string = hours < 6 || hours > 18 ? "1800" : "0600";
  const tmFcDate = hours < 6 ? yesterday : today;
  /**
   * 중기 육상/기온 예보 요청 메세지를 보낼 때 필요한 예보 발표시각 ( 형태: YYMMDDTTMM) (일 2회(06:00,18:00)회 생성)
   */
  const tmFc = `${tmFcDate}${tmFcTime}`;
  const common = (tmFc: string) => `dataType=JSON&tmFc=${tmFc}`;
  const landUrl = (tmFc: string) =>
    `${midFcstApi.url}/${inqury_mid_midLandFcst}?regId=${landRegId}&${common(
      tmFc
    )}`;
  const taUrl = (tmFc: string) =>
    `${midFcstApi.url}/${inqury_mid_midTa}?regId=${taRegId}&${common(tmFc)}`;
  let landItems = await getAPIItems(
    landUrl(tmFc),
    "midFcast_landItems",
    userAreaCode
  );
  let taItems = await getAPIItems(
    taUrl(tmFc),
    "midFcast_taItems",
    userAreaCode
  );

  if (!(landItems instanceof Error) && !(taItems instanceof Error)) {
    if (tmFcTime === "1800") {
      const newTmFc = `${tmFcDate}0600`;
      const newLandUrl = landUrl(newTmFc);
      const newTaUrl = taUrl(newTmFc);
      const newLandItems = await getAPIItems(
        newLandUrl,
        "midFcast_landItems",
        userAreaCode
      );
      const newTaItems = await getAPIItems(
        newTaUrl,
        "midFcast_taItems",
        userAreaCode
      );
      if (!(newLandItems instanceof Error) && !(newTaItems instanceof Error)) {
        landItems = {
          ...landItems,
          wf3Am: newLandItems.item[0].wf3Am,
          wf3Pm: newLandItems.item[0].wf3Pm,
          rnSt3Am: newLandItems.item[0].rnSt3Am,
          rnSt3Pm: newLandItems.item[0].rnSt3Pm,
        };
        taItems = {
          ...taItems,
          taMax3: newTaItems.item[0].taMax3,
          taMin3: newTaItems.item[0].taMin3,
        };
      }
    }
    const midFcst: MidFcst = [
      {
        dayLater: 3,
        wfAm: landItems.item[0].wf3Am,
        wfPm: landItems.item[0].wf3Pm,
        rnStAm: landItems.item[0].rnSt3Am,
        rnStPm: landItems.item[0].rnSt3Pm,
        taMax: taItems.item[0].taMax3,
        taMin: taItems.item[0].taMin3,
      },
      {
        dayLater: 4,
        wfAm: landItems.item[0].wf4Am,
        wfPm: landItems.item[0].wf4Pm,
        rnStAm: landItems.item[0].rnSt4Am,
        rnStPm: landItems.item[0].rnSt4Pm,
        taMax: taItems.item[0].taMax4,
        taMin: taItems.item[0].taMin4,
      },
      {
        dayLater: 5,
        wfAm: landItems.item[0].wf5Am,
        wfPm: landItems.item[0].wf5Pm,
        rnStAm: landItems.item[0].rnSt5Am,
        rnStPm: landItems.item[0].rnSt5Pm,
        taMax: taItems.item[0].taMax5,
        taMin: taItems.item[0].taMin5,
      },
      {
        dayLater: 6,
        wfAm: landItems.item[0].wf6Am,
        wfPm: landItems.item[0].wf6Pm,
        rnStAm: landItems.item[0].rnSt6Am,
        rnStPm: landItems.item[0].rnSt6Pm,
        taMax: taItems.item[0].taMax6,
        taMin: taItems.item[0].taMin6,
      },
    ];
    return midFcst;
  } else {
    if (landItems instanceof Error) {
      if (taItems instanceof Error) {
        const error = new Error(
          ` error1 : ${landItems}  ///  error2:${taItems}`
        );
        return error;
      } else {
        return landItems;
      }
    } else {
      return taItems;
    }
  }
};
/**
 * 실시간 미세먼지, 초미세먼지 등급을 반환하는 함수
 * @param sidoName
 * @param stationName (type: string[]) 측정 지역의 행정구역명을 시/도 ,구/군/시, 구/시, 읍/면/동, 리/동 으로 나누어 배열형태로 나타낸것
 * @returns Promise<PmGrade|string>
 */
const getApNow = async (
  sidoName: ApiAreaCode,
  stationName: string[],
  userAreaCode: string | number
): Promise<PmGrade | Error> => {
  const url = `${apInformApi.url}/${inqury_air_ctprvnRltmMesureDnsty}?sidoName=${sidoName}&returnType=JSON&numOfRows=100000&ver=1.3`;
  try {
    const result = await getAPIItems(url, "apNow", userAreaCode);
    if (result instanceof Error) {
      return result;
    } else {
      const items = result as ApNowItem[];
      const targetItem: ApNowItem = items.filter((i: ApNowItem) =>
        stationName.includes(i.stationName)
      )[0];

      const pm: PmGrade = {
        pm10Grade: gradeArray[Number(targetItem.pm10Grade) - 1],
        pm25Grade: gradeArray[Number(targetItem.pm25Grade) - 1],
      };
      return pm;
    }
  } catch (error) {
    const e = new Error(`[Error] Can't fetch /weather_react/apNow`);
    return e;
  }
};
/**
 * 'yyymmdd'를 'yyyy-mm-dd'로 변형해 반환하는 함수
 * @param baseDate 형태:yyymmdd
 * @returns
 */
function changeSearchDate(baseDate: string) {
  const year = baseDate.slice(0, 4);
  const month = baseDate.slice(4, 6);
  const date = baseDate.slice(6);
  const searchDate = `${year}-${month}-${date}`;
  return searchDate;
}

function findApFcstArea(
  sidoName: ApiAreaCode,
  sfGrid: SFGridItem
): ApFcstAreaCode {
  const targetSido = ["강원", "경기"];
  if (targetSido.includes(sidoName)) {
    const pt2 = sfGrid.arePt2;
    switch (sidoName) {
      case "강원":
        if (pt2 == null || !west.includes(pt2)) {
          // 강원도영동
          return "영동";
        } else {
          //강원도영서
          return "영서";
        }
      case "경기":
        const south = [
          "과천시",
          "광명시",
          "광주시",
          "군포시",
          "김포시",
          "부천시",
          "성남시",
          "수원시",
          "시흥시",
          "안산시",
          "안성시",
          "안양시",
          "여주시",
          "오산시",
          "용인시",
          "의왕시",
          "이천시",
          "평택시",
          "하남시",
          "화성시",
          "양평군",
        ];
        let isSouth: boolean = false;
        for (let i = 0; i < south.length; i++) {
          const element = south[i];
          if (pt2?.includes(element)) {
            isSouth = true;
            i = south.length;
          }
        }
        if (isSouth) {
          return "경기남부";
        } else {
          return "경기북부";
        }
      default:
        return sidoName;
    }
  } else {
    return sidoName;
  }
}
/**
 *  대기질 예보(오늘,내일,모레) 통보 조회
 * @param baseDate 오늘 날짜 (형식:yyyymmdd)
 * @param tBaseDate 내일 날짜 (형식:yyyymmdd)
 * @param sidoName 시도 이름
 */
const getApFcst = async (
  baseDate: string,
  tBaseDate: string,
  sidoName: ApiAreaCode,
  sfGrid: SFGridItem,
  userAreaCode: string | number
): Promise<PmGrade | Error> => {
  const searchDate = changeSearchDate(baseDate);
  const tSearchDate = changeSearchDate(tBaseDate);
  const apFcstArea = findApFcstArea(sidoName, sfGrid);
  const url = `${apInformApi.url}/${inqury_air_minuDustFrcstDspth}?returnType=JSON&numOfRows=100000&searchDate=${searchDate}`;
  try {
    const result = await getAPIItems(url, "apfcst", userAreaCode);
    if (result instanceof Error) {
      return result;
    } else {
      const items = result as ApFcstItem[];
      const tomorrowFcst = items.filter(
        (i: ApFcstItem) => i.informData === tSearchDate
      );
      const pm10Fcst = tomorrowFcst.filter(
        (i: ApFcstItem) => i.informCode === "PM10"
      )[0].informGrade;
      const pm25Fcst = tomorrowFcst.filter(
        (i: ApFcstItem) => i.informCode === "PM25"
      )[0].informGrade;
      function getPmGrade(pmData: string) {
        const indexOfSido = pmData.indexOf(apFcstArea);
        const sliced1 = pmData.slice(indexOfSido + sidoName.length + 1);
        const indexOfComma = sliced1.indexOf(",");
        const sliced2 = sliced1.slice(0, indexOfComma);
        const grade = gradeArray
          .map((g: PmType) => {
            if (g !== null && sliced2.includes(g)) {
              return g;
            } else {
              return null;
            }
          })
          .filter((i: PmType) => i !== null)[0];
        return grade;
      }
      const pm10Grade = getPmGrade(pm10Fcst);
      const pm25Grade = getPmGrade(pm25Fcst);
      const pmData: PmGrade = {
        pm10Grade: pm10Grade,
        pm25Grade: pm25Grade,
      };
      return pmData;
    }
  } catch (error) {
    const e = new Error("[Error] Can't fetch apNow");
    return e;
  }
};
/**
 *
 * @param longitude longitude ( 실수(초/100): 서울-126.98000833333333 )
 * @param latitude  latitude ( 실수 (초/100): 서울 -37.56356944444444)
 */
const getSunInform = async (
  longitude: string,
  latitude: string,
  threeDays: string[],
  userAreaCode: string | number
): Promise<(Error | SunRiseAndSet)[]> => {
  type Item = {
    url: string;
    date: string;
  };
  const getUrl = (date: string) =>
    `${sunApi.url}/${sunApi.inqury}?longitude=${longitude}&latitude=${latitude}&locdate=${date}&dnYn=Y`;
  const srray: Item[] = threeDays.map((d: string) => ({
    url: getUrl(d),
    date: d,
  }));
  const fetchSunApi = async (url: string, date: string) => {
    const informDate = date.slice(4);
    const sessionItemKey = `sunInfo_date_${informDate}`;
    const sessionStorageItem = sessionStorage.getItem(sessionItemKey);
    if (sessionStorageItem) {
      const item = JSON.parse(sessionStorageItem);
      if (item.apiUrl === url && item.areaCode === userAreaCode) {
        return item;
      }
    }
    try {
      const body = {
        url: url,
      };
      const result = await (
        await fetch("/weather_react/sunInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      ).json();
      if (result.message !== undefined) {
        const error = new Error(result.message);
        return error;
      } else {
        const changeTimeString = (string: string) => {
          const time = string.slice(0, 2);
          const min = string.slice(2);
          return `${time}:${min}`;
        };
        const inform: SunRiseAndSet = {
          date: informDate,
          sunRise: changeTimeString(result.sunrise),
          sunSet: changeTimeString(result.sunset),
        };
        sessionStorage.setItem(
          sessionItemKey,
          JSON.stringify({
            apiUrl: url,
            areaCode: userAreaCode,
            ...inform,
          })
        );
        return inform;
      }
    } catch (error) {
      const e = new Error(`${error}`);
      return e;
    }
  };

  return Promise.all(
    srray.map(async ({ url, date }) => {
      const inform = await fetchSunApi(url, date);
      return inform;
    })
  );
};

/**
 * kako API 에서 받아온 data를 활용해 적합한 sfGrid 값을 도출하는 함수
 * @param doc
 * @returns
 */
const findAreaGrid = (doc: KakaoDocumentType) => {
  const srray1 = sfGrid.filter((i) => i.arePt1 === doc.region_1depth_name);

  if (srray1[0] === undefined) {
    return undefined;
  } else {
    const srray2 = srray1.filter((i) => i.arePt2 === doc.region_2depth_name);

    if (srray2[0] !== undefined) {
      const srray3 = srray2.filter((i) => i.arePt3 === doc.region_3depth_name);

      if (srray3[0] !== undefined) {
        return srray3[0];
      } else {
        return srray2.filter((i) => i.arePt3 === null)[0];
      }
    } else {
      return srray1.filter((i) => i.arePt2 === null)[0];
    }
  }
};
/**
 * 현재 사용자의 위치(위도,경도)를 이용해 kakao API를 통해 현재 위치의 행정구역명을 찾아낸 후, 적합한 sfGrid 값을 반환하는 함수
 * @param latitude
 * @param longitude
 * @returns
 */
export const getAreaData = async (
  latitude: string,
  longitude: string
): Promise<SFGridItem | Error> => {
  const fetchBody = {
    longitude: longitude,
    latitude: latitude,
  };
  try {
    const data = await (
      await fetch("/weather_react/area", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchBody),
      })
    ).json();
    if (data.message === undefined) {
      const gridDataArray: SFGridItem[] = data
        .map((doc: KakaoDocumentType) => findAreaGrid(doc))
        .filter((i: SFGridItem | undefined) => i !== undefined);
      const arePt3IsNotNull = gridDataArray.filter(
        (i: SFGridItem) => i.arePt3 !== null
      );
      if (arePt3IsNotNull[0] !== undefined) {
        return arePt3IsNotNull[0];
      } else {
        const arePt2IsNotNull = gridDataArray.filter(
          (i: SFGridItem) => i.arePt2 !== null
        );
        if (arePt2IsNotNull[0] !== undefined) {
          return arePt2IsNotNull[0];
        } else {
          return gridDataArray[0];
        }
      }
    } else {
      const error = new Error(data.message);
      return error;
    }
  } catch (error) {
    const e = new Error(`${error}`);
    return e;
  }
};

/**
 * sfGrid를 이용해 현 위치에 대한 midLandAreaCode 를 반환
 * @param sfGrid
 * @returns
 */
function getMidLandAreaCode(sfGrid: SFGridItem) {
  const mid1 = ["서울특별시", "인천광역시", "경기도"];
  const mid2_3 = ["강원도"];
  const mid4 = ["대전광역시", "세종특별자치시", "충청남도"];
  const mid5 = ["충청북도"];
  const mid6 = ["광주광역시", "전라남도"];
  const mid7 = ["전라북도"];
  const mid8 = ["대구광역시", "경상북도"];
  const mid9 = ["부산광역시", "울산광역시", "경상북도"];
  const mid10 = ["제주특별자치도"];
  const mid = [mid1, mid2_3, mid2_3, mid4, mid5, mid6, mid7, mid8, mid9, mid10];
  const pt1 = sfGrid.arePt1;

  for (let i = 0; i < mid.length; i++) {
    const element = mid[i];
    if (pt1 === "강원도") {
      const pt2 = sfGrid.arePt2;
      if (pt2 == null || !west.includes(pt2)) {
        // 강원도영동
        return midLandAreaCodeZip[2];
      } else {
        //강원도영서
        return midLandAreaCodeZip[1];
      }
    } else {
      if (element.includes(pt1)) {
        const midLandAreaCode = midLandAreaCodeZip[i];
        return midLandAreaCode;
      }
    }
  }
}
/**
 * sfGrid를 이용해 현 위치에 대한 midLandAreaCode 를 반환
 * @param sfGrid
 * @returns
 */
function getMidTaAreaCode(sfGrid: SFGridItem) {
  const pt1 = sfGrid.arePt1;
  const pt2 = sfGrid.arePt2;
  const megalopolis = [
    "부산광역시",
    "인천광역시",
    "대구광역시",
    "대전광역시",
    "광주광역시",
    "울산광역시",
  ];
  const pt1Array = [
    ...megalopolis,
    "서울특별시",
    "세종특별시",
    "제주특별자치도",
    "이어도",
  ];
  const getCodeFromArray = (area: string) => {
    const index = midTaArea.indexOf(area);
    return midTaAreaCode[index];
  };
  //use pt1
  if (pt1Array.includes(pt1)) {
    if (pt1 === "서울특별시") {
      return getCodeFromArray("서울");
    } else if (megalopolis.includes(pt1)) {
      const area = pt1.slice(0, 2);
      return getCodeFromArray(area);
    } else if (pt1 === "세종특별자치시") {
      return getCodeFromArray("세종");
    } else if (pt1 === "제주특별자치도") {
      return getCodeFromArray("제주");
    } else if (pt1 === "이어도") {
      return getCodeFromArray("이어도");
    }
  } else {
    //use pt2
    if (pt2 !== null) {
      const pt2Area = pt2.slice(0, 2);
      if (pt1 === "경기도" && pt2Area === "광주") {
        return getCodeFromArray("광주(경기도");
      } else if (pt2Area === "고성") {
        switch (pt1) {
          case "강원도":
            return getCodeFromArray("고성(강원도)");
          case "경상남도":
            return getCodeFromArray("고성(경남)");
          default:
            break;
        }
      } else if (pt2 === "울릉군") {
        //울릉도, 독도의 taland code 를 통한 중기 기온 예보 정보를 가져올 수 없어서
        // 해당 지역과 가장 가까운 육지의 taland code를 이용
        return getCodeFromArray("울진");
      } else {
        return getCodeFromArray(pt2Area);
      }
    }
  }
}
/**
 * sfGrid를 이용해 현 위치에 대한 ApiAreaCode 를 반환
 * @param sfGrid
 * @returns
 */
function getApAreaCode(sfGrid: SFGridItem): ApiAreaCode {
  const pt1 = sfGrid.arePt1;
  const srray = [
    "충청븍도",
    "층청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
  ];
  if (srray.includes(pt1)) {
    const first = pt1.slice(0, 1);
    const second = pt1.slice(2, 3);
    const area = first.concat(second) as ApiAreaCode;
    return area;
  } else {
    const area = pt1.slice(0, 2);
    return area as ApiAreaCode;
  }
}

/**
 * 한자리 숫자를 0${number}를 바꾸는 함수
 * @param n
 * @returns type:string
 */
export const changeTwoDigit = (n: number) => {
  if (n < 10) {
    return `0${JSON.stringify(n)}`;
  } else {
    return JSON.stringify(n);
  }
};
/**
 * day(type:Date)를 `yyyymmdd` 형태로 변환
 * @param day
 * @returns
 */
const changeBaseDate = (day: Date) => {
  const month = day.getMonth() + 1;
  const date = day.getDate();
  const year = day.getFullYear();
  const baseDate = `${year}${changeTwoDigit(month)}${changeTwoDigit(date)}`;
  return baseDate;
};
/**
 * 어제 날짜를 `yyyymmdd` 형태로 변환
 * @param date
 * @returns
 */
const getYesterDay = (date: number) => {
  const yesterday = new Date(new Date().setDate(date - 1));
  // new Date() 말고 today를 쓰면 today 가 이전 날로 변경되는 오류 발생
  return changeBaseDate(yesterday);
};
/**
 * 시간을 `hhmm`으로 변환
 * @param h
 * @returns
 */
const changeHourToString = (h: number) => {
  const changedH = changeTwoDigit(h);
  return `${changedH}00`;
};
/**
 * sVFcst를 Day[]으로 변환
 * @param sVFcst
 * @returns
 */
function changeSvfToDay(sVFcst: SVFcst) {
  return sVFcst.map((d: SVFDay) => {
    const am = d.slice(0, 11);
    const pm = d.slice(12);
    const getAvg = (srray: number[]) => {
      const length = srray.length;
      const sum = srray.reduce((a, b) => a + b);
      const avg = Math.round(sum / length);
      return avg;
    };
    const amData = {
      sky: getAvg(am.map((t: SVFTime) => Number(t.sky))),
      pop: getAvg(am.map((t: SVFTime) => Number(t.pop))),
      pty: getAvg(am.map((t: SVFTime) => Number(t.pty))),
    };
    const pmData = {
      sky: getAvg(pm.map((t: SVFTime) => Number(t.sky))),
      pop: getAvg(pm.map((t: SVFTime) => Number(t.pop))),
      pty: getAvg(pm.map((t: SVFTime) => Number(t.pty))),
    };

    const day: Day = {
      daysLater: sVFcst.indexOf(d), //0-5 (today=0)
      am: {
        pop: amData.pop,
        sky: getSkyType(amData.sky, amData.pty),
      },
      pm: {
        pop: pmData.pop,
        sky: getSkyType(pmData.sky, pmData.pty),
      },
      tmn: Number(d[0].tmn),
      tmx: Number(d[0].tmx),
    };
    return day;
  });
}
/**
 * midFcst를 Day[]으로 변환
 * @param midFcst
 * @returns
 */
function changeMidToDay(midFcst: MidFcst) {
  return midFcst.map((d: MidFcstDay) => {
    const day: Day = {
      daysLater: midFcst.indexOf(d) + 3,
      am: {
        pop: Number(d.rnStAm),
        sky: d.wfAm,
      },
      pm: {
        pop: Number(d.rnStPm),
        sky: d.wfPm,
      },
      tmn: d.taMin,
      tmx: d.taMax,
    };
    return day;
  });
}
/**
 * sfGrid 속 nX 와 nY를 string type 의 값으로 반환하는 함수
 * @param sfGrid
 * @returns
 */
const changeNType = (sfGrid: SFGridItem) => {
  const nX: string =
    typeof sfGrid.nX === "number" ? JSON.stringify(sfGrid.nX) : sfGrid.nX;
  const nY: string =
    typeof sfGrid.nY === "number" ? JSON.stringify(sfGrid.nY) : sfGrid.nY;
  return {
    nX: nX,
    nY: nY,
  };
};
/**
 * sfGrid를 활용해 해당 위치의 단기 예보를 찾는데 쓰이는 midLandAreaCode와 midTaAreaCode를 찾아서 이를 반환
 * @param sfGrid
 * @returns landRegId: MidLandAreaCode | undefined , taRegId: MidTaAreaCode | undefined;
 */
const findLandTaCode = (sfGrid: SFGridItem) => {
  const landRegId: MidLandAreaCode | undefined = getMidLandAreaCode(sfGrid);
  const taRegId: MidTaAreaCode | undefined = getMidTaAreaCode(sfGrid);

  return {
    landRegId: landRegId,
    taRegId: taRegId,
  };
};
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
 * @param threeDays
 * @returns  Promise<Error | Area[]>
 */
const getNationData = async (
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
  threeDays: string[],
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
      threeDays,
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
      areaInform: areaArray[0],
      day: null,
      now: null,
    },
  ];

  for (let i = 0; i < areaArray.length; i++) {
    const item = areaArray[i];
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

export const getTimeData = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const date = today.getDate();
  const preHours = hours - 1;
  const dayLater = [0, 1, 2];
  const threeDays = dayLater.map((d: number) => {
    const later = new Date(new Date().setDate(date + d));
    return changeBaseDate(later);
  });
  const baseDate_today = changeBaseDate(today);
  const baseDate_yesterday = getYesterDay(date);
  const baseDate_skyCode =
    minutes < 30 && hours === 0 ? baseDate_yesterday : baseDate_today;
  const baseDate_svf = hours < 2 ? baseDate_yesterday : baseDate_today;

  const baseTime_svf: SVFBaseTime = (() => {
    let time: SVFBaseTime = "0200";
    const svfBaseTime = [2, 5, 8, 11, 14, 17, 20, 23];
    for (let index = 0; index < svfBaseTime.length; index++) {
      const element = svfBaseTime[index];
      if (hours < 2) {
        time = "2300";
      } else if (hours !== 23) {
        if (hours >= element && hours < svfBaseTime[index + 1]) {
          if (element < 10) {
            time = `0${JSON.stringify(element)}00` as SVFBaseTime;
          } else {
            time = `${JSON.stringify(element)}00` as SVFBaseTime;
          }
        }
      } else {
        time = "2300";
      }
    }
    return time;
  })();
  const preFcstTime: string = changeHourToString(hours - 1);
  const fcstTime: string = changeHourToString(hours);
  const baseTime_skyCode: string =
    baseDate_skyCode === baseDate_today
      ? minutes > 30
        ? fcstTime
        : changeHourToString(preHours)
      : "2300";

  const timeArray = (() => {
    let srray: string[] = [];
    for (let t = 0; t < 24; t++) {
      if (t < 10) {
        t === 0 ? (srray = ["0000"]) : srray.push(`0${t}00`);
      } else {
        srray.push(`${t}00`);
      }
    }
    return srray;
  })();

  const baseTimeIndex = timeArray.indexOf(fcstTime);
  const todayTimeArray = timeArray.slice(baseTimeIndex + 1);

  return {
    today: today,
    hours: hours,
    minutes: minutes,
    date: date,
    threeDays: threeDays,
    baseDate_today: baseDate_today,
    baseDate_yesterday: baseDate_yesterday,
    baseDate_skyCode: baseDate_skyCode,
    baseDate_svf: baseDate_svf,
    baseTime_svf: baseTime_svf,
    preFcstTime: preFcstTime,
    fcstTime: fcstTime,
    baseTime_skyCode: baseTime_skyCode,
    timeArray: timeArray,
    baseTimeIndex: baseTimeIndex,
    todayTimeArray: todayTimeArray,
  };
};
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
): Promise<string | WeatherState> => {
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
    today,
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
    const error = {
      skyCode: skyCode instanceof Error,
      sVFcst: sVFcst instanceof Error,
      uSNcst: uSNcst instanceof Error,
      midFcst: midFcst instanceof Error,
      nowApGrade: nowApGrade instanceof Error,
      tomorrowApGrade: tomorrowApGrade instanceof Error,
      sunInform: sunInformHasError,
    };
    console.error(error);
    return JSON.stringify(error);
  }
};
