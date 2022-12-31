import * as actions from './actions';
import {ActionType} from 'typesafe-actions';

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


type PresentType ={
  sky:SkyType,
  temp:number
};
const 서울 ="서울";
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

type AreaNameType = typeof 서울 |
                typeof 춘천|
                typeof 강릉 |
                typeof 청주 |
                typeof 백령|
                typeof 수원 |
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

export type Area ={
  areaName: AreaNameType,
  present :PresentType|null,
  am:AmPmType,
  pm:AmPmType
};

export type SunRiseAndSet ={
  sunRise :string|null|undefined ,
  sunSet :string|null|undefined
};
const none ="none";
const loading ="loading";
const success ="sucess";
const error ="error";

export type DataState = typeof none| typeof loading| typeof success|typeof error;

export type WeatherState ={
  state:DataState,
  nowWeather:NowWeather |null,
  threeDay:DailyWeather[]|null,
  weekly:Day[]|null,
  nation:Area[]|null,
  sunRiseAndSet :SunRiseAndSet |null
};

export type WeatherAction =ActionType<typeof actions>;

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

