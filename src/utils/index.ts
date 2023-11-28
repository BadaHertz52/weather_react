import { SunRiseAndSet } from "../modules";

/**
 * hours 가 일몰,일출 시간을 기준을 낮 시간인지 밤 시간인지 확인하는 함수
 * @param hours
 * @param todaySunInform
 * @returns 낮 시간이라면 true를 밤시간이라면 false
 */
export const checkDayOrNight = (
  hours: number,
  todaySunInform: Error | SunRiseAndSet
): boolean => {
  const sunInformError = todaySunInform instanceof Error;
  const sunrise: number =
    sunInformError || todaySunInform.sunRise == null
      ? 6
      : Number(todaySunInform.sunRise.slice(0, 1));
  const sunset: number =
    sunInformError || todaySunInform.sunSet == null
      ? 18
      : Number(todaySunInform.sunSet?.slice(0, 2));
  const dayCondition = hours > sunrise && hours < sunset;
  /**
   * 현재 시간이 낮인지
   */
  const daytime: boolean = dayCondition ? true : false;
  return daytime;
};
