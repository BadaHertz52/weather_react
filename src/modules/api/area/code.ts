import { SF_GRID } from "../../../constants";
import {
  MID_LAND,
  MID_LAND_AREAS,
  MID_TA,
  MID_TA_AREAS,
  WEST_AREA,
} from "../../../constants/areaCode";
import { SFGridItem } from "../../position";
import { ApiAreaCode, MidTaKEY, KakaoDocumentType } from "../types";

/**
 * kakao API 에서 받아온 data를 활용해 적합한 sfGrid 값을 도출하는 함수
 * @param doc
 * @returns
 */
export const findAreaGrid = (doc: KakaoDocumentType) => {
  const firstSfGrids = SF_GRID.filter(
    (i) => i.arePt1 === doc.region_1depth_name
  );

  if (firstSfGrids[0] === undefined) {
    return undefined;
  } else {
    const secondSfGrids = firstSfGrids.filter(
      (i) => i.arePt2 === doc.region_2depth_name
    );

    if (secondSfGrids[0] !== undefined) {
      const thirdSfGrids = secondSfGrids.filter(
        (i) => i.arePt3 === doc.region_3depth_name
      );

      if (thirdSfGrids[0] !== undefined) {
        return thirdSfGrids[0];
      } else {
        return secondSfGrids.filter((i) => i.arePt3 === null)[0];
      }
    } else {
      return firstSfGrids.filter((i) => i.arePt2 === null)[0];
    }
  }
};

const getLandCode = (pt1: string) => {
  return MID_LAND_AREAS.filter((v) => v[1].sido.includes(pt1))[0][1].code;
};
/**
 * sfGrid를 이용해 현 위치에 대한 midLandAreaCode 를 반환
 * @param sfGrid
 * @returns
 */
export const getMidLandAreaCode = (sfGrid: SFGridItem) => {
  let code;
  const pt1 = sfGrid.arePt1;
  if (pt1 === "강원도") {
    const pt2 = sfGrid.arePt2;
    if (pt2 == null || !WEST_AREA.includes(pt2)) {
      // 강원도영동
      code = MID_LAND.강원도영동.code;
    } else {
      //강원도영서
      code = MID_LAND.강원도영서.code;
    }
  } else {
    code = getLandCode(pt1);
  }

  return code;
};
/**
 * sfGrid를 이용해 현 위치에 대한 midTaAreaCode 를 반환
 * @param sfGrid
 * @returns
 */
export const getMidTaAreaCode = (sfGrid: SFGridItem) => {
  let code;
  const pt1 = sfGrid.arePt1;
  const pt2 = sfGrid.arePt2;
  const PT_1_ARRAY = [
    "서울특별시",
    "부산광역시",
    "인천광역시",
    "대구광역시",
    "대전광역시",
    "광주광역시",
    "울산광역시",
    "세종특별시",
    "제주특별자치도",
    "이어도",
  ];
  const isInPt1Array = PT_1_ARRAY.includes(pt1);
  //use pt1
  if (isInPt1Array) {
    if (pt1 === "이어도") {
      code = MID_TA.이어도;
    } else {
      const key = pt1.slice(0, 2);
      code = MID_TA[key as MidTaKEY];
    }
  }
  //use pt2
  if (!isInPt1Array && pt2) {
    const pt2Area = pt2.slice(0, 2);

    if (pt1 === "경기도" && pt2Area === "광주") {
      code = MID_TA.광주_경기도;
    } else if (pt2Area === "고성") {
      code = pt1 === "강원도" ? MID_TA.고성_강원도 : MID_TA.고성_경남;
    } else if (pt2 === "울릉군") {
      //울릉도, 독도의 taland code 를 통한 중기 기온 예보 정보를 가져올 수 없어서
      // 해당 지역과 가장 가까운 육지의 taland code를 이용
      code = MID_TA.울진;
    } else {
      code = MID_TA_AREAS.filter((v) => v[0].includes(pt2Area))[0][1];
    }
  }

  return code;
};
/**
 * sfGrid를 이용해 현 위치에 대한 ApiAreaCode 를 반환
 * @param sfGrid
 * @returns
 */
export const getApAreaCode = (sfGrid: SFGridItem): ApiAreaCode => {
  const pt1 = sfGrid.arePt1;
  const LOCATION_ARRAY = [
    "충청븍도",
    "층청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
  ];
  if (LOCATION_ARRAY.includes(pt1)) {
    const first = pt1.slice(0, 1);
    const second = pt1.slice(2, 3);
    const area = first.concat(second) as ApiAreaCode;
    return area;
  } else {
    const area = pt1.slice(0, 2);
    return area as ApiAreaCode;
  }
};
/**
 * sfGrid를 활용해 해당 위치의 단기 예보를 찾는데 쓰이는 midLandAreaCode와 midTaAreaCode를 찾아서 이를 반환
 * @param sfGrid
 */
export const findLandTaCode = (sfGrid: SFGridItem) => {
  const landRegId: string = getMidLandAreaCode(sfGrid);
  const taRegId: string | undefined = getMidTaAreaCode(sfGrid);

  return {
    landRegId: landRegId,
    taRegId: taRegId,
  };
};
