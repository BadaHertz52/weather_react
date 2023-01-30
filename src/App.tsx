import './assets/main.css';
import { AnyAction} from '@reduxjs/toolkit';
import React, { useEffect, useRef} from 'react';
import { useDispatch , useSelector   } from 'react-redux';
import {  ThunkDispatch  } from 'redux-thunk';
import Hourly from './component/Hourly';
import Loaction from './component/Loaction';
import Nation from './component/Nation';
import Now from './component/Now';
import Sun from './component/Sun';
import Week from './component/Week';
import { RootState } from './modules';
import { PositionAction, PositionState, PositionSuccessData } from './modules/position';
import { CurrentPosition} from './modules/position/thunk';
import {   SunRiseAndSet, WeatherAction, WeatherState } from './modules/weather';
import { weatherSlice } from './modules/weather/reducer';
import { getWeatherThunk, toolkitWeather } from './modules/weather/thunk';
import None from './component/None';
import { BsGithub } from 'react-icons/bs';
/**
 * hours 가 일몰,일출 시간을 기준을 낮 시간인지 밤 시간인지 확인하는 함수
 * @param hours 
 * @param todaySunInform 
 * @returns 낮 시간이라면 true를 밤시간이라면 false
 */
export   const checkDayOrNight =(hours:number, todaySunInform:Error | SunRiseAndSet):boolean=>{
  const sunInformError =todaySunInform instanceof Error ;
  const sunrise :number = (sunInformError|| todaySunInform.sunRise ==null) ? 
                            6 
                            : 
                            Number(todaySunInform.sunRise.slice(0,1));
  const sunset : number = (sunInformError|| todaySunInform.sunSet ==null) ? 
                          18 
                          : 
                          Number(todaySunInform.sunSet?.slice(0,2));
  const dayCondition = (hours > sunrise) && (hours < sunset) ;
  /**
   * 현재 시간이 낮인지 
   */
  const daytime :boolean = dayCondition ? true :false;
  return daytime
};

function App () {  
  const position =useSelector((state:RootState)=> state.positionReducer);

  const weather= useSelector((state:RootState) => state.weatherReducer);
  
  const weatherActions =weatherSlice.actions;

  const positionThunkDispatch = useDispatch<ThunkDispatch<PositionState, unknown, PositionAction>>();

  const weatherThunkDispatch =useDispatch<ThunkDispatch<WeatherState, unknown,WeatherAction>>();
  const dispatch =useDispatch();

  const toolkitDispatch =useDispatch<ThunkDispatch<PositionState|WeatherState, CurrentPosition|PositionSuccessData, AnyAction>>();
  
  const startThunk =useRef<boolean>(false);
  const startSaga =useRef<boolean>(false);
  const startToolkit =useRef<boolean>(false);
  /**
   * weather.sunRiseAndSet이 Error type 의 요소를 가지고 있으면 false, 그렇지 않으면(요소들이 모두 SunSetAndRise type)true를 반환하는 함수 
   * @returns boolean type
   */
  const checkSunInfoType =(sunRiseAndSet : null |(Error|SunRiseAndSet)[])=>{
    if(sunRiseAndSet !==null){
      // 요소들의 값은 weather.sunRiseAndSet의 각 요소들의 타입이 Error type 여부
      const arry = sunRiseAndSet.map((e:Error|SunRiseAndSet)=> e instanceof Error);
      if(arry.includes(true)){
        return false
      }else{
        return true
      }
    }else{
      return false
    }
  };
  useEffect(()=>{
    if(position.state === "success" &&
      weather.state !=="success"&&
    (
      position.longitude !==null &&
      position.latitude !==null &&
      position.sfGrid !==null
    ) ){
      const positionSuccessDate: PositionSuccessData ={
        longitude:position.longitude,
        latitude:position.latitude,
        sfGrid:position.sfGrid 
      }
      if(startThunk.current){
        weatherThunkDispatch(getWeatherThunk(positionSuccessDate))
        startThunk.current = false; 
      }else if(startSaga.current){
        dispatch(weatherActions.request(positionSuccessDate));
        startSaga.current =false;
      }else{
        startToolkit.current =false;
        toolkitDispatch(toolkitWeather(positionSuccessDate))
      }
    }
  },[position.state]);
  return (
    <div className="App">
      <div id='topbar' role="banner">
        <div className="inner">
          <div className="logo">
            날씨
          </div>
          <Loaction
            startSaga={startSaga}
            startThunk={startThunk}
            startToolkit={startToolkit}
            positionThunkDispatch={positionThunkDispatch}
            toolkitDispatch={toolkitDispatch}
          />
        </div>
      </div>
      <div id='container' role="main">
        <div id="content">
          {weather.state === "pending" &&
            "loading"
          }
          {weather.state === "success" &&
          <div className ="section_wrap">
            <div className="section_center">
              {(weather.nowWeather !==null && weather.tomrrowWeather !==null  &&
              weather.sunRiseAndSet !==null 
              ) ?
                <Now 
                  nowWeather={weather.nowWeather}
                  tomrrowWeather ={weather.tomrrowWeather}
                  todaySunInform ={weather.sunRiseAndSet[0]}
                />
                : 
                <None  target ={"실시간 날씨"} />
              }
              {(weather.threeDay !==null &&
                weather.sunRiseAndSet !==null 
              )?
                <Hourly
                  threeDay ={weather.threeDay}
                  todaySunInform ={weather.sunRiseAndSet[0]}
                />
                :
                <None  target ={"시간별 날씨 예보"} />
              }
              {weather.week !==null?
                <Week week ={weather.week} />
                :
                <None  target ={"주간 날씨예보"} />
              }
            </div>
            <div className="section_right">
            {(weather.nation !==null && weather.sunRiseAndSet !==null )?
                <Nation
                  nation ={weather.nation}
                  todaySunInform ={weather.sunRiseAndSet[0]}
                />
                :
                <None  target ={"전국 날씨 예보"} />
              }
            {((weather.sunRiseAndSet !==null) &&
              (checkSunInfoType(weather.sunRiseAndSet))
            )?
                <Sun
                  sunRiseAndSet={weather.sunRiseAndSet as SunRiseAndSet[]}
                />
                :
                <None  target ={"일출,일몰"} />
              }
            </div>
          </div>
          }
          {(weather.state ==="failure" || weather.state ==="none")&&
            <None target ={"현재 위치에 대한 날씨"} />
          } 

        </div>
      </div>
      <div id="footer" role="contentinfo">
        <span aria-details='the year of production'>
          <span className='blind'>
          the year of production
          </span>
          2023
        </span>
        <a
          href="https://github.com/BadaHertz52"
          rel="autor"
          title="autor github profile link"
        >
          <span className='blind'>
          autor's github profile link
          </span>
          ⓒbadahertz52
        </a>
        <a 
          href="https://github.com/BadaHertz52/weather_react"
          title='github 바로가기'
        >
          <span className='blind'>
            해당 페이지에 대한 github 페이지 바로가기
          </span>
          <BsGithub/>
        </a>
      </div>
    </div>
  );
}
    
export default App;
