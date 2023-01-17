import React from 'react';
import { Day } from '../modules/weather';
import ScrollBtn from './ScrollBtn';
type ItemPorperty ={
  day:Day
}
const Item =({day}:ItemPorperty)=>{
  return(
    <li className='week_item'>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </li>
  )
};
type WeekProperty ={
  week:Day[]
}
const Week =({week}:WeekProperty)=>{
  return (
    <div className="week" aria-details='주간 예보'>
      <h2>주간 예보</h2>
      <ul className='box'>

      </ul>
      <div className="scrollControl">
        <div className="scrollArea">

        </div>
        {/* <ScrollBtn

        />
        <ScrollBtn
        /> */}
      </div>
    </div>
  )
};

export default React.memo(Week)