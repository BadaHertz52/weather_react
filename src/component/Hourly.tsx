import React, { useEffect } from 'react';
import { checkDayOrNight } from '../App';
import { DailyWeather, directionArry, HourWeather, SunRiseAndSet, WindType } from '../modules/weather';
import SkyIcon from './SkyIcon';
import {TiLocationArrow} from 'react-icons/ti';
import { CSSProperties } from 'styled-components';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
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
type TempValueProperty ={
  temp:number,
  minY:number,
  maxY:number
};
const TempValue =({temp,minY,maxY}:TempValueProperty)=>{
    const gap = minY < 0 ? -(minY) : minY ;
    const newMax = maxY + gap;
    const percent = (100 * (temp + gap)) / newMax ;
    const style :CSSProperties ={
      position:'absolute',
      bottom: `${percent + 4}%`,
      left:'calc(50% - 12px)'
    };
  return (
    <div 
      className="temp"
    >
      {temp !==null &&
        <em style={style}>{temp}°</em>
      }
    </div>
  )
};
type HourlyProperty ={
  todaySunInform: Error | SunRiseAndSet,
  threeDay: DailyWeather[]
};

const Hourly =({todaySunInform ,threeDay }:HourlyProperty)=>{
  const hoursArry = threeDay.map((d:DailyWeather)=>d.hourly.map((h:HourWeather)=> h.hour));
  const tempArry = threeDay.map((d:DailyWeather)=> d.hourly.map((h:HourWeather)=>h.temp));
  const todayTempArry =tempArry[0];
  const tomorrowTempArry =tempArry[1];
  const dayAfterTempArry =tempArry[2];
  const temps = [
  ...todayTempArry ,...tomorrowTempArry, ...dayAfterTempArry];
  const chartData =getChartData(temps);
  const chartStyle :CSSProperties ={
    width:'inherit',
    height:'inherit',
    position:'absolute' ,
    left: 'calc(55px * 0.5)'
  };
  const maxY  = Math.max(...temps) + 8 ;
  const minY = Math.min(...temps) - 8 ;
  function getChartData (tempArry:number[]):ChartData{
    // 오늘에서부터 나오는 그래프 선을 위해 
    const arry =[ todayTempArry[0],...tempArry];
    const chartData : ChartData=  {
      labels:arry,
      datasets:[{
        data: arry,
        borderColor:'#2fc5f3',
        borderWidth:1.2,
        spanGaps:true,
      }]
    };
    return chartData
  };
  const chartOption:ChartOptions = {
    responsive:false,
    elements:{
      point:{
        radius:0
      },
    },
    plugins:{
      legend:{
        display:false,
      }
    },
    scales:{
      x:{
        grid:{
          display:false,
        },
        axis:'x',
        display:false,
        title: {
          display: false
        },
      },
      y:{
        grid:{
          display:false
        },
        axis:'y',
        display:false ,
        title: {
          display: false
        },
        max: maxY,
        min:minY
      }
    }
  };
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
                        key={`cnItemDay_${threeDay.indexOf(d)}`}
                        todaySunInform={todaySunInform}
                        dailyWeather ={d}
                        index ={threeDay.indexOf(d)}
                      />
                    )
                    }
                  </tr>
                </thead>
                <tbody>
                  {/*temp chart  */}
                  <tr>
                    <td 
                    id="tempChart"
                    className="chart">
                      <div className="chart chart_area">
                        <Chart
                            className="chart_line"
                            type='line'
                            data={chartData}
                            options={chartOption}
                            style={chartStyle}
                          />
                          <div className="chart_text">
                            {temps.map((t:number)=>
                            <TempValue
                              minY={minY}
                              maxY={maxY}
                              temp={t}
                            />
                              )}
                          </div>
                      </div>
                    </td>
                  </tr>
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
                          key={`pop_td_${h.date}${h.hour}`}
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
                            key={`pcp_td_${h.date}${h.hour}`}
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
                          key={`sno_td_${h.date}${h.hour}`}
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
                          key={`reh_td_${h.date}${h.hour}`}
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