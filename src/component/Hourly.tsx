import React from 'react';
import { checkDayOrNight } from '../App';
import { DailyWeather, HourWeather, SunRiseAndSet } from '../modules/weather';
import SkyIcon from './SkyIcon';
type CnItemDayProperty ={
  todaySunInform: Error | SunRiseAndSet,
  dailyWeather:DailyWeather,
  index:number
}
const CnItemDay =({todaySunInform ,dailyWeather, index}:CnItemDayProperty)=>{
  const threeDay =["오늘", "내일","모레"];
  const day = threeDay[index];
  const date = dailyWeather.date;
  return(
    <>
      <th className="data heading">
        <span className='time'>
          {day}
        </span>
      </th>
      {dailyWeather.hourly.map((h:HourWeather)=>{
        const hour =h.hour[0] ==="0" ? h.hour.slice(1,2):  h.hour.slice(0,2)
        return(
          <th 
            id={`hourly-${date}${h.hour.slice(0,2)}`}
            className ="data top cnItemTime"
            data-tmpr ={h.temp}
            data-sky ={h.sky}
            data-ymdt={`${date}${h.hour.slice(0,2)}`}
          >
            <span className='time'>
              {hour}
            </span>
            <SkyIcon
              skyType={h.sky}
              day={checkDayOrNight( Number(hour) ,todaySunInform)}
            />
          </th>
        )
      })}
    </>
  )
};
type HourlyProperty ={
  todaySunInform: Error | SunRiseAndSet,
  threeDay: DailyWeather[]
}
const Hourly =({todaySunInform ,threeDay }:HourlyProperty)=>{
  return (
    <div className="hourly">
      <div className="weather_graph">
        <div className="scrollControl">
          <div className="scrollArea">
            <div className="weather_table_wrap">
              <table>
                <caption>
                  <span className='blind'>
                    시간별 날씨 정보를 제공하는 표
                  </span>
                </caption>
                <thead>
                  <tr className='thead_cnTimeTable'>
                    {threeDay.map((d:DailyWeather)=><CnItemDay
                        todaySunInform={todaySunInform}
                        dailyWeather ={d}
                        index ={threeDay.indexOf(d)}
                      />
                    )
                    }
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
          {/* <ScrollBtn>
            
          </ScrollBtn>
          <ScrollBtn>

          </ScrollBtn> */}
        </div>
      </div>
    </div>
  )
};

export default React.memo(Hourly);