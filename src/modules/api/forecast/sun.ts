import { SUN_API } from "../../../constants";
import { SunRiseAndSet } from "../../weather";

/**
 *
 * @param longitude longitude ( 실수(초/100): 서울-126.98000833333333 )
 * @param latitude  latitude ( 실수 (초/100): 서울 -37.56356944444444)
 */
export const getSunInform = async (
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
    `${SUN_API.url}/${SUN_API.inqury}?longitude=${longitude}&latitude=${latitude}&locdate=${date}&dnYn=Y`;
  const array: Item[] = threeDays.map((d: string) => ({
    url: getUrl(d),
    date: d,
  }));
  const fetchSUN_API = async (url: string, date: string) => {
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
    array.map(async ({ url, date }) => {
      const inform = await fetchSUN_API(url, date);

      return inform;
    })
  );
};
