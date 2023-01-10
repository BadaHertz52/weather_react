import React, { useEffect, useRef } from 'react';
import { useDispatch  } from 'react-redux';
import { useSelector } from 'react-redux';
import {  ThunkDispatch } from 'redux-thunk';
import { RootState } from './modules';
import { PositionAction, PositionState } from './modules/position';
import { positionSlice } from './modules/position/reducer';
import { getPositionThunk } from './modules/position/thunk';
import {   WeatherAction, WeatherState } from './modules/weather';
import { weatherSlice } from './modules/weather/reducer';
import { getWeatherThunk } from './modules/weather/thunk';

function App () {  
  const position =useSelector((state:RootState)=> state.positionReducer);
  const {longitude, latitude, sfGrid}=position; 
  const weather= useSelector((state:RootState) => state.weatherReducer);
  const positionActions = positionSlice.actions;
  const weatherActions =weatherSlice.actions;
  const positionThunkDispatch =useDispatch<ThunkDispatch<PositionState,unknown,PositionAction>>();
  const weatherThunkDispatch =useDispatch<ThunkDispatch<WeatherState, unknown,WeatherAction>>();
  const dispatch =useDispatch();
  const startThunk =useRef<boolean>(false);
  const startSaga =useRef<boolean>(false);
  const thunk ="thunk" ;
  const saga ="saga";
  type Middleware = typeof thunk | typeof saga; 

  function dispatchAction (middleware:Middleware){
    position.state !=="none" &&
    dispatch(positionActions.reset());
    position.state !=="none" && dispatch(weatherActions.reset()) ;

    navigator.geolocation.getCurrentPosition((pos:GeolocationPosition)=>{
      const latitude =JSON.stringify(pos.coords.latitude) ;
      const longitude =JSON.stringify(pos.coords.longitude);
      const loadingPosition :PositionState ={
        state:"loading",
        error:null,
        longitude: longitude,
        latitude: latitude,
        sfGrid:  null,
      };
      try{
        if(middleware === thunk){
          startThunk.current = true; 
          positionThunkDispatch(getPositionThunk(loadingPosition))
        }else{
          startSaga.current = true;
          dispatch(positionActions.request(loadingPosition));
        }
      }catch(error){
        const e =new Error (`can't find sfGrid`)
        dispatch(positionActions.failure(e));
      }
    },(error)=>{
      const e =new Error (`can't find currentPostion`)
      dispatch(positionActions.failure(e));
    });
  };
  function onClickThunk(){
    dispatchAction(thunk)
  };  

  function onClickSaga (){
    dispatchAction(saga)
  };
  useEffect(()=>{
    if(position.state === "success"){
      if(startThunk.current){
        weatherThunkDispatch(getWeatherThunk(position))
        startThunk.current = false; 
      }else{
        dispatch(weatherActions.request(position));
        startSaga.current =false;
      }
    }
  },[position.state]);
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
