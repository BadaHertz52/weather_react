import React, { useEffect, useState } from 'react';
import { SunRiseAndSet } from '../modules/weather';
import {HiArrowSmDown, HiArrowSmUp} from 'react-icons/hi';
import { changeTwoDigit } from '../modules/api';
import { CSSProperties } from 'styled-components';
type SunIconAreaProperty ={
  sunrise:boolean
}
const SunIconArea =({sunrise}:SunIconAreaProperty)=>{
  return(
    <span className="icon_area" aria-details={sunrise ? "sunrise time" :"sunset time"}>
      <span className="sunIcon_arrow">
        {sunrise ?
          <HiArrowSmUp className='up'/>
        :
        <HiArrowSmDown className='down'/>}
      </span>
      <span className='sunIcon'>
      </span>
    </span>
  )
};
type SunTrProperty ={
  index:number,
  daySunInfo : SunRiseAndSet
};
const SunTr =({index,daySunInfo}:SunTrProperty)=>{
  const thArry =["오늘", "내일", "모레"];
  const date = `${daySunInfo.date.slice(0,2)}.${daySunInfo.date.slice(2)}`;
  return(
    <tr className='sun_tr'>
      <th 
        scope='row'
        className='sun_th'
      >
        <span>
          {thArry[index]}
        </span>
        <span className='sun_day'>
          {date}
        </span>
      </th>
      <td>
        <span>일출</span>
        <strong className='sun_time'>
          {daySunInfo.sunRise}
        </strong>
      </td>
      <td>
        <span>일몰</span>
        <strong className='sun_time'>
          {daySunInfo.sunSet}
        </strong>
      </td>
    </tr>
  )
};

type SunProperty ={
  sunRiseAndSet:  SunRiseAndSet[]
};
const Sun =({sunRiseAndSet}:SunProperty)=>{
  const now = new Date();
  const hours =  Number(now.getHours());
  const min =  changeTwoDigit(Number(now.getMinutes()));
  const time = Number(`${hours}${min}`);
  const today ="today";
  const tomorrow ="tomorrow";
  const [targetDay, setTargetDay]= useState<typeof today| typeof tomorrow>(today);
  const todaySunInfo =sunRiseAndSet[0]; 
  const [moveSunStyle, setMoveSunStyle]= useState<CSSProperties|undefined>(undefined);
  const [barStyle, setBarStyle]= useState<CSSProperties>({
    transform:'rotate(45deg)' 
  });
  /**
   * .moveSun를 회전 시킬 때 기준이 되는 각도 (n번 회전시, n * 기준 각도 만큼 회전함)
   */
  const ms_ra = 180 /16;
  /**
   * .bar를 회전 시킬 때 기준이 되는 각도 (n번 회전시, n * 기준 각도 만큼 회전함)
   */ 
  const bar_ra = (270 - 45) /16;

  const changeRotate =(part:number)=>{
    setMoveSunStyle({
      transform:part === 16? 'rotate(181deg)':`rotate(${ms_ra * part}deg)`
    });
    setBarStyle({
      transform: part !==0 ? 
                `rotate(${bar_ra * part}deg)`
                :
                'rotate(45deg)'
    })
    

  }
  useEffect(()=>{
    if(todaySunInfo.sunRise !==null && 
      todaySunInfo.sunRise!==undefined &&
      todaySunInfo.sunSet !==null && 
      todaySunInfo.sunSet!==undefined 
      ){
        
        const sunrise = Number(`${todaySunInfo.sunRise.slice(1,2)}${todaySunInfo.sunRise.slice(3)}`);
        const sunset = Number(`${todaySunInfo.sunSet.slice(0,2)}${todaySunInfo.sunSet.slice(3)}`);
        const term = (sunset - sunrise)/16;
        if(time >= sunset){
          changeRotate(16);
        }else if(time <= sunrise){
          changeRotate(0)
        }else{
          const gap = time - sunrise;
          const quotient = Math.floor(gap / term);
          changeRotate(quotient)

        }
    };
  },[todaySunInfo]);
  
  return (
    <div className="sun">
      <div className="inner">
        <h2 className="title">
          일출일몰
        </h2>
        <div className="btn_wrap">
          <button
            className={`btn_sun ${targetDay === today? 'on':''}`}
            onClick={()=>setTargetDay(today)}
          >
            오늘
          </button>
          <button
            className={`btn_sun ${targetDay === tomorrow? 'on':''}`}
            onClick={()=>setTargetDay(tomorrow)}
          >
            내일
          </button>
        </div>
        {targetDay === today?
          <div className="sun_panel">
            <div className="sun_chart">
              <div 
                className="move_sun"
                style={moveSunStyle}
              >
              </div>
              <div className="progress_bar">
                <div className="current_bar">
                  <span 
                    className='bar'
                    style={barStyle}
                  >
                  </span>
                </div>
              </div>
              <div className="sun_info">
                    <SunIconArea
                      sunrise={false}
                    />
                <dl className='time_list'>
                  <dt className='time_title'>
                    일출
                  </dt>
                  <dd className='time_sun'>
                    {sunRiseAndSet[0].sunRise}
                  </dd>
                  <dt className='time_title set'>
                    일몰
                  </dt>
                  <dd className='time_sun'>
                    {sunRiseAndSet[0].sunSet}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        :
        <div className="sun_panel">
          <table className='sun_table'>
            <caption className='blind'>
                <span>
                    오늘부터 모레까지 일출 일몰 시간 정보
                </span>
            </caption>
            <thead>
              <tr>
                <th scope='col' className='blind'>
                  날짜
                </th>
                {["일출 시간", "일몰 시간"].map((t:string)=>
                  <th scope='col'>
                    <SunIconArea
                      sunrise={t ==="일출 시간"}
                    />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {sunRiseAndSet.map((i:SunRiseAndSet)=>
              <SunTr
                index ={sunRiseAndSet.indexOf(i)}
                daySunInfo={i}
              />)}
            </tbody>
          </table>
        </div>
        }
      </div>
    </div>
  )
};

export default React.memo(Sun)