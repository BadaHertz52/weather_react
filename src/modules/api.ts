import { MidLandAreaCode, MidTaAreaCode } from "./areCodeTyoe";
import { cloudy, Dnyn, SkyType, sunny, veryCloudy } from "./statetypes";
import {USNcstItem, SVFcst, USFcst, USNcst, SFcstItem, MidLandFcst, MidTaFcst, SFcstItemBase, SVFTime, SVFDay}from "./apiType";

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

type SFInqury =typeof inqury_short_ultraSrtFcst|
typeof inqury_short_ultraSrtNcst|
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
/**
 * url 에 요청을 보내 외부 api에서 data를 가져오는 함수
 * @param url 
 * @returns Promise<any>
 */
const getApiItems =async(url:string)=>{
  const data = await fetch(url )
  .then((response)=> response.json())
  .then(data =>data.body.items)
  .catch(e=>console.log("error",e));
  return data
};
/**
 * 초단기 실황, 초단기 예보, 단기 예보 api를 요청할 때 사용할 url을 반환하는 함수
 * @param inqury api 조회 기능
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param baseTime  발표시간(tt00)
 * @returns url (type string)
 */
export const getSFApiUrl =(inqury:SFInqury,nx:string, ny:string, baseDate:string, baseTime:string )=> {
  const url =`${shortFcstApi.url}/${inqury}?serviceKey=${shortFcstApi.key}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
  return url
};
/**
 * 현재 시점에 대한 초단기 예보 api 데이터 중 SKY에 대한 값을 SkyType으로 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param baseTime : 현재 시점이 30분 이후면 이전 시로, 30분 이후이면 현재 시로 (ex "tt00")
 * @param fcstTime 현재 시
 */
export const getUSSkyCode =async(nx:string, ny:string, baseDate:string, baseTime:string, fcstTime:string):Promise<SkyType | undefined>=>{
  const url =getSFApiUrl(inqury_short_ultraSrtFcst, nx,ny,baseDate,baseTime);
  const items : SFcstItem[] = await getApiItems(url);
  const skyCode= items.filter((i:SFcstItem)=> i.fcstTime === fcstTime &&
                                                    i.category ==="SKY"
                                      )[0].fcstValue;
  switch (skyCode) {
    case "1":
      return sunny;
    case "3": 
      return cloudy;
    case "4":
      return veryCloudy;
    default:
      break;
  }
};
/**
 * 현재 시점에 대한 초단기 실황 api 데이터를 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param baseTime  발표시간(tt00)
 * @return Promise<USNcst>
 */
export const getUSNcast =async(nx:string, ny:string, baseDate:string, baseTime:string)=>{
  const url =getSFApiUrl("getUltraSrtNcst",nx,ny,baseDate,baseTime);
  const items:USNcstItem[] = await getApiItems(url);
  const uNcst:USNcst ={
    baseDate:baseDate,
    baseTime:baseTime,
    pty: items.filter((i:USNcstItem)=> i.category === "PTY")[0].obsrValue,
    reh: items.filter((i:USNcstItem)=> i.category === "REH")[0].obsrValue,
    rn1: items.filter((i:USNcstItem)=> i.category === "RN1")[0].obsrValue,
    t1h: Number(items.filter((i:USNcstItem)=> i.category === "T1H")[0].obsrValue) ,
    vec: Number(items.filter((i:USNcstItem)=> i.category === "VEC")[0].obsrValue) ,
    wsd: items.filter((i:USNcstItem)=> i.category === "WSD")[0].obsrValue
  };
  return uNcst
};
/**
 * 단기 예보 api를 받아와서 해당 데이터를 자정부터 23사까자 시간별로 예보가 담긴 객체를 날짜별로 나열한 SVFcst type으로 변경해 반환 하는 비동기 함수
 * @param nx 예보 지점 x 좌표
 * @param ny  예보 지점 y 좌표
 * @param baseDate  예보 발표 일자
 * @param baseTime  예보 발표 시각
 * @returns  Promise<SVFcst>
 */
export const getSVFcast =async(nx:string, ny:string, baseDate:string)=>{
  const url =getSFApiUrl(inqury_short_vilageFcst, nx,ny, baseDate ,"0000")
  const items :SFcstItem[] = await getApiItems(url);
  let timeArry :string[] =[];
  for (let t = 0; t < 24; t++) {
    let time ;
    if(t < 10){
      time = `${t}000` ;
    }else{
      time = `${t}00`;
    };
    timeArry.push(time);  
  };
  const dayLater =[0,1,2,3];
  const sVFcst: SVFcst= dayLater.map((d:number)=>{
    const fcstData =JSON.stringify(baseDate + d)
    /**
     * items 중에 오늘, 1일 후,2일 후 ,3일 후 중 타켓이 되는 날에 대한 단기 예보
     */
    const targetDaySVF = items
    .filter((i:SFcstItem)=>i.fcstDate === fcstData);
    /**
     * targetDaySVF를 SVFDay의 형식으로 변경한 객체
     */
    const daySVFcst :SVFDay = timeArry.map((t:string)=>{
      const timeSVF = targetDaySVF.filter((i:SFcstItem)=> i.fcstTime=== t);
      const fcast :SVFTime ={
        fcstDate:fcstData,
        fcstTime:t,
        pop: timeSVF.filter((i:SFcstItem)=> i.category === "POP")[0].fcstValue,
        pty: timeSVF.filter((i:SFcstItem)=> i.category === "PTY")[0].fcstValue, 
        pcp: timeSVF.filter((i:SFcstItem)=> i.category === "PCP")[0].fcstValue,
        reh: timeSVF.filter((i:SFcstItem)=> i.category === "REH")[0].fcstValue ,
        sno: timeSVF.filter((i:SFcstItem)=> i.category === "SNO")[0].fcstValue,
        sky: timeSVF.filter((i:SFcstItem)=> i.category === "SKY")[0].fcstValue,
        tmp:Number(timeSVF.filter((i:SFcstItem)=> i.category === "TMP")[0].fcstValue) ,
        tmn:Number(timeSVF.filter((i:SFcstItem)=> i.category === "TMN")[0].fcstValue) ,
        tmx:Number(timeSVF.filter((i:SFcstItem)=> i.category === "TMX")[0].fcstValue) ,
        vec: Number(timeSVF.filter((i:SFcstItem)=> i.category === "VEC")[0].fcstValue) ,
        wsd: timeSVF.filter((i:SFcstItem)=> i.category === "WED")[0].fcstValue
      };
      return fcast;
    });
    return daySVFcst;
  });
  return sVFcst
};
export const getMidFcast =async(regld:MidLandAreaCode|MidTaAreaCode, tmFc:number, inqury:MidInqury):Promise<MidLandFcst | MidTaFcst | undefined>=>{
  const url =`${midFcstApi.url}/${inqury}?serviceKey=${midFcstApi.key}&dataType=JSON&regld=${regld}&tmFc=${tmFc}`;
  const items = await getApiItems(url);
  switch (inqury) {
    case "getMidLandFcst":
    const midLandFcst:MidLandFcst = [{
                                        dyalater:3,
                                        wfAm:items.item.wf3Am,
                                        wfPm:items.item.wf3Pm,
                                        rnStAm:items.item.rnSt3Am,
                                        rnStPm:items.item.rnSt3Pm,
                                      },{
                                        dyalater:4,
                                        wfAm:items.item.wf4Am,
                                        wfPm:items.item.wf4Pm,
                                        rnStAm:items.item.rnSt4Am,
                                        rnStPm:items.item.rnSt4Pm,
                                      },{
                                        dyalater:5,
                                        wfAm:items.item.wf5Am,
                                        wfPm:items.item.wf5Pm,
                                        rnStAm:items.item.rnSt5Am,
                                        rnStPm:items.item.rnSt5Pm,
                                      }
                                      ,{
                                        dyalater:6,
                                        wfAm:items.item.wf6Am,
                                        wfPm:items.item.wf6Pm,
                                        rnStAm:items.item.rnSt6Am,
                                        rnStPm:items.item.rnSt6Pm,
                                      },
                                      {
                                        dyalater:7,
                                        wfAm:items.item.wf7Am,
                                        wfPm:items.item.wf7Pm,
                                        rnStAm:items.item.rnSt7Am,
                                        rnStPm:items.item.rnSt7Pm,
                                      }
                                    ];
                                                
    return midLandFcst;
    case "getMidTa":
      const midTaFcst :MidTaFcst =[{
                                      daylater :3,
                                      taMin: items.item.taMin3,
                                      taMax: items.item.taMax3
                                    },{
                                      daylater :4,
                                      taMin: items.item.taMin4,
                                      taMax: items.item.taMax4
                                    },
                                    {
                                      daylater :5,
                                      taMin: items.item.taMin4,
                                      taMax: items.item.taMax4
                                    },
                                    {
                                      daylater :6,
                                      taMin: items.item.taMin4,
                                      taMax: items.item.taMax4
                                    },
                                    {
                                      daylater :7,
                                      taMin: items.item.taMin4,
                                      taMax: items.item.taMax4
                                    }
                                  ];
      return midTaFcst ;
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
