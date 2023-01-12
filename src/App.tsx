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
import Weekly from './component/Weekly';
import { RootState } from './modules';
import { PositionAction, PositionState, PositionSuccessData } from './modules/position';
import { CurrentPosition} from './modules/position/thunk';
import {   WeatherAction, WeatherState } from './modules/weather';
import { weatherSlice } from './modules/weather/reducer';
import { getWeatherThunk, toolkitWeather } from './modules/weather/thunk';

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
      <div className='top' role="menu">
        <Loaction
          startSaga={startSaga}
          startThunk={startThunk}
          startToolkit={startToolkit}
          positionThunkDispatch={positionThunkDispatch}
          toolkitDispatch={toolkitDispatch}
        />
      </div>
      <div id='container' role="main">
        <div className ="section">
          <div className="section_center">
            <Now
            />
            <Hourly/>
            <Weekly/>
            
          </div>
          <div className="section_rigth">
            <Nation/>
            <Sun/>
          </div>
        </div>
      </div>

    </div>
  );
}
    
export default App;
