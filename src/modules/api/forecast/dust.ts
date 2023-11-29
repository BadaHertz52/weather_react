//미세먼지 관련 예보 수집
import { AP_INFORMATION_API, INQURY_AIR, PM_STATE } from "../../../constants";
import { WEST_AREA } from "../../../constants/areaCode";
import { SFGridItem } from "../../position";
import {
  ApFcstItem,
  ApNowItem,
  PmGrade,
  ApFcstAreaCode,
  ApiAreaCode,
} from "../types/";
import { getAPIItems } from "../index";
import { PmType } from "../../weather";
import { changeSearchDate } from "./time";

const getApNowPmType = (pm: string): PmType => {
  switch (Number(pm)) {
    case 1:
      return "good";
    case 2:
      return "common";
    case 3:
      return "bad";
    case 4:
      return "veryBad";
    default:
      return "common";
  }
};
/**
 * 실시간 미세먼지, 초미세먼지 등급을 반환하는 함수
 * @param sidoName
 * @param stationName (type: string[]) 측정 지역의 행정구역명을 시/도 ,구/군/시, 구/시, 읍/면/동, 리/동 으로 나누어 배열형태로 나타낸것
 * @returns Promise<PmGrade|string>
 */
export const getApNow = async (
  sidoName: ApiAreaCode,
  stationName: string[],
  userAreaCode: string | number
): Promise<PmGrade | Error> => {
  const url = `${AP_INFORMATION_API.url}/${INQURY_AIR.ctprvnRltmMesureDnsty}?sidoName=${sidoName}&returnType=JSON&numOfRows=100000&ver=1.3`;
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
        pm10Grade: getApNowPmType(targetItem.pm10Grade),
        pm25Grade: getApNowPmType(targetItem.pm25Grade),
      };

      return pm;
    }
  } catch (error) {
    const e = new Error(`[Error] Can't fetch /weather_react/apNow`);
    return e;
  }
};

export const findApFcstArea = (
  sidoName: ApiAreaCode,
  sfGrid: SFGridItem
): ApFcstAreaCode => {
  const targetSido = ["강원", "경기"];
  if (targetSido.includes(sidoName)) {
    const pt2 = sfGrid.arePt2;

    switch (sidoName) {
      case "강원":
        if (pt2 == null || !WEST_AREA.includes(pt2)) {
          // 강원도영동
          return "영동";
        } else {
          //강원도영서
          return "영서";
        }
      case "경기":
        const SOUTH = [
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
        for (let i = 0; i < SOUTH.length; i++) {
          const element = SOUTH[i];
          if (pt2?.includes(element)) {
            isSouth = true;
            i = SOUTH.length;
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
};

const getApFcstPmType = (
  pmData: string,
  apFcstArea: ApFcstAreaCode,
  sidoName: ApiAreaCode
) => {
  const indexOfSido = pmData.indexOf(apFcstArea);
  const sliced1 = pmData.slice(indexOfSido + sidoName.length + 1);
  const indexOfComma = sliced1.indexOf(",");
  const sliced2 = sliced1.slice(0, indexOfComma);
  const grade = Object.entries(PM_STATE)
    .map((g) => {
      const [key, value] = g;
      if (sliced2.includes(value.name)) {
        return key as PmType;
      } else {
        return null;
      }
    })
    .filter((i: PmType) => i !== null)[0];
  return grade;
};

/**
 *  대기질 예보(오늘,내일,모레) 통보 조회
 * @param baseDate 오늘 날짜 (형식:yyyymmdd)
 * @param tBaseDate 내일 날짜 (형식:yyyymmdd)
 * @param sidoName 시도 이름
 */
export const getApFcst = async (
  baseDate: string,
  tBaseDate: string,
  sidoName: ApiAreaCode,
  sfGrid: SFGridItem,
  userAreaCode: string | number
): Promise<PmGrade | Error> => {
  const searchDate = changeSearchDate(baseDate);
  const tSearchDate = changeSearchDate(tBaseDate);
  const apFcstArea = findApFcstArea(sidoName, sfGrid);
  const url = `${AP_INFORMATION_API.url}/${INQURY_AIR.minuDustFrcstDspth}?returnType=JSON&numOfRows=100000&searchDate=${searchDate}`;

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

      const pm10Grade = getApFcstPmType(pm10Fcst, apFcstArea, sidoName);
      const pm25Grade = getApFcstPmType(pm25Fcst, apFcstArea, sidoName);
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
