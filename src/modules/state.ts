import { WeatherState } from "./weather/types";

const initialState :WeatherState ={
  longitude:null,
  latitude:null,
  sfGrid:{
    areaCode: "1130564500",
  arePt1: "서울특별시",
  arePt2: "강북구",
  arePt3: "우이동",
  nX: "60",
  nY: "128",
  longitude: "127.01406666666666",
  latitude: "37.64519444444444"
  },
  nowWeather:{"tmp":-0.5,"sky":"맑음",reh:"72",wind:{vec:"남서향",wsd:"0.6"},"pm10Grade":"보통","pm25Grade":"나쁨"},
  threeDay:[
    {date:"20221231",
    hourly:[
      {date:"20221231",hour:"1700",temp:4,pop:"0",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.3"},reh:"60"},
    {date:"20221231",hour:"1800",temp:2,pop:"0",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.2"},reh:"65"},{date:"20221231",hour:"1900",temp:2,pop:"0",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.3"},reh:"65"},{date:"20221231",hour:"2000",temp:1,pop:"20",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.3"},reh:"65"},{date:"20221231",hour:"2100",temp:1,pop:"20",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.2"},reh:"70"},{date:"20221231",hour:"2200",temp:1,pop:"20",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.2"},reh:"70"},{date:"20221231",hour:"2300",temp:1,pop:"0",pcp:"강수없음",wind:{vec:"남서향",wsd:"1.2"},reh:"70"}]},
    {date:"20230101",
    hourly:[
      {date:"20230101",hour:"0000",temp:1,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"1.1"},reh:"70"},{date:"20230101",hour:"0100",temp:1,pop:"20",pcp:"강수없음",wind:{vec:"서향",wsd:"1.2"},reh:"75"},{date:"20230101",hour:"0200",temp:1,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"1.2"},reh:"75"},{date:"20230101",hour:"0300",temp:1,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.5"},reh:"80"},{date:"20230101",hour:"0400",temp:0,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.8"},reh:"80"},{date:"20230101",hour:"0500",temp:-1,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.7"},reh:"80"},{date:"20230101",hour:"0600",temp:-1,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.7"},reh:"75"},{date:"20230101",hour:"0700",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.4"},reh:"75"},{date:"20230101",hour:"0800",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.3"},reh:"75"},{date:"20230101",hour:"0900",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2"},reh:"70"},{date:"20230101",hour:"1000",temp:0,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.1"},reh:"60"},{date:"20230101",hour:"1100",temp:1,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.3"},reh:"50"},{date:"20230101",hour:"1200",temp:2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.6"},reh:"45"},{date:"20230101",hour:"1300",temp:2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.8"},reh:"40"},{date:"20230101",hour:"1400",temp:3,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.9"},reh:"35"},{date:"20230101",hour:"1500",temp:2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.8"},reh:"35"},{date:"20230101",hour:"1600",temp:1,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.6"},reh:"35"},{date:"20230101",hour:"1700",temp:0,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"1.9"},reh:"40"},{date:"20230101",hour:"1800",temp:-1,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"2.1"},reh:"45"},{date:"20230101",hour:"1900",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.4"},reh:"50"},{date:"20230101",hour:"2000",temp:-3,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.4"},reh:"50"},{date:"20230101",hour:"2100",temp:-4,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.5"},reh:"50"},{date:"20230101",hour:"2200",temp:-5,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.5"},reh:"55"},{date:"20230101",hour:"2300",temp:-5,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.5"},reh:"50"}
    ]},
    {date:"20230102",
    hourly:[
      {date:"20230102",hour:"0000",temp:-5,pop:"20",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.5"},reh:"50"},{date:"20230102",hour:"0100",temp:-6,pop:"20",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.5"},reh:"50"},{date:"20230102",hour:"0200",temp:-6,pop:"20",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.3"},reh:"55"},{date:"20230102",hour:"0300",temp:-7,pop:"20",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.3"},reh:"55"},{date:"20230102",hour:"0400",temp:-7,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.2"},reh:"55"},{date:"20230102",hour:"0500",temp:-8,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.1"},reh:"55"},{date:"20230102",hour:"0600",temp:-8,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.1"},reh:"55"},{date:"20230102",hour:"0700",temp:-8,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2"},reh:"55"},{date:"20230102",hour:"0800",temp:-9,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.9"},reh:"55"},{date:"20230102",hour:"0900",temp:-8,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.5"},reh:"50"},{date:"20230102",hour:"1000",temp:-6,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.7"},reh:"40"},{date:"20230102",hour:"1100",temp:-5,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.8"},reh:"35"},{date:"20230102",hour:"1200",temp:-4,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.9"},reh:"30"},{date:"20230102",hour:"1300",temp:-3,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"3.1"},reh:"30"},{date:"20230102",hour:"1400",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"3.1"},reh:"30"},{date:"20230102",hour:"1500",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"3.1"},reh:"30"},{date:"20230102",hour:"1600",temp:-2,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2.8"},reh:"30"},{date:"20230102",hour:"1700",temp:-3,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"1.7"},reh:"35"},{date:"20230102",hour:"1800",temp:-4,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"1.7"},reh:"40"},{date:"20230102",hour:"1900",temp:-5,pop:"0",pcp:"강수없음",wind:{vec:"서향",wsd:"2"},reh:"45"},{date:"20230102",hour:"2000",temp:-5,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2"},reh:"45"},{date:"20230102",hour:"2100",temp:-6,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"2"},reh:"50"},{date:"20230102",hour:"2200",temp:-7,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.8"},reh:"50"},{date:"20230102",hour:"2300",temp:-7,pop:"0",pcp:"강수없음",wind:{vec:"북서향",wsd:"1.7"},reh:"55"}
    ]}],
  weekly:[
      {"dayslater":0,"am":{pop:26.363636363636363,"sky":"맑음"},"pm":{pop:16.666666666666668,"sky":"맑음"},"tmn":-3,"tmx":3},
      {"dayslater":1,"am":{pop:1.8181818181818181,"sky":"맑음"},"pm":{pop:0,"sky":"맑음"},"tmn":-3,"tmx":3},
      {"dayslater":2,"am":{pop:7.2727272727272725,"sky":"맑음"},"pm":{pop:0,"sky":"맑음"},"tmn":-3,"tmx":3},
      {"dayslater":3,"am":{pop:0,"sky":"맑음"},"pm":{pop:0,"sky":"맑음"},"tmn":-8,"tmx":1},
      {"dayslater":4,"am":{pop:0,"sky":"맑음"},"pm":{pop:0,"sky":"맑음"},"tmn":-7,"tmx":2},
      {"dayslater":5,"am":{pop:10,"sky":"맑음"},"pm":{pop:20,"sky":"맑음"},"tmn":-4,"tmx":4},{"dayslater":6,"am":{pop:40,"sky":"구름많음"},"pm":{pop:60,"sky":"구름많고 비/눈"},"tmn":-2,"tmx":5},{"dayslater":7,"am":{pop:20,"sky":"맑음"},"pm":{pop:10,"sky":"맑음"},"tmn":-1,"tmx":2}],
  nation:null,
  sunRiseAndSet:{"sunRise":"0747  ","sunSet":"1723  "}
};