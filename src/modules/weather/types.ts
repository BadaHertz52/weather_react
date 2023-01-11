import { MidLandAreaCode, MidTaAreaCode } from '../areaCodeType';
import { SFGridItem } from '../position';
import { sfGrid } from '../sfGrid';
import {reset , request, success ,failure } from './reducer';

export const sunny ="맑음"; // sky code =1
export const cloudy ="구름많음" // sky code =3
export const veryCloudy ="흐림" // sky code =4
export const spellRain ="한때 비";
export const rainy ="비"; // pty code =1 or 5
export const snowRain ="비 또는 눈" //pty =2 or 6 
export const snow ="눈" // pty code =3 or 7
export const shower ="소나기" //pty code=4
export const cldRain ="구름많고 비";
export const cldSnow ="구름많고 눈";
export const cldRainSnow ="구름많고 비/눈";
export const cldShower ="구름많고 소나기";
export const vrCldRain ="흐리고 비";
export const vrCldSnow ="흐리고 눈";
export const vrCldRainSnow ="흐리고 비/눈";
export const vrCldShower ="흐리고 소나기";

export type SkyCodeType = typeof sunny | 
                          typeof cloudy | 
                          typeof veryCloudy;

export type PtyCodeType = typeof sunny | 
                          typeof rainy |
                          typeof snowRain | 
                          typeof snow|
                          typeof shower;
export type SkyType = typeof sunny |
                      typeof cloudy| 
                      typeof veryCloudy |
                      typeof spellRain|
                      typeof rainy |
                      typeof snowRain |
                      typeof snow |
                      typeof shower |
                      typeof cldRain |
                      typeof cldSnow |
                      typeof cldRainSnow|
                      typeof cldShower|
                      typeof vrCldRain|
                      typeof vrCldSnow |
                      typeof vrCldRainSnow |
                      typeof vrCldShower ;
const north = "북향";  //vec = 360/0 (345-360 . 0-15)
const northAndEast ="북동향";  //vec : 15-74
const northAndWeast = "북서향" // vec : 296-344
const south ="남향"; //vec =180 (165-180 180-195)
const southAndEast ="남동향"; // vec  106-165
const southAndWeast ="남서향" // vec  196-254
const east ="동향"; //vec =90 (75-90, 90-105)
const weast ="서향"; //vec =270 (255-270  ,270-295)

export type DirectionType = typeof north|
                          typeof northAndEast |
                          typeof northAndWeast |
                          typeof south |
                          typeof southAndEast |
                          typeof southAndWeast |
                          typeof east |
                          typeof weast ;
export const directionArry: DirectionType[] =[north, northAndEast, northAndWeast,south, southAndEast,southAndWeast,east,weast];

type WindType ={
    //풍향
    vec:DirectionType |undefined,
    wsd:string
};


const common ="보통";
const good ="좋음";
const bad ="나쁨";
const veryBad ="매우 나쁨";

export type PmType = typeof good| 
              typeof common|
              typeof bad | 
              typeof veryBad;


export type NowWeather ={
  //온도
  tmp :number,
  sky:SkyType,
  //습도
  reh:string,
  wind:WindType
  //미세먼지
  pm10Grade:PmType,
  //초미세먼지
  pm25Grade:PmType,
};

export type HourWeather ={
  date:string,
  hour:string, //24시간제
  temp:number,
  //강수확률(%)
  pop:string,
  //강수량(mm)
  pcp:string,
  wind:WindType,
  //습도
  reh:string
};
export type DailyWeather ={
  date:string,
  hourly :HourWeather[]
};
type AmPmType ={
  pop:number,
  sky:SkyType|string
};

export type Day ={
  dayslater:number, //0-5 (today=0)
  am:AmPmType,
  pm:AmPmType,
  //최저 기온
  tmn:number,
  //최고 기온
  tmx:number
};

const 서울="서울";
const 춘천="춘천";
const 강릉 ="강릉";
const 청주 ="청주";
const 백령="백령";
const 수원 ="수원";
const 안동="안동";
const 울릉독도="울릉/독도";
const 대전="대전";
const 전주 ="전주";
const 대구 ="대구";
const 광주 ="광주";
const 울산 ="울산";
const 목표 ="목표";
const 여수 ="여수";
const 부산 ="부산";
const 제주 ="제주";

export type AreaName =typeof 서울|
                      typeof 춘천|
                      typeof 강릉|
                      typeof 청주|
                      typeof 백령|
                      typeof 수원|
                      typeof 안동|
                      typeof 울릉독도|
                      typeof 대전|
                      typeof 전주 |
                      typeof 대구 |
                      typeof 광주 |
                      typeof 울산 |
                      typeof 목표 |
                      typeof 여수 |
                      typeof 부산 |
                      typeof 제주 ;

export type AreaInform ={
  name:AreaName,
  sfGrid:SFGridItem,
  landRegId :MidLandAreaCode| undefined,
  taRegId:MidTaAreaCode | undefined,
};
export const areaArry: AreaInform[] =[
  {
    name:서울,
    sfGrid :  {
      areaCode: "1100000000",
      arePt1: "서울특별시",
      arePt2: null,
      arePt3: null,
      nX: "60",
      nY: "127",
      longitude: "126.98000833333333",
      latitude: "37.56356944444444"
    },
    landRegId:"11B00000",
    taRegId:"11B10101"
  },{
    name:춘천,
    sfGrid:{
      areaCode: "4211000000",
      arePt1: "강원도",
      arePt2: "춘천시",
      arePt3: null,
      nX: "73",
      nY: "134",
      longitude: "127.73231111111112",
      latitude: "37.87854166666667"
    },
    landRegId:"11D10000",
    taRegId:"11D10301"
  }
,{
  name:강릉,
  sfGrid:{
    areaCode: "4215000000",
    arePt1: "강원도",
    arePt2: "강릉시",
    arePt3: null,
    nX: "92",
    nY: "131",
    longitude: "128.87849722222222",
    latitude: "37.74913611111111"
  },
  landRegId:"11D20000",
  taRegId:"11D20501"
 },{
  name:청주,
  sfGrid:{
    areaCode: "4311100000",
    arePt1: "충청북도",
    arePt2: "청주시 상당구",
    arePt3: null,
    nX: "69",
    nY: "106",
    longitude: "127.51173055555556",
    latitude: "36.58399722222222"
   },
   landRegId:"11C20000",
   taRegId:"11C10301"
 },{
  name:백령,
  sfGrid:{
    areaCode: "2872033000",
  arePt1: "인천광역시",
  arePt2: "옹진군",
  arePt3: "백령면",
  nX: "21",
  nY: "135",
  longitude: "124.7186911",
  latitude: "37.9741764"
  },
  landRegId:"11B00000",
  taRegId:"11B20201"
 },{
  name:수원,
  sfGrid:{
    areaCode: "4111100000",
    arePt1: "경기도",
    arePt2: "수원시 장안구",
    arePt3: null,
    nX: "60",
    nY: "121",
    longitude: "127.01222222222222",
    latitude: "37.30101111111111"
   },
   landRegId:"11B00000",
   taRegId:"11B20601"
 }, {
  name:안동,
  sfGrid:{
    areaCode: "4717000000",
    arePt1: "경상북도",
    arePt2: "안동시",
    arePt3: null,
    nX: "91",
    nY: "106",
    longitude: "128.73162222222223",
    latitude: "36.565463888888885"
  },
  landRegId:"11F10000",
  taRegId:"11H10501"
 },{
  name:울릉독도,
  sfGrid:{
    areaCode: "4794000000",
  arePt1: "경상북도",
  arePt2: "울릉군",
  arePt3: null,
  nX: "127",
  nY: "127",
  longitude: "130.9037888888889",
  latitude: "37.480575"
  },
  landRegId:"11F10000" ,
  taRegId:"1.10E+102"
 },{
  name:대전,
  sfGrid:{
    areaCode: "3000000000",
    arePt1: "대전광역시",
    arePt2: null,
    arePt3: null,
    nX: "67",
    nY: "100",
    longitude: "127.38656666666667",
    latitude: "36.347119444444445"
  },
  landRegId:"11D20000",
  taRegId:"11C20401"
 },
 {
  name:전주,
  sfGrid:{
    areaCode: "4511100000",
    arePt1: "전라북도",
    arePt2: "전주시 완산구",
    arePt3: null,
    nX: "63",
    nY: "89",
    longitude: "127.12191944444444",
    latitude: "35.80918888888888"
  },
  landRegId:"11F10000",
  taRegId:"11F10201"
 },{
  name:대구,
  sfGrid:{
    areaCode: "2700000000",
    arePt1: "대구광역시",
    arePt2: null,
    arePt3: null,
    nX: "89",
    nY: "90",
    longitude: "128.60355277777776",
    latitude: "35.868541666666665"
  },
  landRegId:"11F10000",
  taRegId:"11H10701"
 },{
  name:광주,
  sfGrid:{
    areaCode: "2900000000",
    arePt1: "광주광역시",
    arePt2: null,
    arePt3: null,
    nX: "58",
    nY: "74",
    longitude: "126.85336388888888",
    latitude: "35.156974999999996"
  },
  landRegId:"11C10000",
  taRegId:"11F20501"
 },{
  name:울산,
  sfGrid:{
    areaCode: "3100000000",
    arePt1: "울산광역시",
    arePt2: null,
    arePt3: null,
    nX: "102",
    nY: "84",
    longitude: "129.3136888888889",
    latitude: "35.53540833333333" 
  },
  landRegId:"11H10000",
  taRegId:"11H20101"
 },{
  name:여수,
  sfGrid:{
    areaCode: "4613000000",
    arePt1: "전라남도",
    arePt2: "여수시",
    arePt3: null,
    nX: "73",
    nY: "66",
    longitude: "127.66438611111111",
    latitude: "34.757311111111115"
  },
  landRegId:"11C10000",
  taRegId:"11F20401"
 },{
  name:부산,
  sfGrid:{
    areaCode: "2600000000",
    arePt1: "부산광역시",
    arePt2: null,
    arePt3: null,
    nX: "98",
    nY: "76",
    longitude: "129.07695277777776",
    latitude: "35.17701944444444" 
  },
  landRegId:"11H10000",
  taRegId:"11H20201"
 },{
  name:제주,
  sfGrid:{
    areaCode: "5000000000",
    arePt1: "제주특별자치도",
    arePt2: null,
    arePt3: null,
    nX: "52",
    nY: "38",
    longitude: "126.50033333333333",
    latitude: "33.48569444444445"
  },
  landRegId:"11H20000",
  taRegId:"11G00201"
 }
];
export type Area ={
  areaInform: AreaInform,
  day:Day[]|null
};

export type SunRiseAndSet ={
  sunRise :string|null|undefined ,
  sunSet :string|null|undefined
};
const none ="none";
const pending ="pending";
const dataSuccess ="success";
const dataFailure ="failure";

export type DataState = typeof none|
                        typeof pending|
                        typeof dataSuccess|
                        typeof dataFailure;

export type WeatherState ={
  state:DataState,
  error:Error|null,
  nowWeather:NowWeather |null,
  threeDay:DailyWeather[]|null,
  weekly:Day[]|null,
  nation:Area[]|null,
  sunRiseAndSet :SunRiseAndSet |null
};

export type WeatherAction =
ReturnType<typeof reset> |
ReturnType<typeof request> |
ReturnType<typeof success> |
ReturnType<typeof failure>  ;

// state로 변경 시 필요한 함수 
export const getSkyCode =(code:number):SkyCodeType=>{
  switch (code) {
    case 1:
      return sunny
    case 3 :
      return cloudy;
    case 4:
      return veryCloudy;
  
    default: 
      return sunny
  }};

export const getPtyCode=(code:number)=>{
  if(code === 0){
    return sunny
  }
  if(code ===1 || code === 5){
    return rainy
  };
  if(code ===2 || code === 6){
    return snowRain
  };
  if(code ===3 || code === 7){
    return snow
  };
  if(code ===4){
    return shower
  }
};
export const getSkyType =(skyAvg:number,ptyAvg:number):SkyType=>{
  const skyCode =getSkyCode(skyAvg);

  const ptyCode =getPtyCode(ptyAvg);

  if(skyCode ===sunny){
    return sunny
  }else if(skyCode === cloudy){
    switch (ptyCode) {
      case sunny :
        return cloudy;
      case rainy:
        return cldRain ;
      case snowRain:
        return cldRainSnow ;
      case snow:
        return cldSnow;
      case shower:
        return cldShower ;
      default:
        return cloudy;
    }
  }else{
    switch (ptyCode) {
      case sunny :
        return veryCloudy;
      case rainy:
        return vrCldRain ;
      case snowRain:
        return vrCldRainSnow ;
      case snow:
        return vrCldSnow;
      case shower:
        return vrCldShower ;
      default:
        return veryCloudy
    }
  }
};
export const getWsd =(vec:number)=>{
  const nCondition =(vec >= 0 && vec <=15) || (vec >= 354 && vec <=360 );
  
  const nECondtion = ( vec >=15 && vec <= 74);

  const nWCondition =( vec >=296 && vec<= 344);

  const sCondition = (vec >=165 && vec <= 195);

  const sECondition =(vec >=106 && vec <= 165);

  const sWCondition =(vec >= 195 && vec <= 254);

  const eCondition = (vec >= 75 && vec <= 105);

  const wCondition =(vec >=255  && vec <= 295);

  const conditionArry =[nCondition, nECondtion, nWCondition, sCondition,sECondition,sWCondition,eCondition,wCondition];
  
  for (let i = 0; i < conditionArry.length; i++) {
    const element = conditionArry[i];
    if(element){
      const direction = directionArry[i];
      return direction
    }
  }

};

