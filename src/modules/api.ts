import { ApiAreaCode, MidLandAreaCode, MidTaAreaCode } from "./areCodeType";
import { cloudy, PmType, SkyType, sunny, veryCloudy } from "./statetypes";
import {USNcstItem, SVFcst,  USNcst, SFcstItem, SVFTime, SVFDay, MidFcst, PmGrade, ApItem, SVFBaseTime, SFcstItemBase, KakaoDoumentType}from "./apiType";
import { sfGrid ,SFGridItem} from './sfGrid'; 

const publicApiKey = process.env.REACT_APP_PUBLIC_KEY ;
const kakaoKey = process.env.REACT_APP_KAKAO_KEY;


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
 * 시도별 실시간 대기오염 측정 정보 조회 
 */
const inqury_air_ctprvnRltmMesureDnsty  ="getCtprvnRltmMesureDnsty";

type SFInqury =typeof inqury_short_ultraSrtFcst|
typeof inqury_short_ultraSrtNcst|
typeof inqury_short_vilageFcst ;

type Api ={
  url:string,
  inqury:string
};

/**
 * Api for short-term forecast
 */

const shortFcstApi:Api ={
  url:returnApiUrl("VilageFcstInfoService_2.0") ,
  inqury:inqury_short_ultraSrtFcst ||  inqury_short_ultraSrtNcst||
  inqury_short_vilageFcst
};
/**
 * Api for medium term forecas
 */
const midFcstApi :Api ={
  url:returnApiUrl("MidFcstInfoService"),
  inqury:inqury_mid_midLandFcst || 
  inqury_mid_midTa
};

/**
 * Api for air pollution
 */
const apInformApi:Api ={
  url:"http://apis.data.go.kr/B552584/ArpltnInforInqireSvc",
  inqury:inqury_air_ctprvnRltmMesureDnsty
};

/** 
 * Api for sunset and sunrise
*/
export const sunApi:Api ={
  url :"http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService",
  inqury :"getLCRiseSetInfo"
};
/**
 * url 에 요청을 보내 외부 api에서 data를 가져오는 함수
 * @param url 
 * @returns Promise<any>
 */
const getApiItems =async(url:string)=>{
  const data = await fetch(url )
  .then((response)=> { console.log("response", response); return response.json()})
  .then((response)=> { 
      console.log("getapiitmes", response)
      const items =response.response.body.items
      return items
    })
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
export const getSFApiUrl =(inqury:SFInqury,nx:string, ny:string, baseDate:string, baseTime:string  ,numOfRows:string)=> {
  const url =`${shortFcstApi.url}/${inqury}?serviceKey=${publicApiKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&numOfRows=${numOfRows}`;
  return url
};
/**
 * 현재 시점에 대한 초단기 예보 api 데이터 중 SKY에 대한 값을 SkyType으로 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param baseTime : 현재 시점이 30분 이전면 이전 시로, 30분 이후이면 현재 시로 (ex "tt00")
 * @param fcstTime 현재 시
 * @return baseTime 기전으로 6시간 이내의 결과값
 */
export const getUSSkyCode =async(nx:string, ny:string, baseDate:string, baseTime:string, fcstTime:string ):Promise<SkyType | undefined>=>{
  const numOfRows = JSON.stringify(10000);
  const url =getSFApiUrl(inqury_short_ultraSrtFcst, nx,ny,baseDate,baseTime , numOfRows);
  const items = await getApiItems(url);
  const skyItems= items.item.filter((i:SFcstItem)=>
  i.category ==="SKY");
  const targetItem= skyItems.filter((i:SFcstItem)=> i.fcstTime =fcstTime)[0];
  const skyCode =targetItem.fcstValue ;
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
 * @param baseTime  발표시간(tt00): 현재 시각
 * @return Promise<USNcst> baseTime 기준으로 6시간 이내의 예보
 */
export const getUSNcast =async(nx:string, ny:string, baseDate:string, baseTime:string)=>{
  const url =getSFApiUrl("getUltraSrtNcst",nx,ny,baseDate,baseTime,"16");
  const items = await getApiItems(url);
  const uNcst:USNcst ={
    baseDate:baseDate,
    baseTime:baseTime,
    pty: items.item.filter((i:USNcstItem)=> i.category === "PTY")[0].obsrValue,
    reh: items.item.filter((i:USNcstItem)=> i.category === "REH")[0].obsrValue,
    rn1: items.item.filter((i:USNcstItem)=> i.category === "RN1")[0].obsrValue,
    t1h: Number(items.item.filter((i:USNcstItem)=> i.category === "T1H")[0].obsrValue) ,
    vec: Number(items.item.filter((i:USNcstItem)=> i.category === "VEC")[0].obsrValue) ,
    wsd: items.item.filter((i:USNcstItem)=> i.category === "WSD")[0].obsrValue
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
export const getSVFcast =async(nx:string, ny:string, baseDate:string, baseTime:SVFBaseTime)=>{
  const url =getSFApiUrl(inqury_short_vilageFcst, nx,ny, baseDate ,baseTime, "1000")
  const items  = await getApiItems(url);

  let timeArry :string[] =[];
  for (let t = 0; t < 24; t++) {
    let time ;
    if(t < 10){
      time = `0${t}00` ;
    }else{
      time = `${t}00`;
    };
    timeArry.push(time);  
  };
  const baseTimeIndex= timeArry.indexOf(baseTime);
  const todayTimeArry = timeArry.slice(baseTimeIndex+1);
  const dayLater =[0,1,2,3];
  const sVFcst: SVFcst= dayLater.map((d:number)=>{
    const fcstData =JSON.stringify( Number(baseDate) + d)
    /**
     * items 중에 오늘, 1일 후,2일 후 ,3일 후 중 타켓이 되는 날에 대한 단기 예보
     */
    const targetDaySVF : SFcstItem[]= items.item
    .filter((i:SFcstItem)=>i.fcstDate === fcstData);
    
    const tmn = items.item.filter((i:SFcstItem)=>i.category === "TMN")[0];
    const tmx = items.item.filter((i:SFcstItem)=>i.category === "TMX")[0];
    /**
     * targetDaySVF를 SVFDay의 형식으로 변경한 객체
     */
    const getDaySvf =(arry:string[])=>{
      return arry.map((t:string)=>{
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
          tmn:(tmn.fcstValue) ,
          tmx:(tmx.fcstValue) ,
          vec: Number(timeSVF.filter((i:SFcstItem)=> i.category === "VEC")[0].fcstValue) ,
          wsd: timeSVF.filter((i:SFcstItem)=> i.category === "WSD")[0].fcstValue
        };
        return fcast;
      });
    };
    const daySVFcst :SVFDay =  d === 0? getDaySvf(todayTimeArry) :getDaySvf(timeArry)
    return daySVFcst;
  });
  return sVFcst
};
/**
 * 
 * @param landRegId 중기 육상 예보 요청 메세지에 필요한 지역코드
 * @param taRegId  중기 기온 예보 요청 메세지에 필요한 지역코드
 * @param today 오늘 (형태:YYYDD)
 * @param yesterday 어제 (형태:YYYDD)
 * @param hours 현재 시각
 * @returns Promise<MidFcst>
 */
export const getMidFcast =async(landRegId:MidLandAreaCode, taRegId:MidTaAreaCode, today:string,yesterday:string, hours:number ):Promise<MidFcst>=>{
  const tmFcTime :string = hours < 6 || hours> 18? "1800" :  "0600" ;
  const tmFcDate = hours < 6? yesterday : today ;
  /**
   * 중기 육상/기온 예보 요청 메세지를 보낼 때 필요한 예보 발표시각 ( 형태: YYMMDDTTMM) (일 2회(06:00,18:00)회 생성)
   */
  const tmFc =`${tmFcDate}${tmFcTime}`;
  const common =`serviceKey=${publicApiKey}&dataType=JSON&tmFc=${tmFc}`
  const landUrl =`${midFcstApi.url}/${inqury_mid_midLandFcst}?regId=${landRegId}&${common}`;
  const taUrl =`${midFcstApi.url}/${inqury_mid_midTa}?regId=${taRegId}&${common}`;
  const landItems = await getApiItems(landUrl);
  const taItems = await getApiItems(taUrl);
  const midFcst:MidFcst = [{
                            dyalater:3,
                            wfAm:landItems.item[0].wf3Am,
                            wfPm:landItems.item[0].wf3Pm,
                            rnStAm:landItems.item[0].rnSt3Am,
                            rnStPm:landItems.item[0].rnSt3Pm,
                            taMax:taItems.item[0].taMax3,
                            taMin:taItems.item[0].taMin3
                          },{
                              dyalater:4,
                              wfAm:landItems.item[0].wf4Am,
                              wfPm:landItems.item[0].wf4Pm,
                              rnStAm:landItems.item[0].rnSt4Am,
                              rnStPm:landItems.item[0].rnSt4Pm,
                              taMax:taItems.item[0].taMax4,
                              taMin:taItems.item[0].taMin4
                          },{
                              dyalater:5,
                              wfAm:landItems.item[0].wf5Am,
                              wfPm:landItems.item[0].wf5Pm,
                              rnStAm:landItems.item[0].rnSt5Am,
                              rnStPm:landItems.item[0].rnSt5Pm,
                              taMax:taItems.item[0].taMax5,
                              taMin:taItems.item[0].taMin5
                          },{
                              dyalater:6,
                              wfAm:landItems.item[0].wf6Am,
                              wfPm:landItems.item[0].wf6Pm,
                              rnStAm:landItems.item[0].rnSt6Am,
                              rnStPm:landItems.item[0].rnSt6Pm,
                              taMax:taItems.item[0].taMax6,
                              taMin:taItems.item[0].taMin6
                            },{
                              dyalater:7,
                              wfAm:landItems.item[0].wf7Am,
                              wfPm:landItems.item[0].wf7Pm,
                              rnStAm:landItems.item[0].rnSt7Am,
                              rnStPm:landItems.item[0].rnSt7Pm,
                              taMax:taItems.item[0].taMax7,
                              taMin:taItems.item[0].taMin7
                            }
                          ];
  return midFcst
};
/**
 * 미세먼지, 초미세먼지 등급을 반환하는 함수
 * @param sidoName 
 * @param stationName (type: string[]) 측정 지역의 행정구역명을 시/도 ,구/군/시, 구/시, 읍/면/동, 리/동 으로 나누어 배열형태로 나타낸것 
 * @returns Promise<PmGrade>
 */
export const getApInform =async(sidoName:ApiAreaCode, stationName:string[])=>{
  const url = `${apInformApi.url}/${apInformApi.inqury}?sidoName=${sidoName}&returnType=JSON&serviceKey=${publicApiKey}&numOfRows=100000&ver=1.3`;
  const items =await getApiItems(url);
  const targetItem:ApItem = items.filter((i:ApItem)=> stationName.includes(i.stationName))[0];
  const gradeArry : PmType[]=["좋음","보통","나쁨","매우 나쁨"];
  const pm :PmGrade = {
    pm10Grade1h:gradeArry[Number(targetItem.pm10Grade1h) -1],
    pm25Grade1h:gradeArry[Number(targetItem.pm25Grade1h)-1]
  };
  return pm
};

/**
 * 
 * @param longitude longitude ( 실수(초/100): 서울-126.98000833333333 )
 * @param latitude  latitude ( 실수 (초/100): 서울 -37.56356944444444)
 */
export const getSunInform =async(longitude:string, latitude:string ,baseDate:string)=>{
  const url =`${sunApi.url}/${sunApi.inqury}?longitude=${longitude}&latitude=${latitude}&locdate=${baseDate}&dnYn=Y&ServiceKey=${publicApiKey}`;
  return await fetch(url)
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
const findAreaGrid =(doc:KakaoDoumentType)=>{
  const arry1 = sfGrid.filter((i)=> i.arePt1 === doc.region_1depth_name);

  if(arry1[0]=== undefined){
    return undefined
  }else{
    const arry2 = arry1.filter((i)=> i.arePt2 === doc.region_2depth_name);

    if(arry2[0]!==undefined){
      const arry3= arry2.filter((i)=>i.arePt3 === doc.region_3depth_name);
  
      if(arry3[0]!==undefined){
        return arry3[0]
      }else{
        return arry2.filter((i)=> i.arePt3 === null)[0]
      }
    }else{
      return arry1.filter((i)=>i.arePt2 === null)[0]
    }
  }

  
};

export const  getAreaData =async(latitude:string, longitude:string)=>{
  const url =`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  return await fetch(url,{
    method:'GET',
    headers: {
      'Authorization': `KakaoAK ${kakaoKey}`,
    }
  })
  .then(re => re.json())
  .then(data =>{
    const gridDataArry :SFGridItem[] =data.documents.map((doc:KakaoDoumentType)=>findAreaGrid(doc)).filter((i:SFGridItem|undefined)=> i !==undefined)
    ;
    const arePt3IsNotNull = gridDataArry.filter((i:SFGridItem)=> i.arePt3 !==null);

    if(arePt3IsNotNull[0]!==undefined){
      return arePt3IsNotNull[0]
    }else{
      const arePt2IsNotNull = gridDataArry.filter((i:SFGridItem)=> i.arePt2 !==null);
      if(arePt2IsNotNull[0]!==undefined){
        return arePt2IsNotNull[0]
      }else{
        return gridDataArry[0]
      }
    }

  })
  .catch(e => console.log("kakao error",e))
export function getMidLandAreaCode (sfGrid:SFGridItem){
  const mid1 =["서울특별시", "인천광역시", "경기도"];
  const mid2_3 =["강원도"];
  const mid4 =["대전광역시", "세종특별자치시", "충청남도"];
  const mid5 =["충청북도"];
  const mid6 =["광주광역시", "전라남도"];
  const mid7 =["전라남도"];
  const mid8 =["대구광역시", "경상북도"];
  const mid9 =["부산광역시", "울산광역시" ,"경상북도"];
  const mid10 =["제주특별자치도"];
  const mid =[mid1, mid2_3, mid4 ,mid5 , mid6 ,mid7 ,mid8 ,mid9 ,mid10];

  const west =["철원군", "화천군" ,"양구군", "인제군", "춘천시", "홍천군", "횡성군","원주시","평창군","영월군", "정선군"];

  const east =["강릉시", "삼척시", "태백시", "동해시", "양양군", "속초시", "고성군"]

  const pt1 =sfGrid.arePt1;

  for (let i = 0; i < mid.length; i++) {
    const element = mid[i];
    if(pt1 === "강원도"){
      const pt2 = sfGrid.arePt2;
      if(pt2 ==null || !west.includes(pt2)){
        // 강원도영동
        return midLandAreaCodeZip[2]
      }else{
        //강원도영서
        return midLandAreaCodeZip[1]
      }
    }else{
      if(element.includes(pt1)){
        const midLandAreaCode = midLandAreaCodeZip[i];
        return midLandAreaCode
      }
    }
  }
};

export function getMidTaAreaCode(sfGrid:SFGridItem){
  const pt1 =sfGrid.arePt1;
  const pt2 =sfGrid.arePt2;
  const megalopolis =["부산광역시", "인천광역시", "대구광역시", "대전광역시", "광주광역시", "울산광역시"];
  const pt1Arry =[...megalopolis, "서울특별시","세종특별시","제주특별자치도" ,"이어도"];
  const getCodeFromArry =(area:string)=>{
    const index = midTaArea.indexOf(area);
    return midTaAreaCode[index];
  };
  //use pt1
  if(pt1Arry.includes(pt1)){
    if(pt1 ==="서울특별시"){
      return getCodeFromArry("서울")
    }else if(megalopolis.includes(pt1)){
      const area =pt1.slice(0,2);
      return getCodeFromArry(area);
    }else if(pt1==="세종특별자치시"){
      return getCodeFromArry("세종")
    }else if(pt1==="제주특별자치도"){
      return getCodeFromArry("제주")
    }else if(pt1 ==="이어도"){
      return getCodeFromArry("이어도")
    }
  }else{
      //use pt2 
    if(pt2 !==null){
      const pt2Area =pt2.slice(0,2);
      if(pt1==="경기도" && pt2Area==="광주"){
        return getCodeFromArry("광주(경기도")
      }else if(pt2Area==="고성"){
        switch (pt1) {
          case "강원도":
            return getCodeFromArry("고성(강원도)");
          case "경상남도":
            return  getCodeFromArry("고성(경남)");
          default:
            break;
        }
      }else{
        return getCodeFromArry(pt2Area)
      }
    }
  }
};

export function getApAreaCode(sfGrid:SFGridItem):ApiAreaCode{
  const pt1 =sfGrid.arePt1;
  const arry =["충청븍도", "층청남도","전라북도",
"전라남도","경상북도","경상남도"];
  if(arry.includes(pt1)){
    const first =pt1.slice(0,1);
    const second =pt1.slice(2,3);
    const area = first.concat(second) as ApiAreaCode
    console.log("[getApAreaCode]","are", area)
    return area
  }else{
    const area = pt1.slice(0,2);
    console.log("[getApAreaCode]","are", area)
    return area as ApiAreaCode
  }
};