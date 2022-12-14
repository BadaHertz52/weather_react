import { MidLandAreaCode, MidTaAreaCode } from "./areCodeTyoe";
import { Dnyn } from "./statetypes";
import {USNcstItem, SVFcst, USFcst, USNcst, SFcstItem, MidLandFcst, MidLandFcstItem, MidLandFcstDay}from "./apiType";

const returnApiUrl =(sort:string):string=>{
  const base =`https://apis.data.go.kr/1360000/${sort}`;
  return base
};
//inqury_short
/**
 * 초단기실황조회 :현재
 */
const inqury_short_ultraSrtNcst ="getUltraSrtNcst";
/**
 * 초단기예보조회 : 현재부터 6시간 이내
 */
const inqury_short_ultraSrtFcst ="getUltraSrtFcst" ;
/**
 * 단기예보조회 :현재부터 3일 이내
 */
const inqury_short_vilageFcst ="getVilageFcst";

/**
 * 중기 육상예보:강수확률,날씨
 */
const inqury_mid_midLandFcst ="getMidLandFcst";
/**
 * 중기기온조회
 */
const inqury_mid_midTa ="getMidTa";
/**
 * 동파 지수조회
 */
const inqury_life_freezeIdxV3 ="getFreezeIdxV3";
/**
 * 자외선지수조회
 */
const inqury_life_uVIdxV3 ="getUVIdxV3";
/**
 * 체감온도 조회 
 */
const inqury_life_airDiffusionIdxV3 ="getAirDiffusionIdxV3";
/**
 * 시도별 실시간 대기오염 측정 정보 조회 
 */
const inqury_air_ctprvnRltmMesureDnsty  ="getCtprvnRltmMesureDnsty ";

type ShortInqury =typeof inqury_short_ultraSrtFcst|
typeof inqury_short_ultraSrtNcst |
typeof inqury_short_vilageFcst ;

type MidInqury =typeof inqury_mid_midLandFcst |
typeof inqury_mid_midTa;

type LifeInqury =typeof inqury_life_airDiffusionIdxV3 |typeof inqury_life_freezeIdxV3 |
typeof inqury_life_uVIdxV3 ;

type ApInqury = typeof inqury_air_ctprvnRltmMesureDnsty;

type Api ={
  url:string,
  key:string,
  inqury:string
};

/**
 * Api for short-term forecast
 */

const shortFcstApi:Api ={
  url:returnApiUrl("VilageFcstInfoService_2.0") ,
  key:"hBppoh3ha8A2hvqzRU5kOqCd8uVct6%2BPmsjMaTQ1FOpqDAA7BfsIeAk%2BlyHk0VMFaIFkQK1ElUP4nHjyfs1hDg%3D%3D",
  inqury:inqury_short_ultraSrtFcst ||       inqury_short_ultraSrtNcst||
  inqury_short_vilageFcst
};
/**
 * Api for medium term forecas
 */
const midFcstApi :Api ={
  url:returnApiUrl("MidFcstInfoService"),
  key:"hBppoh3ha8A2hvqzRU5kOqCd8uVct6%2BPmsjMaTQ1FOpqDAA7BfsIeAk%2BlyHk0VMFaIFkQK1ElUP4nHjyfs1hDg%3D%3D",
  inqury:inqury_mid_midLandFcst || 
  inqury_mid_midTa
};
/**
 * Api for living weather index
 */
const lifeIndexApi :Api ={
  url:returnApiUrl("LivingWthrIdxServiceV3"),
  key:"hBppoh3ha8A2hvqzRU5kOqCd8uVct6%2BPmsjMaTQ1FOpqDAA7BfsIeAk%2BlyHk0VMFaIFkQK1ElUP4nHjyfs1hDg%3D%3D",
  inqury:inqury_life_airDiffusionIdxV3|| inqury_life_freezeIdxV3||
  inqury_life_uVIdxV3
};
/**
 * Api for air pollution
 */
const apInformApi:Api ={
  url:"http://apis.data.go.kr/B552584/ArpltnInforInqireSvc",
  key:"hBppoh3ha8A2hvqzRU5kOqCd8uVct6%2BPmsjMaTQ1FOpqDAA7BfsIeAk%2BlyHk0VMFaIFkQK1ElUP4nHjyfs1hDg%3D%3D",
  inqury:inqury_air_ctprvnRltmMesureDnsty
};

/** 
 * Api for sunset and sunrise
*/
export const sunApi:Api ={
  url :"http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService",
  key :"hBppoh3ha8A2hvqzRU5kOqCd8uVct6%2BPmsjMaTQ1FOpqDAA7BfsIeAk%2BlyHk0VMFaIFkQK1ElUP4nHjyfs1hDg%3D%3D" ,
  inqury :"getLCRiseSetInfo"
};

const getApiItems =async(url:string)=>{
  const data = await fetch(url )
  .then((response)=> response.json())
  .then(data =>data.body.items)
  .catch(e=>console.log("error",e));
  return data
};

export const getShortFcast =async(nx:number, ny:number, baseDate:number, baseTime:number, inqury:ShortInqury): Promise<USNcst | USFcst | SVFcst | undefined>=>{
  const url =`${shortFcstApi.url}/${inqury}?serviceKey=${shortFcstApi.key}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
  const items = await getApiItems(url);
  switch (inqury) {
    //초단기 실황
    case 'getUltraSrtNcst':
      const uNcst:USNcst ={
        pty: items.filter((i:USNcstItem)=> i.category === "PTY").obsrValue,
        reh: items.filter((i:USNcstItem)=> i.category === "REH").obsrValue,
        rn1: items.filter((i:USNcstItem)=> i.category === "RN1").obsrValue,
        t1h: Number(items.filter((i:USNcstItem)=> i.category === "T1H").obsrValue) ,
        vec: Number(items.filter((i:USNcstItem)=> i.category === "VEC").obsrValue) ,
        wsd: items.filter((i:USNcstItem)=> i.category === "WSD").obsrValue
      };
      return uNcst;
    //초단기 예보
    case "getUltraSrtNcst":
      const uSFcst :USFcst ={
        pty: items.filter((i:SFcstItem)=> i.category === "PTY").obsrValue,
        reh: items.filter((i:SFcstItem)=> i.category === "REH").obsrValue,
        rn1: items.filter((i:SFcstItem)=> i.category === "RN1").obsrValue,
        t1h: Number(items.filter((i:SFcstItem)=> i.category === "T1H").obsrValue),
        vec: Number(items.filter((i:SFcstItem)=> i.category === "VEC").obsrValue),
        wsd: items.filter((i:SFcstItem)=> i.category === "WSD").obsrValue,
        sky: items.filter((i:SFcstItem)=> i.category === "SKY").obsrValue,
      };
      return uSFcst;
    // 단기 예보
    case "getVilageFcst":
      const sVFcst :SVFcst ={
        pop: items.filter((i:SFcstItem)=> i.category === "POP").obsrValue,
        pty: items.filter((i:SFcstItem)=> i.category === "PTY").obsrValue, 
        pcp: items.filter((i:SFcstItem)=> i.category === "PCP").obsrValue,
        reh: items.filter((i:SFcstItem)=> i.category === "REH").obsrValue ,
        sno: items.filter((i:SFcstItem)=> i.category === "SNO").obsrValue,
        sky: items.filter((i:SFcstItem)=> i.category === "SKY").obsrValue,
        tmp:Number(items.filter((i:SFcstItem)=> i.category === "TMP").obsrValue) ,
        vec: Number(items.filter((i:SFcstItem)=> i.category === "VEC").obsrValue) ,
        wsd: items.filter((i:SFcstItem)=> i.category === "WED").obsrValue
      };
      return sVFcst ;
    default:
      break;
  }
};

export const getMidFcast =async(regld:MidLandAreaCode|MidTaAreaCode, tmFc:number, inqury:MidInqury)=>{
  const url =`${midFcstApi.url}/${inqury}?serviceKey=${midFcstApi.key}&dataType=JSON&regld=${regld}&tmFc=${tmFc}`;
  const items = await getApiItems(url);
  switch (inqury) {
    case "getMidLandFcst":
    const midLandFcst:MidLandFcst = items.itme((i:MidLandFcstItem)=>
                                                  [
                                                    {
                                                      dyalater:"4",
                                                      wfAm:i.wf4Am,
                                                      wfPm:i.wf4Pm
                                                    },{
                                                      dyalater:"5",
                                                      wfAm:i.wf5Am,
                                                      wfPm:i.wf5Pm
                                                    }
                                                    ,{
                                                      dyalater:"6",
                                                      wfAm:i.wf6Am,
                                                      wfPm:i.wf6Pm
                                                    },
                                                    {
                                                      dyalater:"7",
                                                      wfAm:i.wf7Am,
                                                      wfPm:i.wf7Pm
                                                    }
                                                  ]
                                                );
    return midLandFcst;
    default:
      break;
  }
};
export const getLifeIndex =(nx:number, ny:number, baseDate:number, baseTime:number, inqury:LifeInqury)=>{

};
export const getApInform =(nx:number, ny:number, baseDate:number, baseTime:number, inqury:ApInqury)=>{

};

/**
 * 
 * @param longitude 경도
 * @param latitude  위도
 * @param dnYn  10진수 여부 (실수이면 y, ~도 ~분이면 n)
 */
export const getSunInform =(longitude:number, latitude:number ,baseDate:number,dnYn:Dnyn)=>{
  const url =`${sunApi.url}/${sunApi.inqury}?longitude=${longitude}&latitude=${latitude}&locdate=${baseDate}&dnYn=${dnYn}&ServiceKey=${sunApi.key}`;
  return fetch(url)
                .then(response => response.text())
                .then((data)=>{
                  const xml = new DOMParser().parseFromString(data, "text/xml");
                  const sunrise = xml.querySelector("sunrise")?.textContent
                  const sunset =xml.querySelector("sunset")?.textContent;
                  const location =xml.querySelector("location")?.textContent;
                  return {
                    sunrise :sunrise,
                    sunset:sunset,
                    location:location
                  }
                })
                .catch(e=>console.log("error",e));
};
