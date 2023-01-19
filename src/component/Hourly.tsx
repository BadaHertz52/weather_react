import React from 'react';
import { checkDayOrNight } from '../App';
import { DailyWeather, directionArry, HourWeather, SunRiseAndSet, WindType } from '../modules/weather';
import SkyIcon from './SkyIcon';
import {TiLocationArrow} from 'react-icons/ti';
import { CSSProperties } from 'styled-components';

type CnItemDayProperty ={
  todaySunInform: Error | SunRiseAndSet,
  dailyWeather:DailyWeather,
  index:number
}
const CnItemDay =({todaySunInform ,dailyWeather, index}:CnItemDayProperty)=>{
  const threeDay =["오늘", "내일","모레"];
  const threeDayE =["today", "tomorrow", "dayAfter"];
  const day = threeDay[index];
  const dayE = threeDayE[index];
  const date = dailyWeather.date;
  return(
    <>
      { index === 0 &&
      <th className="data heading">
        <span className={`label ${dayE}`}>
            {day}
        </span>
      </th>
      }
      {dailyWeather.hourly.map((h:HourWeather)=>{
        const hour =h.hour[0] ==="0" ? h.hour.slice(1,2):  h.hour.slice(0,2)
        return(
          <th 
            id={`hourly-${date}${h.hour.slice(0,2)}`}
            className ={`data top cnItemTime ${hour ==="0"?  dayE:""}`}
            data-tmpr ={h.temp}
            data-sky ={h.sky}
            data-ymdt={`${date}${h.hour.slice(0,2)}`}
          >
            {hour === "0" ?
                <span className={`label ${dayE}`}>
                  {day}
                </span>
              :
              <span className={`time ${dayE}`}>
                {hour}
            </span>
            }

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
type ThProperty ={
  title:string,
  unit:string
}
const Th =({title,unit}:ThProperty)=>{
  return(
    <th scope="row" className='data heading'>
      <div className='tit'>
        <em>{title}</em>
        <div className='unit'>
          ({unit})
        </div>
      </div>
    </th>
  )
};

type Td1Property ={
  date: string,
  hours:string,
  figure:string,
  /**
   * pcp, sno의 경우 비/눈이 오는지 여부
   */
  none:boolean
};
/**
 * pop, pcp,sno, reh
 */
const Td1=({date, hours,figure, none}:Td1Property)=>{
  const ymdt =`${date}${hours.slice(0,2)}`
  return(
    <td className='data' data-ymdt={ymdt}>
      <span className={`unit_value ${none ?"":"color"}`} >
        <em>{figure ==="강수없음" ?  "0" : figure }</em>
      </span>
    </td>
  )
};
type TdWindyProperty ={
  date: string,
  hours:string,
  wind: WindType
};
const TdWindy=({date, hours, wind}:TdWindyProperty)=>{
  const ymdt =`${date}${hours.slice(0,2)}`;
  const index = wind.vec ==="북풍"? 0 :  directionArry.indexOf(wind.vec);
  const angle :number = (360 / 16)* index;
  const deg = -15 + angle ;
  const arrowStyle:CSSProperties ={
    transform:`rotate(${deg}deg)`
  };
  return(
    <td className='data' data-ymdt={ymdt}>
      <span className='icon_wind' aria-details={wind.vec}>
        <TiLocationArrow style ={arrowStyle}/>
      </span>
      <span className="unit_value color" >
        <em>{wind.wsd}</em>
      </span>
    </td>
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
                  {/*temp graphe */}
                  {/*pop*/}
                  <tr 
                  aria-details='pop'>
                    <>
                      <Th
                        title="강수확률"
                        unit="%"
                      />

                      {threeDay.map((d:DailyWeather)=>
                        d.hourly.map((h:HourWeather)=>
                          <Td1
                            date ={h.date}
                            hours={h.hour}
                            figure={h.pop}
                            none={false}
                          />
                        ))
                      }
                    </>
                  </tr>
                  {/*pcp*/}
                  <tr aria-details='pcp'>
                    <Th
                      title="강수"
                      unit="mm"
                    />
                    {threeDay.map((d:DailyWeather)=>
                        d.hourly.map((h:HourWeather)=>
                          <Td1
                            date ={h.date}
                            hours={h.hour}
                            figure={h.pcp}
                            none={Number(h.pcp) <= 0}
                          />
                        ))
                      }
                  </tr>
                  {/*sno*/}
                  <tr aria-details='sno'>
                    <Th
                      title="적설"
                      unit="cm"
                    />
                    {threeDay.map((d:DailyWeather)=>
                        d.hourly.map((h:HourWeather)=>
                          <Td1
                            date ={h.date}
                            hours={h.hour}
                            figure={h.sno}
                            none={Number(h.sno) <= 0}
                          />
                        ))
                      }
                  </tr>
                  {/*windy*/}
                  <tr aria-details='windy'> 
                    <Th
                      title="바람"
                      unit="m/s"
                    />
                    {threeDay.map((d:DailyWeather)=>
                        d.hourly.map((h:HourWeather)=>
                          <TdWindy
                            date ={h.date}
                            hours={h.hour}
                            wind={h.wind}
                          />
                        ))
                    }
                  </tr>
                  {/*reh*/}
                  <tr aria-details='reh'>
                    <Th
                      title="습도"
                      unit="%"
                    />
                  {threeDay.map((d:DailyWeather)=>
                      d.hourly.map((h:HourWeather)=>
                        <Td1
                          date ={h.date}
                          hours={h.hour}
                          figure={h.reh}
                          none={Number(h.reh) <= 0}
                        />
                      ))
                  }
                  </tr>
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