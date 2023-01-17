import React from 'react';
import { AmPmType, Day } from '../modules/weather';
import ScrollBtn from './ScrollBtn';
import SkyIcon from './SkyIcon';
type AmPmProperty ={
  data:AmPmType,
  am:boolean
};
const AmPm =({data ,am}:AmPmProperty)=>{
  return(
    <div className={`weather_inner ${am ? "am":"pm"}`}>
      <strong className='inner_text left'>
        <span className='timeslot'>
          {am? "오전" : "오후"}
        </span>
        <span className={`rainfall ${data.pop === 0 ? "none" : ""}`}>
          {Math.round(data.pop)}%
        </span>
      </strong>
      <SkyIcon
        skyType={data.sky}
        day={true}
      /> 
    </div>
  )
};
type ItemPorperty ={
  item:Day
};
const Item =({item}:ItemPorperty)=>{
  const today = new Date();
  const month = today.getMonth() +1;
  const date:string = `${month}.${today.getDate()}`;
  const week =["일","월", "화","수","목","금","토","일"];
  const todayDay = today.getDay();
  const itemDay = todayDay + item.dayslater;
  const item_day = itemDay >6? week[itemDay - 6] : week[itemDay];
  const day :string = item.dayslater ===0 ? 
              "오늘" 
              :(
                item.dayslater===1?
                "내일"
                :
                item_day
              );
  return(
    <li className={`item day${item.dayslater}`}>
      <div className='day_data'>
        <div className='cell_date'>
          <div className="date_inner">
            <strong className='day'>
              {day}
            </strong>
            <div className='date'>
              {date}
            </div>
          </div>
        </div>
        <div className='cell_weather'>
          <AmPm
            data ={item.am}
            am={true}
          />
          <AmPm
            data ={item.pm}
            am={false}
          />
        </div>
        <div className='cell_temperature'>
          <strong>
            <span className='lowest'>
              {item.tmn}
            </span>
            <span className='bar'>
              /
            </span>
            <span className='highest'>
              {item.tmx}
            </span>
          </strong>
        </div>
      </div>
    </li>
  )
};
type WeekProperty ={
  week:Day[]
}
const Week =({week}:WeekProperty)=>{
  const twoDays = week.slice(0,2);
  return (
    <div className="week" aria-details='주간 예보'>
      <h2>주간 예보</h2>
      <ul className='box'>
        {twoDays.map((d:Day)=>
          <Item
            item = {d}
          />
        )}
      </ul>
      <div className="scrollControl">
        <div className="scrollArea">
          {week.map((d:Day)=>
          <Item
            item = {d}
          />
          )}
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