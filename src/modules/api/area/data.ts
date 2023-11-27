import { SFGridItem } from "../../position";
import { KakaoDocumentType } from "../types";
import { findAreaGrid } from "./code";

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
