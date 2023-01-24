import React ,{Dispatch, SetStateAction, useState} from 'react';
import { Area , Day} from '../modules/weather';
import {weekArry} from './Week';
import mapImg from '../assets/map.jpg';

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
  nation:Area[]
};
const Nation =({nation}:NationProperty)=>{
  const today = new Date();
  const todya_date = today.getDate();
  const [targetDaylater, setTargetDaylater] =useState<number>(0);
  const now ="now";
  const am ="am";
  const pm ="pm" ;
  type TargetTime = typeof now |typeof am |typeof pm;
  const [targetTime, setTargetTime]=useState<TargetTime>(now);
  const weeklyList = nation[0].day?.map((d:Day)=>d.dayslater) as number[];
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
        <img
          className='map_img'
          src ={mapImg}
          alt="mapImg"
        />
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
      </div>
    </div>
  )
};

export default React.memo(Nation)