import React from 'react';
import { getApAreaCode, getApInform, getAreaData, getMidFcast, getMidLandAreaCode, getMidTaAreaCode, getSunInform, getSVFcast, getUSNcast, getUSSkyCode } from './modules/api';
import { MidFcstDay, SVFBaseTime, SVFDay, SVFTime } from './modules/apiType';
import { MidLandAreaCode, MidTaAreaCode,   ApiAreaCode } from './modules/areaCodeType';
import { SFGridItem } from './modules/sfGrid';
import { Day, getSkyType, getWsd, WeatherState } from './modules/weatherTypeAndFn';
function App () {
  const changeBaseDate =(day:Date, year:number)=>{
    const month =day.getMonth()+1;
    const date = day.getDate();
    const baseDate = `${year}${month}${date}`;
    return baseDate
  };
  const getYesterDay =(date:number, year:number)=>{
    const yesterday = new Date( new Date().setDate(date -1));
    // new Date() 말고 today를 쓰면 today 가 이전 날로 변경되는 오류 발생
    return changeBaseDate(yesterday , year);
  };

  const changeHourToString =(h:number)=> {
    if(h<10){
      return  `0${JSON.stringify(h)}00`
    }else{
      return `${JSON.stringify(h)}00`
    }
  };

  const getData =async(sfGrid:SFGridItem , longitude:string, latitude:string)=>{
    const nX:string = typeof sfGrid.nX === "number"? 
    JSON.stringify(sfGrid.nX)
    : sfGrid.nX
    ;
    const nY: string = typeof sfGrid.nY === "number"? 
    JSON.stringify(sfGrid.nY)
    : sfGrid.nY
    ;
    const stationName: string[] =(sfGrid.arePt3 !==null && sfGrid.arePt2 !==null )?  [sfGrid.arePt1, sfGrid.arePt2, sfGrid.arePt3] : sfGrid.arePt2!==null? [sfGrid.arePt1, sfGrid.arePt2] :[sfGrid.arePt1];const landRegId: MidLandAreaCode |undefined =getMidLandAreaCode(sfGrid);

    const taRegId:MidTaAreaCode|undefined  = getMidTaAreaCode(sfGrid);
    const sidoName: ApiAreaCode = getApAreaCode(sfGrid);
    const today = new Date();
    const year = today.getFullYear();
    const hours =today.getHours();
    const minutes =today.getMinutes();
    const date =today.getDate();
    const preHours = hours -1 ;

    const baseDate_today =changeBaseDate(today ,year);
    const baseDate_yesterday =getYesterDay(date ,year);
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

    const fcstTime : string = changeHourToString(hours) ;
    const baseTime_skyCode :string = baseDate_skyCode === baseDate_today ?  
    (minutes > 30? fcstTime :changeHourToString(preHours))
    :"2300";

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
    const baseTimeIndex= timeArry.indexOf(fcstTime);
    const todayTimeArry = timeArry.slice(baseTimeIndex+1);
    //get api data
    const skyCode = await getUSSkyCode(nX, nY, baseDate_skyCode,baseTime_skyCode,fcstTime);
    const uSNcst = await getUSNcast(nX, nY, baseDate_today, fcstTime);
    const sVFcst =await getSVFcast(nX,nY,baseDate_svf,baseTime_svf ,timeArry);
    const midFcst =landRegId !==undefined && taRegId !==undefined? await getMidFcast(landRegId, taRegId,baseDate_today,baseDate_yesterday, hours ): undefined;
    const apGrade = await getApInform(sidoName,stationName);
    const sunInform =await getSunInform(longitude,latitude,baseDate_today);




    // state로 변경 
    if(midFcst !==undefined && sunInform !== null ){
      const svfDay :Day[] = sVFcst.map((d:SVFDay)=>{
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
  
      const midDay = midFcst?.map((d:MidFcstDay)=>{
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
      

      const weather :WeatherState ={
        nX:nX,
        nY:nY,
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
        hourly : sVFcst[0].filter((t:SVFTime)=> todayTimeArry.includes(t.fcstTime)).map((t:SVFTime)=>({
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
          })),
        weekly:[...svfDay, ...midDay],
        nation:null,
        sunRiseAndSet : {
          sunRise :sunInform.sunrise ,
          sunSet : sunInform.sunset
        }
      };

      console.log("weather", weather);
    };



  };

  const sucess =async(pos: GeolocationPosition)=>{
    const latitude =JSON.stringify(pos.coords.latitude) ;
    const longitude =JSON.stringify(pos.coords.longitude);

    const sfGridItem = await getAreaData(latitude,longitude);
    if (sfGridItem !== null){
      getData(sfGridItem, longitude,latitude);
    }
  };
  const getPosition =async()=>{
    navigator.geolocation.getCurrentPosition((pos)=>sucess(pos),(err)=>{
      console.warn("error",err);
    });
    
  };
  getPosition();
  return (
    <div className="App">
    </div>
  );
}
    
export default App;
