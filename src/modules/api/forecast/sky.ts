import { SFcstItem } from "../types/weather";
import { PtyCodeType, SkyCodeType, SkyType } from "../../weather";
import { getAPIItems, getSFApiUrl } from "../index";

// state로 변경 시 필요한 함수
export const getSkyCode = (code: number): SkyCodeType => {
  switch (code) {
    case 1:
      return "sunny";
    case 3:
      return "cloudy";
    case 4:
      return "veryCloudy";

    default:
      return "sunny";
  }
};

export const getPtyCode = (code: number): PtyCodeType => {
  let ptyCode: PtyCodeType = "sunny";
  if (code === 0) {
    ptyCode = "sunny";
  }
  if (code === 1 || code === 5) {
    ptyCode = "rainy";
  }
  if (code === 2 || code === 6) {
    ptyCode = "snowRain";
  }
  if (code === 3 || code === 7) {
    ptyCode = "snow";
  }
  if (code === 4) {
    ptyCode = "shower";
  }
  return ptyCode;
};

const getSkyTypeOfCloudy = (ptyCode: PtyCodeType): SkyType => {
  switch (ptyCode) {
    case "sunny":
      return "cloudy";
    case "rainy":
      return "cldRain";
    case "snowRain":
      return "cldRainSnow";
    case "snow":
      return "cldSnow";
    case "shower":
      return "cldShower";
    default:
      return "cloudy";
  }
};

const getSkyTypeOfOther = (ptyCode: PtyCodeType): SkyType => {
  switch (ptyCode) {
    case "sunny":
      return "veryCloudy";
    case "rainy":
      return "vrCldRain";
    case "snowRain":
      return "vrCldRainSnow";
    case "snow":
      return "vrCldSnow";
    case "shower":
      return "vrCldShower";
    default:
      return "veryCloudy";
  }
};

export const getSkyType = (skyAvg: number, ptyAvg: number): SkyType => {
  let skyType: SkyType = "cldRain";
  const skyCode = getSkyCode(skyAvg);
  const ptyCode = getPtyCode(ptyAvg);

  if (skyCode === "sunny") {
    skyType = skyCode;
  } else if (skyCode === "cloudy") {
    skyType = getSkyTypeOfCloudy(ptyCode);
  } else {
    skyType = getSkyTypeOfOther(ptyCode);
  }

  return skyType;
};

/**
 * 현재 시점에 대한 초단기 예보 api 데이터 중 SKY에 대한 값을 SkyType으로 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param fcstTime 현재 시
 * @return Promise<SkyCodeType| string>
 */
export const getUSSkyCode = async (
  nx: string,
  ny: string,
  baseDate: string,
  baseTime: string,
  fcstTime: string,
  userAreaCode: string | number
): Promise<SkyCodeType | Error> => {
  const numOfRows = JSON.stringify(10000);
  const url = getSFApiUrl(
    "ultraSrtFcst",
    nx,
    ny,
    baseDate,
    baseTime,
    numOfRows
  );
  const items = await getAPIItems(url, "sky", userAreaCode);
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
