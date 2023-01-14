import React from 'react';
const nonePosition ="현재 위치";
const noneWeather ="현재 위치에 대한 날씨";
const nowWeather ="실시간 날씨";
const sun ="일출,일몰";
const weekly ="주간 날씨예보";
const hourly ="시간별 날씨 예보";
const nation ="전국 날씨 예보";

type NoneTarget = typeof nonePosition|
                  typeof noneWeather|
                  typeof nowWeather| 
                  typeof sun| 
                  typeof weekly| 
                  typeof hourly |
                  typeof nation; 

type NoneProperty ={
  target:NoneTarget
}
const None =({target}:NoneProperty)=>{

  return(
    <div className='none'>
      <div className="inner">
        <span>
          {target}에 대한 정보를 찾을 수 없습니다.
        </span>
      </div>
    </div>
  )
};

export default React.memo(None);