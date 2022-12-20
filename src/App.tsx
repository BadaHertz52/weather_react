import React from 'react';
import { getApInform, getMidFcast, getSunInform, getSVFcast, getUSNcast, getUSSkyCode } from './modules/api';
import { SVFBaseTime } from './modules/apiType';
import { MidLandAreaCode, MidTaAreaCode,  midTaArea, midTaAreaCode, midLand_서울인천경기도 } from './modules/areCodeTyoe';

function App() {
  const getData =async()=>{
    const nx ="61";
    const ny ="128";
    const today = new Date();
    console.log("today", today);
    const year = today.getFullYear();
    const hours =today.getHours();
    const minutes =today.getMinutes();
    const date =today.getDate();
    const preHours = hours -1 ;
   
    const changeBaseDate =(day:Date)=>{
      const month =day.getMonth()+1;
      const date = day.getDate();
      const baseDate = `${year}${month}${date}`;
      return baseDate
    };
    const getYesterDay =()=>{
      const yesterDay = new Date( new Date().setDate(date -1));
      // new Date() 말고 today를 쓰면 today 가 이전 날로 변경되는 오류 발생
      return changeBaseDate(yesterDay);
    };
    const baseDate_today =changeBaseDate(today);
    const baseDate_yesterDay =getYesterDay();
    const baseDate_skyCode = minutes < 30 && hours === 0 ? 
                            baseDate_yesterDay
                            :
                            baseDate_today ;
    const baseDate_svf = hours < 2 ? baseDate_yesterDay :baseDate_today;
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
    const changeHourToString =(h:number)=> {
      if(h<10){
        return  `0${JSON.stringify(h)}00`
      }else{
        return `${JSON.stringify(h)}00`
      }
    };
    const fcstTime : string = changeHourToString(hours) ;
    const baseTime_skyCode :string = baseDate_skyCode === baseDate_today ?  
    (minutes > 30? fcstTime :changeHourToString(preHours))
    :"2300";
    const landRegId:MidLandAreaCode = midLand_서울인천경기도 ;
    const taIndex =midTaArea.indexOf("서울")
    const taRegId  = midTaAreaCode[taIndex] as MidTaAreaCode;
    //🤗const skyCode = await getUSSkyCode(nx, ny, baseDate_skyCode,baseTime_skyCode,fcstTime);
    //🤗const uSNcst = await getUSNcast(nx, ny, baseDate_today, fcstTime);
    const sVFcst =await getSVFcast(nx,ny,baseDate_svf,baseTime_svf);
    // const midFcst =await getMidFcast(landRegId, taRegId,"202212200600");
    // const apGrade = await getApInform("서울",["서울특별시", "강북구","수유2동"]);
    // const sunInform =await getSunInform("12700","3700","20221220","Y")

    console.log("svfcst",sVFcst)
    // console.log("midFcst",midFcst)
    // console.log("apgrade",apGrade)
    // console.log("sun", sunInform);
  };
  getData();
  return (
    <div className="App">
    </div>
  );
}
    
export default App;
