import React, { useState } from 'react';
import { SunRiseAndSet } from '../modules/weather';
import {HiArrowSmDown, HiArrowSmUp} from 'react-icons/hi';
type SunIconAreaProperty ={
  sunrise:boolean
}
const SunIconArea =({sunrise}:SunIconAreaProperty)=>{
  return(
    <span className="icon_area">
      <span className="sunIcon_arrow">
        {sunrise ?
          <HiArrowSmUp className='up'/>
        :
        <HiArrowSmDown className='down'/>}
      </span>
      <span className='sunIcon_inner'>
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
          {daySunInfo.date}
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
  const today ="today";
  const tomorrow ="tomorrow";
  const [targetDay, setTargetDay]= useState<typeof today| typeof tomorrow>(today);
  return (
    <div className="sun">
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
            <div className="move_sun">

            </div>
            <div className="progress_bar">
              <div className="current_bar">
                <span className='bar'>

                </span>
              </div>
            </div>
            <div className="sun_info">
                  <SunIconArea
                    sunrise={true}
                  />
              <dl>
                <dt className='time_title'>
                  일출
                </dt>
                <dd className='time_sun'>
                  {sunRiseAndSet[0].sunRise}
                </dd>
                <dt className='time_title'>
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
            <th scope='col' className='blind'>
              날짜
            </th>
            {["일출 시간", "일몰 시간"].map((t:string)=>
              <th scope='col'>
                <SunIconArea
                  sunrise={t ==="일출 시간"}
                />
                <span>
                  {t} 
                </span>
              </th>
            )}
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
  )
};

export default React.memo(Sun)