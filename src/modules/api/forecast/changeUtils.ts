import { SFGridItem } from "../../position";
import { Day } from "../../weather";
import { MidFcst, MidFcstDay, SVFDay, SVFTime, SVFcst } from "../types";
import { getMidSkyType, getSvfSkyType } from "./index";

/**
 * sVFcst를 Day[]으로 변환
 * @param sVFcst
 * @returns
 */
export const changeSvfToDay = (sVFcst: SVFcst) => {
  return sVFcst.map((d: SVFDay) => {
    const am = d.slice(0, 11);
    const pm = d.slice(12);
    const getAvg = (array: number[]) => {
      const length = array.length;
      const sum = array.reduce((a, b) => a + b);
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
        sky: getSvfSkyType(amData.sky, amData.pty),
      },
      pm: {
        pop: pmData.pop,
        sky: getSvfSkyType(pmData.sky, pmData.pty),
      },
      tmn: Number(d[0].tmn),
      tmx: Number(d[0].tmx),
    };
    return day;
  });
};
/**
 * midFcst를 Day[]으로 변환
 * @param midFcst
 * @returns
 */
export const changeMidToDay = (midFcst: MidFcst) => {
  return midFcst.map((d: MidFcstDay) => {
    const day: Day = {
      daysLater: midFcst.indexOf(d) + 3,
      am: {
        pop: Number(d.rnStAm),
        sky: getMidSkyType(d.wfAm),
      },
      pm: {
        pop: Number(d.rnStPm),
        sky: getMidSkyType(d.wfPm),
      },
      tmn: d.taMin,
      tmx: d.taMax,
    };
    return day;
  });
};
/**
 * sfGrid 속 nX 와 nY를 string type 의 값으로 반환하는 함수
 * @param sfGrid
 * @returns
 */
export const changeNType = (sfGrid: SFGridItem) => {
  const nX: string =
    typeof sfGrid.nX === "number" ? JSON.stringify(sfGrid.nX) : sfGrid.nX;
  const nY: string =
    typeof sfGrid.nY === "number" ? JSON.stringify(sfGrid.nY) : sfGrid.nY;
  return {
    nX: nX,
    nY: nY,
  };
};
