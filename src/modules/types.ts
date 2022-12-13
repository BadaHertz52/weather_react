const sunny ="맑음"; // sky code =1
const cloudy ="구름많음" // sky code =3
const veryCloudy ="흐림" // sky code =4
const onceRain ="흐리고 한때 비";
const rainy ="비"; // pty code =1 or 5
const snowRain ="비 또는 눈" //pty =2 or 6 
const snow ="눈" // pty code =3 or 7

export type skyType = typeof sunny | typeof cloudy | typeof veryCloudy | typeof onceRain | typeof rainy | typeof snow | typeof snowRain; 

export type ptyType = typeof sunny | typeof rainy |typeof snowRain;

const north = "북향";  //vec = 360/0 (345-360 . 0-15)
const northAndEast ="북동향";  //vec : 15-74
const northAndWeast = "북서향" // vec : 296-344
const south ="남향"; //vec =180 (165-180 180-195)
const southAndEast ="남동향"; // vec  106-165
const southAndWeast ="남서향" // vec  196-254
const east ="동향"; //vec =90 (75-90, 90-105)
const weast ="서향"; //vec =270 (255-270  ,270-295)

export type diectionType = typeof north|
                          typeof northAndEast |
                          typeof northAndWeast |
                          typeof south |
                          typeof southAndEast |
                          typeof southAndWeast |
                          typeof east |
                          typeof weast ;

type windType ={
    //풍향
    wsd:diectionType,
    vec:number
};

const danger ="위험";
const veryHigh ="매우 높음";
const high ="높음";
const common ="보통";
const low ="낮음";
const good ="좋음";
const bad ="나쁨";
const veryBad ="매우 나쁨";

type pmType = typeof good| 
              typeof common|
              typeof bad | 
              typeof veryBad;

type uvType = typeof danger | 
              typeof veryHigh |
              typeof high | 
              typeof common|
              typeof low ;

type freezeAndAirDiffusionType =  typeof veryHigh |typeof high | typeof common|typeof low ;


export type NowWeather ={
  //temperature
  tmp :number,
  sky:skyType,
  //습도
  reh:number,
  sensoryTmp :number,
  wind:windType
  //미세먼지
  pm10:pmType,
  //초미세먼지
  pm25:pmType,
};

export type HourWeather ={
  hour:number, //24시간제
  temp:number,
  //강수확률(%)
  pop:number,
  //강수량(mm)
  pcp:number,
  wind:windType,
  reh:number
};

type AmPmType ={
  pop:number,
  sky:skyType
};

export type Day ={
  sky:skyType,
  dayslater:number, //0-5 (today=0)
  am:AmPmType,
  pm:AmPmType,
  tmn:number,
  tmx:number
};

export type LifeIndex ={
  uv :uvType,
  freeze:freezeAndAirDiffusionType,
  airDiffusion:freezeAndAirDiffusionType
};
type PresentType ={
  sky:skyType,
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
  sunRise :number ,
  sunSet :number
};

export type WeatherState ={
  nx:number |null,
  ny:number |null,
  nowWeather:NowWeather |null,
  hourly:HourWeather[]|null,
  weekly:Day[]|null,
  nation:Area[]|null,
  sunRiseAndSet :SunRiseAndSet |null
};

//action 
export const GET_POSITION ="GET_POSITION";
export const GET_WHEATHER ="GET_WHEATHER";
export const CHANGE_DAY_NATION ="CHANGE_DAY_NATION";
export const getPosition =()=>({
  type:GET_POSITION,
});
export const getWeather =()=>({
  type:GET_WHEATHER,
});

export const changeDayNation=(dayLater:number)=>({
  type:CHANGE_DAY_NATION,
  dayLater:dayLater //0-5
});

export type WeatherAction = ReturnType<typeof getPosition> |
ReturnType<typeof getWeather>|
ReturnType<typeof changeDayNation>;


const y ="Y";
const n ="N"
export type Dnyn = typeof y| typeof n;