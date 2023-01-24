import React ,{Dispatch, SetStateAction, useState} from 'react';
import { Area , AreaInform, AreaNow, Day, SkyType, SunRiseAndSet} from '../modules/weather';
import {weekArry} from './Week';
import mapImg from '../assets/map.jpg';
import SkyIcon from './SkyIcon';
import { checkDayOrNight } from '../App';
const now ="now";
const am ="am";
const pm ="pm" ;
type TargetTime = typeof now |typeof am |typeof pm;

type ZoneProperty ={
  /**
   * 현재 시간이 낮인지
   */
  daytime:boolean,
  area:Area,
  targetTime:TargetTime,
  targetDaylater:number
};
const Zone =({daytime,area, targetTime, targetDaylater}:ZoneProperty)=>{
  const nowData = area.now as AreaNow;
  const dayData =area.day as Day[];
  const targetDayData = dayData[targetDaylater]
  const amData =targetDayData.am ;
  const pmData =targetDayData.pm ;
  type ZonWeatherData ={
    sky:SkyType,
    temp:number,
  }
  const zoneWeatherData =(():ZonWeatherData=>{
    switch (targetTime) {
      case now:
        return {
          sky:nowData.sky,
          temp: nowData.temp,
        }
      case am:
        return { sky:amData.sky, 
                temp: targetDayData.tmn
                }
      case pm:
        return { sky:pmData.sky, 
                temp: targetDayData.tmx
              }
      default:
        return {
          sky:nowData.sky,
          temp: nowData.temp,
        };
    }
  })();

  return(
    <div 
    className="zone"
    >
      <SkyIcon
        skyType={zoneWeatherData.sky}
        daytime={daytime}
      />
      <div className="text">
        <span className='areaName'>
          {area.areaInform.name}
        </span>
        <span className='temp'>
          {zoneWeatherData.temp}
        </span>
      </div>
  </div>
  )
};
type NWItemProperty ={
  daylater:number,
  today_date:number,
  targetDaylater:number,
  setTargetDaylater:Dispatch<SetStateAction<number>>
};
const NWItem =({daylater, today_date, targetDaylater, setTargetDaylater}:NWItemProperty)=>{
  const itemDate = new Date( new Date().setDate(today_date + daylater)) ;
  const month = itemDate.getMonth() +1;
  const date =itemDate.getDate();
  const day = itemDate.getDay();
  const item_day = day >6? weekArry[day - 6] : weekArry[day];

  return(
    <li className={`item ${targetDaylater === daylater? 'on' : ''}`}>
      <button 
        type='button'
        className='button'
        onClick={()=>setTargetDaylater(daylater)}
      >
        <span className='day'>
          {item_day}
        </span>
        <span className='date'>
          {daylater===0 ? "오늘": `${month}.${date}`}
        </span>
      </button>
    </li>
  )
};
type NationProperty ={
  nation:Area[],
  todaySunInform: Error | SunRiseAndSet
};
const Nation =({nation, todaySunInform}:NationProperty)=>{
  const today = new Date();
  const hours = today.getHours();
  const todya_date = today.getDate();
  const [targetDaylater, setTargetDaylater] =useState<number>(0);
  const [targetTime, setTargetTime]=useState<TargetTime>(now);
  const weeklyList = nation[0].day?.map((d:Day)=>d.dayslater) as number[];
  const daytime =checkDayOrNight(hours, todaySunInform)
  return (
    <div className="nation">
      <h2 className='title'>
        전국날씨
      </h2>
      <ul className='weekly_list'>
        {weeklyList.map((i:number)=>
        <NWItem
          daylater={i}
          today_date={todya_date}
          targetDaylater={targetDaylater}
          setTargetDaylater={setTargetDaylater}
        />)}
      </ul>
      <div className="map_wrap">
        <div className="time_area">
          {targetDaylater===0&&
            <button
              onClick={()=>{setTargetTime(now)}}
              name='timeBtn_now'
              className={targetTime === now?'on':''}
            >
              현재
            </button>
          }
          <button
            onClick={()=>{setTargetTime(am)}}
            name='timeBtn_am'
            className={targetTime === am ? 'on':''}
          >
            오전
          </button>
          <button
            onClick={()=>{setTargetTime(pm)}}
            name='timeBtn_pm'
            className={targetTime === pm ? 'on':''}
          >
            오후
          </button>

        </div>
        <div className="map">
          <img
            className='map_img'
            src ={mapImg}
            alt="mapImg"
          />
          {nation.map((area:Area)=>
            area.day !==null ?
            <Zone
              daytime={daytime}
              area={area}
              targetTime={targetTime}
              targetDaylater={targetDaylater}
            />
            :
            "no data"
          )}
        </div>
      </div>
    </div>
  )
};

export default React.memo(Nation)