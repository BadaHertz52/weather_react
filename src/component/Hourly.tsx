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
        <span className={`time threeDay_${index}`}>
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
            <span className={`time threeDay_${index}`}>
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
                            none={false}
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
                            none={false}
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
                  </tr>
                  {/*reh*/}
                  <tr aria-details='reh'>
                    <Th
                      title="습도"
                      unit="%"
                    />
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