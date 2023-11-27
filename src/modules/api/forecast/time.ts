import { SVF_BASE_TIME } from "../../../constants";
import { SVFBaseTime } from "../types/weather";

/**
 * 'yyymmdd'를 'yyyy-mm-dd'로 변형해 반환하는 함수
 * @param baseDate 형태:yyymmdd
 * @returns
 */
export const changeSearchDate = (baseDate: string) => {
  const year = baseDate.slice(0, 4);
  const month = baseDate.slice(4, 6);
  const date = baseDate.slice(6);
  const searchDate = `${year}-${month}-${date}`;

  return searchDate;
};

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
 * 시간을 `hhmm`으로 변환
 * @param h
 * @returns
 */
const changeHourToString = (h: number) => {
  const changedH = changeTwoDigit(h);

  return `${changedH}00`;
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
const getThreeDays = (dayLater: number[], date: number) => {
  return dayLater.map((d: number) => {
    const later = new Date(new Date().setDate(date + d));

    return changeBaseDate(later);
  });
};
const getBaseTimeSvf = (hours: number) => {
  let time: SVFBaseTime = "am2";
  const TIMES = Object.entries(SVF_BASE_TIME).map((v) => {
    const [key, value] = v;
    const number = Number(value.replaceAll("0", ""));

    return {
      key: key as SVFBaseTime,
      number: number,
    };
  });

  for (let index = 0; index < TIMES.length; index++) {
    const element = TIMES[index];
    const { key, number } = element;
    if (hours < 2 || hours === 23) {
      time = "pm11";
    } else {
      if (hours >= number && hours < TIMES[index + 1].number) {
        time = key;
      }
    }
  }
  return time;
};
export const getTimeData = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const date = today.getDate();
  const preHours = hours - 1;
  const dayLater = [0, 1, 2];
  const threeDays = getThreeDays(dayLater, date);
  const baseDate_today = changeBaseDate(today);
  const baseDate_yesterday = getYesterDay(date);
  const baseDate_skyCode =
    minutes < 30 && hours === 0 ? baseDate_yesterday : baseDate_today;
  const baseDate_svf = hours < 2 ? baseDate_yesterday : baseDate_today;
  const baseTime_svf: SVFBaseTime = getBaseTimeSvf(hours);
  const preFcstTime: string = changeHourToString(hours - 1);
  const fcstTime: string = changeHourToString(hours);
  const baseTime_skyCode: string =
    baseDate_skyCode === baseDate_today
      ? minutes > 30
        ? fcstTime
        : changeHourToString(preHours)
      : "2300";
  const timeArray = (() => {
    let array: string[] = [];
    for (let t = 0; t < 24; t++) {
      if (t < 10) {
        t === 0 ? (array = ["0000"]) : array.push(`0${t}00`);
      } else {
        array.push(`${t}00`);
      }
    }
    return array;
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
