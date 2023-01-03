import React from 'react';
import { useDispatch  } from 'react-redux';
import { useSelector } from 'react-redux';
import {  ThunkDispatch } from 'redux-thunk';
import { RootState } from './modules';
import { CurrentPositon, getPositionAsync, getPositionSagaAction, PositionAction, PositionState } from './modules/position';
import { getPositionThunk } from './modules/position/thunk';
import {  getWeatherSagaAction, WeatherAction, WeatherState } from './modules/weather';
import { getWeatherThunk } from './modules/weather/thunk';

function App () {
  const {weather, position}= useSelector((state:RootState) => state);
  const {longitude, latitude, sfGrid}=position; 
  const positionDispatch =useDispatch<ThunkDispatch<PositionState,unknown,PositionAction>>();
  const weatherDispatch =useDispatch<ThunkDispatch<WeatherState, unknown,WeatherAction>>();
  const dispatch =useDispatch();

  function onClickThunk(){
    try {
      positionDispatch(getPositionThunk());
    } catch (error) {
      console.log(error)
    }finally {
        weatherDispatch(getWeatherThunk(position));
    };
  };  

  function onClickSaga (){
    navigator.geolocation.getCurrentPosition((pos:GeolocationPosition)=>{
      const latitude =JSON.stringify(pos.coords.latitude) ;
      const longitude =JSON.stringify(pos.coords.longitude);
      const currentPosition :CurrentPositon ={
        longitude:longitude,
        latitude:latitude
      };

      try{
        dispatch(getPositionSagaAction(currentPosition));
      }catch(error){
        const e =new Error (`can't find sfGrid`)
        dispatch(getPositionAsync.failure(e));
      }finally{

          dispatch(getWeatherSagaAction(position));
      }
    },(error)=>{
      const e =new Error (`can't find currentPostion`)
      dispatch(getPositionAsync.failure(e));
    });


  };
  return (
    <div className="App">
      <button 
        className='thunkBtn'
        onClick={onClickThunk}
      >
        thunk
      </button>
      <button
        className='sagaBtn'
        onClick ={onClickSaga}
      >
        saga
      </button>
      <div>position state : ${position.state}</div>
      <div>weather state : ${weather.state}</div>
      {weather.state==="success"&&
        <div>
          <div>today:{weather.threeDay!==null && weather.threeDay[0].date}</div>
          <div>sky:{weather.nowWeather?.sky}</div>
          <div>
            sunrise:{weather.sunRiseAndSet?.sunRise}
          </div>
          <div>
            sunset:{weather.sunRiseAndSet?.sunSet}
          </div>
          <div>tmn:{weather.weekly!==null && weather.weekly[0].tmn}</div>
          <div>tmx:{weather.weekly!==null && weather.weekly[0].tmx}</div>
        </div>
      }

    </div>
  );
}
    
export default App;
