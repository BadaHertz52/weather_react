//중기예보 데이터 수집
import { INQURY_MID, MID_FCAST_API } from "../../../constants";
import { MidFcst } from "../types";
import { getAPIItems } from "../index";

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
  landRegId: string,
  taRegId: string,
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
    `${MID_FCAST_API.url}/${INQURY_MID.midLandFcst}?regId=${landRegId}&${common(
      tmFc
    )}`;
  const taUrl = (tmFc: string) =>
    `${MID_FCAST_API.url}/${INQURY_MID.midTa}?regId=${taRegId}&${common(tmFc)}`;
  let landItems = await getAPIItems(
    landUrl(tmFc),
    "midFcastLandItems",
    userAreaCode
  );
  let taItems = await getAPIItems(taUrl(tmFc), "midFcastTaItems", userAreaCode);

  if (!(landItems instanceof Error) && !(taItems instanceof Error)) {
    /*if (tmFcTime === "1800") {
      const newTmFc = `${tmFcDate}0600`;
      const newLandUrl = landUrl(newTmFc);
      const newTaUrl = taUrl(newTmFc);
      const newLandItems = await getAPIItems(
        newLandUrl,
        "midFcastLandItems",
        userAreaCode
      );
      const newTaItems = await getAPIItems(
        newTaUrl,
        "midFcastTaItems",
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
    }*/
    const midFcst: MidFcst = [
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
