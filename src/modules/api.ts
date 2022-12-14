import { ApiAreaCode, MidLandAreaCode, midLandAreaCodeZip, midTaArea, midTaAreaCode, MidTaAreaCode } from "./areaCodeType";
import {  Area, areaArry, AreaInform, DailyWeather, Day, getSkyCode, getSkyType, getWsd, PmType, SkyCodeType, WeatherState } from "./weather/types";
import {USNcstItem, SVFcst,  USNcst, SFcstItem, SVFTime, SVFDay, MidFcst, PmGrade, ApItem, SVFBaseTime,  KakaoDoumentType, MidFcstDay}from "./apiType";
import { sfGrid} from './sfGrid'; 
import { SFGridItem } from "./position/types";

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
const sunApi:Api ={
  url :"http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService",
  inqury :"getLCRiseSetInfo"
};

/**
 * url 에 요청을 보내 외부 api에서 data를 가져오는 함수
 * @param url 
 * @returns Promise<any>
 */
const getApiItems =async(url:string , where:string):Promise<any|Error>=>{
  const data = await fetch(url )
  .then((response)=> { 
    return response.json()})
  .then((response)=> { 
    if(response.response.body !==undefined){
      const items =response.response.body.items;
      return items
    }else{
      const error = new Error( `[${where}_ getApiItems]: response.body is undefined // response: ${response}`);
      return error
    }

    })
  .catch((e:Error)=> {
    return e;
  });
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
const getSFApiUrl =(inqury:SFInqury,nx:string, ny:string, baseDate:string, baseTime:string  ,numOfRows:string)=> {
  const url =`${shortFcstApi.url}/${inqury}?serviceKey=${publicApiKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&numOfRows=${numOfRows}`;
  return url
};
/**
 * 현재 시점에 대한 초단기 예보 api 데이터 중 SKY에 대한 값을 SkyType으로 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param fcstTime 현재 시
 * @return Promise<SkyCodeType| string>
 */
const getUSSkyCode =async(nx:string, ny:string, baseDate:string, baseTime:string, fcstTime:string ):Promise<SkyCodeType| Error>=>{
  const numOfRows = JSON.stringify(10000);
  const url =getSFApiUrl(inqury_short_ultraSrtFcst, nx,ny,baseDate,baseTime , numOfRows);
  const items = await getApiItems(url, "usskycode");
  if(items instanceof Error){
    return items ;
  }else{
    const skyItems= items.item.filter((i:SFcstItem)=>
    i.category ==="SKY");
    const targetItem= skyItems.filter((i:SFcstItem)=> i.fcstTime =fcstTime)[0];
    const skyCode = getSkyCode(targetItem.fcstValue);
    return skyCode
  }

};
/**
 * 현재 시점에 대한 초단기 실황 api 데이터를 반환하는 함수
 * @param nx 예보지점 x 좌표
 * @param ny 예보지점 y좌표
 * @param baseDate  발표일자(yyyymmdd)
 * @param fcstTime   현재 시각
 * @return Promise<USNcst|string> fcstTime 기준으로 6시간 이내의 예보
 */
const getUSNcast =async(nx:string, ny:string, baseDate:string ,fcstTime:string)=>{
  const url =getSFApiUrl("getUltraSrtNcst",nx,ny,baseDate,fcstTime,"16");
  const items = await getApiItems(url , "usncst");
  if(items instanceof Error){
    return items; 
  }else{
    const uNcst:USNcst ={
      baseDate:baseDate,
      baseTime:fcstTime,
      pty: items.item.filter((i:USNcstItem)=> i.category === "PTY")[0].obsrValue,
      reh: items.item.filter((i:USNcstItem)=> i.category === "REH")[0].obsrValue,
      rn1: items.item.filter((i:USNcstItem)=> i.category === "RN1")[0].obsrValue,
      t1h: Number(items.item.filter((i:USNcstItem)=> i.category === "T1H")[0].obsrValue) ,
      vec: Number(items.item.filter((i:USNcstItem)=> i.category === "VEC")[0].obsrValue) ,
      wsd: items.item.filter((i:USNcstItem)=> i.category === "WSD")[0].obsrValue
    };
    return uNcst
  }
};
/**
 * targetDaySVF를 SVFDay의 형식으로 변경한 객체
 */
const getDaySvf =(arry:string[], targetDaySVF :SFcstItem[], fcstData:string ,tmn:SFcstItem ,tmx:SFcstItem):SVFTime[]=>{
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
/**
 * 단기 예보 api를 받아와서 해당 데이터를 자정부터 23사까자 시간별로 예보가 담긴 객체를 날짜별로 나열한 SVFcst type으로 변경해 반환 하는 비동기 함수
 * @param nx 예보 지점 x 좌표
 * @param ny  예보 지점 y 좌표
 * @param baseDate  예보 발표 일자 (오늘 일자)
 * @param baseTime  예보 발표 시각 (예보 시각 중 현재 시각과 가장 가까운 시간)
 * @param yesterday 어제 일자
* @param timArry  00:00 23:00 까지 string type의 시간을 담은 배열
* @param todayTimeArry  현재 시각으로 부터 남은 시간 배열 
* @param threeDays  오늘 부터 2일 이후의 날짜들을 담은 배열 
 * @returns  Promise<SVFcst|string>
 */ 
const getSVFcast =async(nx:string, ny:string, baseDate:string, baseTime:SVFBaseTime , yesterday:string,timeArry:string[], todayTimeArry:string[], threeDays:string[]):Promise<SVFcst|Error>=>{
  const url1 = getSFApiUrl(inqury_short_vilageFcst, nx,ny, yesterday ,"2300", "10000");
  const url2 =getSFApiUrl(inqury_short_vilageFcst, nx,ny, baseDate ,baseTime, "10000");
  const items1 =await getApiItems(url1 ,"svfcast+_items1");
  const items2  = await getApiItems(url2 ,"svfcast_items2");
  if(!(items1 instanceof Error) && !(items2 instanceof Error)){
    /**
   * timeArry에서 todayTimeArry를 제한 것으로,예보 발표시각 이전의 예보를 선별하는데 사용함
   */
    const previousTime = timeArry.slice(0, 24 - todayTimeArry.length);
    const tmn = items2.item.filter((i:SFcstItem)=>i.category === "TMN")[0];
    const tmx = items2.item.filter((i:SFcstItem)=>i.category === "TMX")[0];
    const fiteredItem1:SFcstItem[] =items1.item.filter((i:SFcstItem)=> i.fcstDate === baseDate &&  previousTime.includes(i.fcstTime));
    const preSVDay :SVFDay = getDaySvf(previousTime,fiteredItem1,baseDate,tmn,tmx);
    const sVFcst: SVFcst= threeDays.map((d:string)=>{
      /**
       * items2 중에 오늘, 1일 후,2일 후 ,3일 후 중 타켓이 되는 날에 대한 단기 예보
       */
      const targetDaySVF : SFcstItem[]= items2.item
      .filter((i:SFcstItem)=>i.fcstDate === d);

      if(d === baseDate) {
        const daySVFcst :SVFDay = getDaySvf(todayTimeArry,targetDaySVF,d,tmn,tmx);
        return [...preSVDay, ...daySVFcst]
      }else{
        const daySVFcst :SVFDay = getDaySvf(timeArry,targetDaySVF,d,tmn,tmx);
        return daySVFcst
      };
    });

    return sVFcst
  }else{
    if(items1 instanceof Error){
      if(items2 instanceof Error){
        const error = new Error (`error 1: ${items1}// error2 : ${items2}`);
        return error
      }else{
        return items1
      }
    }else{
      return items2
    }
  }
  
};
/**
 * 
 * @param landRegId 중기 육상 예보 요청 메세지에 필요한 지역코드
 * @param taRegId  중기 기온 예보 요청 메세지에 필요한 지역코드
 * @param today 오늘 (형태:YYYDD)
 * @param yesterday 어제 (형태:YYYDD)
 * @param hours 현재 시각
 * @returns Promise<MidFcst|string>
 */
const getMidFcast =async(landRegId:MidLandAreaCode, taRegId:MidTaAreaCode, today:string,yesterday:string, hours:number ):Promise<MidFcst|Error>=>{
  const tmFcTime :string = hours < 6 || hours> 18? "1800" :  "0600" ;
  const tmFcDate = hours < 6? yesterday : today ;
  /**
   * 중기 육상/기온 예보 요청 메세지를 보낼 때 필요한 예보 발표시각 ( 형태: YYMMDDTTMM) (일 2회(06:00,18:00)회 생성)
   */
  const tmFc =`${tmFcDate}${tmFcTime}`;
  const common =`serviceKey=${publicApiKey}&dataType=JSON&tmFc=${tmFc}`
  const landUrl =`${midFcstApi.url}/${inqury_mid_midLandFcst}?regId=${landRegId}&${common}`;
  const taUrl =`${midFcstApi.url}/${inqury_mid_midTa}?regId=${taRegId}&${common}`;
  const landItems = await getApiItems(landUrl, "midFcast_landItems");
  const taItems = await getApiItems(taUrl , "midFcast_taItems");
  if(!(landItems instanceof Error) && !(taItems instanceof Error)){
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
  }else{
    if(landItems instanceof Error){
      if(taItems instanceof Error){
        const error =new Error(` error1 : ${landItems}  ///  error2:${taItems}`)
        return error; 
      }else{
      return landItems
      }
    }else{
      return taItems
    }
  }

};
/**
 * 미세먼지, 초미세먼지 등급을 반환하는 함수
 * @param sidoName 
 * @param stationName (type: string[]) 측정 지역의 행정구역명을 시/도 ,구/군/시, 구/시, 읍/면/동, 리/동 으로 나누어 배열형태로 나타낸것 
 * @returns Promise<PmGrade|string>
 */
const getApInform =async(sidoName:ApiAreaCode, stationName:string[]):Promise<PmGrade|Error>=>{
  const url = `${apInformApi.url}/${apInformApi.inqury}?sidoName=${sidoName}&returnType=JSON&serviceKey=${publicApiKey}&numOfRows=100000&ver=1.3`;
  const items =await getApiItems(url ,"apInform");
  if(!(items instanceof Error)){
    const targetItem:ApItem = items.filter((i:ApItem)=> stationName.includes(i.stationName))[0];
    const gradeArry : PmType[]=["좋음","보통","나쁨","매우 나쁨"];
    const pm :PmGrade = {
      pm10Grade1h:gradeArry[Number(targetItem.pm10Grade1h) -1],
      pm25Grade1h:gradeArry[Number(targetItem.pm25Grade1h)-1]
    };
    return pm
  }else{
    return items
  }

};

/**
 * 
 * @param longitude longitude ( 실수(초/100): 서울-126.98000833333333 )
 * @param latitude  latitude ( 실수 (초/100): 서울 -37.56356944444444)
 */
const getSunInform =async(longitude:string, latitude:string,baseDate:string):
Promise<{
  sunrise: string | null | undefined;
  sunset: string | null | undefined;
  location: string | null | undefined;
} | Error>=>{
  const url =`${sunApi.url}/${sunApi.inqury}?longitude=${longitude}&latitude=${latitude}&locdate=${baseDate}&dnYn=Y&ServiceKey=${publicApiKey}`;
  return await fetch(url)
                .then(response => {
                  return response.text()
                })
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
                .catch((e:Error)=> {return e});
};

/**
 * kako API 에서 받아온 data를 활용해 적합한 sfGrid 값을 도출하는 함수 
 * @param doc 
 * @returns 
 */
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
/**
 * 현재 사용자의 위치(위도,경도)를 이용해 kakao API를 통해 현재 위치의 행정구역명을 찾아낸 후, 적합한 sfGrid 값을 반환하는 함수 
 * @param latitude 
 * @param longitude 
 * @returns 
 */
export const  getAreaData =async(latitude:string, longitude:string):Promise<SFGridItem | Error>=>{
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
  .catch((e:Error) => e);
};

/**
 * sfGrid를 이용해 현 위치에 대한 midLandAreaCode 를 반환
 * @param sfGrid 
 * @returns 
 */
function getMidLandAreaCode (sfGrid:SFGridItem){
  const mid1 =["서울특별시", "인천광역시", "경기도"];
  const mid2_3 =["강원도"];
  const mid4 =["대전광역시", "세종특별자치시", "충청남도"];
  const mid5 =["충청북도"];
  const mid6 =["광주광역시", "전라남도"];
  const mid7 =["전라북도"];
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
/**
 * sfGrid를 이용해 현 위치에 대한 midLandAreaCode 를 반환
 * @param sfGrid 
 * @returns 
 */
function getMidTaAreaCode(sfGrid:SFGridItem){
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
/**
 * sfGrid를 이용해 현 위치에 대한 ApiAreaCode 를 반환
 * @param sfGrid 
 * @returns 
 */
function getApAreaCode(sfGrid:SFGridItem):ApiAreaCode{
  const pt1 =sfGrid.arePt1;
  const arry =["충청븍도", "층청남도","전라북도",
"전라남도","경상북도","경상남도"];
  if(arry.includes(pt1)){
    const first =pt1.slice(0,1);
    const second =pt1.slice(2,3);
    const area = first.concat(second) as ApiAreaCode
    return area
  }else{
    const area = pt1.slice(0,2);
    return area as ApiAreaCode
  }
};


/**
 * 한자리 숫자를 0${number}를 바꾸는 함수
 * @param n  
 * @returns type:string
 */
const changeTwoDigit =(n:number)=>{
  if(n <10){
    return `0${JSON.stringify(n)}`
  }else{
    return JSON.stringify(n)
  }
}
/**
 * day(type:Date)를 `yyyymmdd` 형태로 변환
 * @param day 
 * @returns 
 */
const changeBaseDate =(day:Date)=>{
  const month =day.getMonth()+1;
  const date = day.getDate();
  const year =day.getFullYear();
  const baseDate = `${year}${changeTwoDigit(month)}${changeTwoDigit(date)}`;
  return baseDate
};
/**
 * 어제 날짜를 `yyyymmdd` 형태로 변환
 * @param date 
 * @returns 
 */
const getYesterDay =(date:number)=>{
  const yesterday = new Date( new Date().setDate(date -1));
  // new Date() 말고 today를 쓰면 today 가 이전 날로 변경되는 오류 발생
  return changeBaseDate(yesterday);
};
/**
 * 시간을 `hhmm`으로 변환
 * @param h 
 * @returns 
 */
const changeHourToString =(h:number)=> {
  const changedH =changeTwoDigit(h);
  return `${changedH}00`;
};
/**
 * sVFcst를 Day[]으로 변환
 * @param sVFcst 
 * @returns 
 */
function changeSvfToDay ( sVFcst: SVFcst){
  return sVFcst.map((d:SVFDay)=>{
    const am = d.slice(0,11);
    const pm =d.slice(12);
    const getAvg =(arry:number[])=>{
      const length =arry.length;
      const sum =arry.reduce((a,b)=>a+b);
      const avg = sum / length; 
      return avg 
    };
    const amData = {
      sky : getAvg(am.map((t:SVFTime)=>Number(t.sky))),
      pop:getAvg(am.map((t:SVFTime)=>Number(t.pop))),
      pty : getAvg(am.map((t:SVFTime)=> Number(t.pty))),
    };
    const pmData = {
      sky : getAvg(pm.map((t:SVFTime)=>Number(t.sky))),
      pop:getAvg(pm.map((t:SVFTime)=>Number(t.pop))),
      pty : getAvg(pm.map((t:SVFTime)=> Number(t.pty))),
    };


    const day:Day ={
      dayslater:sVFcst.indexOf(d), //0-5 (today=0)
      am:{
        pop: amData.pop,
        sky :getSkyType(amData.sky, amData.pty)
      },
      pm:{
        pop: pmData.pop,
        sky :getSkyType(pmData.sky, pmData.pty)
      },
      tmn:Number(d[0].tmn),
      tmx:Number(d[0].tmx)
    };
    return day
  });
};  
/**
 * midFcst를 Day[]으로 변환
 * @param midFcst 
 * @returns 
 */
function changeMidToDay(midFcst: MidFcst){
return midFcst.map((d:MidFcstDay)=>{
  const day:Day ={
    dayslater: midFcst.indexOf(d) + 3 ,
    am: {
      pop:Number(d.rnStAm),
      sky: d.wfAm
    },
    pm:{
      pop:Number(d.rnStPm),
      sky: d.wfPm
    },
    tmn: d.taMin,
    tmx: d.taMax
  };
  return day
});
};
/**
 * sfGrid 속 nX 와 nY를 string type 의 값으로 반환하는 함수 
 * @param sfGrid 
 * @returns 
 */
const changeNType =(sfGrid:SFGridItem)=>{
  const nX:string = typeof sfGrid.nX === "number"? 
    JSON.stringify(sfGrid.nX)
    : sfGrid.nX
    ;
    const nY: string = typeof sfGrid.nY === "number"? 
    JSON.stringify(sfGrid.nY)
    : sfGrid.nY
    ;

    return {
      nX:nX,
      nY:nY
    }
};
/**
 * sfGrid를 활용해 해당 위치의 단기 예보를 찾는데 쓰이는 midLandAreaCode와 midTaAreaCode를 찾아서 이를 반환
 * @param sfGrid 
 * @returns landRegId: MidLandAreaCode | undefined , taRegId: MidTaAreaCode | undefined;
 */
const findLandTaCode =(sfGrid:SFGridItem)=>{
  const landRegId: MidLandAreaCode |undefined =getMidLandAreaCode(sfGrid);
  const taRegId:MidTaAreaCode|undefined  = getMidTaAreaCode(sfGrid);

  return {
    landRegId:landRegId,
    taRegId:taRegId
  }
};
/**
 * weather 의 nation 값을 반환
 * @param baseDate_svf 
 * @param baseDate_today 
 * @param hours 
 * @param baseTime_svf 
 * @param baseDate_yesterday 
 * @param timeArry 
 * @param todayTimeArry 
 * @param threeDays 
 * @returns  Promise<Error | Area[]>
 */
const  getNationData =(baseDate_svf: string, baseDate_today:string, hours:number, baseTime_svf: SVFBaseTime, baseDate_yesterday: string, timeArry: string[], todayTimeArry: string[], threeDays: string[])=>{
  const data =Promise
  .all(areaArry.map(async(item:AreaInform)=>{
    const {nX, nY}= changeNType
    (item.sfGrid);
    const {landRegId, taRegId} =item ;
    const sVFcst =  await getSVFcast(nX,nY,baseDate_svf,baseTime_svf ,baseDate_yesterday,timeArry,todayTimeArry, threeDays);

    const midFcst =landRegId !==undefined && taRegId !==undefined? await getMidFcast(landRegId, taRegId,baseDate_today,baseDate_yesterday, hours ): (
      landRegId === undefined?
      (
        taRegId ===undefined?
        new Error('[Error] landRegId and taRegId are undefined')
        :
        new Error('[Error] landRegId is undefined')
      ):
      new Error('[Error] taRegId is undefined')
    );
    
    if(!(sVFcst instanceof Error) && !(midFcst instanceof Error)){
      const svfDay :Day[] =changeSvfToDay(sVFcst);
      const midDay: Day[] = changeMidToDay(midFcst);

      const area : Area ={
        areaInform:{
          ...item
        },
        day:[...svfDay, ...midDay]
      };
      return area
    }else{
      const area : Area ={
        areaInform:{
          ...item
        },
        day:null
      };
      return area
    }

  }
  ))
  .then((result)=> result)
  .catch((err)=>{
    const error =new Error( err);
    return error
  })
  ;
  return data
};
/**
 * 현 위치에 대한  현재 날씨, 앞으로의 기상 전망, 일몰,전국 날씨를 반환하거나 error 메시지가 담긴 글을 반환
 * @param sfGrid 
 * @param longitude 
 * @param latitude 
 * @returns 
 */
export const getWeatherData =async(sfGrid:SFGridItem , longitude:string, latitude:string)=>{
  const {nX, nY}= changeNType(sfGrid);
  const stationName: string[] =(sfGrid.arePt3 !==null && sfGrid.arePt2 !==null )?  [sfGrid.arePt1, sfGrid.arePt2, sfGrid.arePt3] : sfGrid.arePt2!==null? [sfGrid.arePt1, sfGrid.arePt2] :[sfGrid.arePt1];
  const {landRegId, taRegId} = findLandTaCode(sfGrid);
  const sidoName: ApiAreaCode = getApAreaCode(sfGrid);
  const today = new Date();
  const hours =today.getHours();
  const minutes =today.getMinutes();
  const date =today.getDate();
  const preHours = hours -1 ;
  const dayLater =[0,1,2];
  const threeDays =dayLater.map( (d:number)=> { 
    const later = new Date (new Date().setDate(date + d )); 
    return changeBaseDate(later);
  });

  const baseDate_today =changeBaseDate(today);
  const baseDate_yesterday =getYesterDay(date);
  const baseDate_skyCode = minutes < 30 && hours === 0 ? 
                          baseDate_yesterday
                          :
                          baseDate_today ;
  const baseDate_svf = hours < 2 ? baseDate_yesterday :baseDate_today;
  
  const baseTime_svf:SVFBaseTime=(()=>{
    let time :SVFBaseTime ="0200";
    const svfBaseTime =[2,5,8,11,14 ,17,20,23];
    for (let index = 0; index < svfBaseTime.length; index++) {
      const element = svfBaseTime[index];
      if(hours < 2){
        time ="2300";
      }else if(hours !==23){
        if(hours >= element && hours < svfBaseTime[index+1]){
          if(element <10){
            time =`0${JSON.stringify(element)}00` as SVFBaseTime
          }else{
            time =`${JSON.stringify(element)}00` as SVFBaseTime
          } 
        }
      }else{
        time ="2300"
      }
      
    };
    return time
  })();
  const preFcstTime :string = changeHourToString( hours -1);
  const fcstTime : string = changeHourToString(hours) ;
  const baseTime_skyCode :string = baseDate_skyCode === baseDate_today ?  
  (minutes > 30? fcstTime :changeHourToString(preHours))
  :"2300";

  const timeArry =(()=>{
    let arry :string[] =[] ;
    for (let t = 0; t < 24; t++) {
      if(t < 10){
        t === 0 ?
        arry = ["0000"]:
        arry.push(`0${t}00` )
      }else{
        arry.push(`${t}00`);
      };
    };
    return arry
  })();

  const baseTimeIndex= timeArry.indexOf(fcstTime);
  const todayTimeArry = timeArry.slice(baseTimeIndex+1);
  //get api data
  const skyCode = await getUSSkyCode(nX, nY, baseDate_skyCode,baseTime_skyCode,fcstTime);
  const uSNcst = minutes < 40 ? 
                (hours === 0 ?
                  await getUSNcast(nX, nY, baseDate_yesterday, "2300")
                  : 
                await getUSNcast(nX, nY, baseDate_today, preFcstTime)
                )
                :await getUSNcast(nX, nY, baseDate_today, fcstTime);
  const sVFcst = await getSVFcast(nX,nY,baseDate_svf,baseTime_svf ,baseDate_yesterday,timeArry,todayTimeArry, threeDays);
  const midFcst =landRegId !==undefined && taRegId !==undefined? await getMidFcast(landRegId, taRegId,baseDate_today,baseDate_yesterday, hours ): (
    landRegId === undefined?
    (
      taRegId ===undefined?
      new Error('[Error] landRegId and taRegId are undefined')
      :
      new Error('[Error] landRegId is undefined')
    ):
    new Error('[Error] taRegId is undefined')
  );
  const nationData = await getNationData(baseDate_svf,baseDate_today,hours,baseTime_svf,baseDate_yesterday,timeArry ,todayTimeArry, threeDays);

  const apGrade = await getApInform(sidoName,stationName);
  const sunInform =await getSunInform(longitude,latitude,baseDate_today);
    
  // state로 변경 
  const changeHourItem =(t:SVFTime)=>({
    date:t.fcstDate,
    hour:t.fcstTime,
    temp:t.tmp,
    //강수확률(%)
    pop:t.pop,
    //강수량(mm)
    pcp:t.pcp,
    wind:{
      vec :getWsd(t.vec),
      wsd:t.wsd
    },
    reh:t.reh
  });



  if( !(skyCode instanceof Error)  &&   
      !(sVFcst instanceof Error ) && 
      !(uSNcst instanceof Error )&&
      !(midFcst instanceof Error)  && 
      !(apGrade instanceof Error ) &&  
      !(sunInform instanceof Error) &&
      !(nationData instanceof Error)){
        
    const targetSVFcst = sVFcst.map((i:SVFDay)=>{
      if(sVFcst.indexOf(i)===0){
        return sVFcst[0].filter((t:SVFTime)=> todayTimeArry.includes(t.fcstTime))
      }else{
        return i
      }
    });
    const svfDay :Day[] =changeSvfToDay(sVFcst);

    const midDay: Day[] = changeMidToDay(midFcst);
    
    const weather :WeatherState ={
      state:"success",
      error:null,
      nowWeather : {
        tmp:uSNcst.t1h,
        sky:skyCode,
        reh:uSNcst.reh,
        wind: {
          vec: getWsd(uSNcst.vec),
          wsd: uSNcst.wsd
        },
        pm10Grade: apGrade.pm10Grade1h,
        pm25Grade: apGrade.pm25Grade1h
      },
      threeDay : targetSVFcst.map((d:SVFDay)=> {
        const daily :DailyWeather ={
          date: threeDays[targetSVFcst.indexOf(d)],
          hourly:d.map((t:SVFTime)=> changeHourItem(t))
        };
        return daily
      }),
      weekly:[...svfDay, ...midDay],
      nation:nationData,
      sunRiseAndSet : {
        sunRise :sunInform.sunrise ,
        sunSet : sunInform.sunset
      }
    };
    return weather;
  }else{
    let string ="[Error]";
    skyCode instanceof Error  &&   string.concat(`skyCode error: ${skyCode}`);
    sVFcst instanceof Error  && string.concat(`skyCode error: ${sVFcst}`);
    uSNcst instanceof Error && string.concat(`skyCode error: ${uSNcst}`);
    midFcst  instanceof Error  && string.concat(`skyCode error: ${midFcst}`);
    apGrade  instanceof Error  &&  string.concat(`skyCode error: ${apGrade}`);
    sunInform instanceof Error && string.concat(`skyCode error: ${sunInform}`);
    nationData instanceof Error && string.concat(`nationData error: ${nationData}`)
    return string
  }
};