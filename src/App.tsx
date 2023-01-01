import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {  ThunkDispatch } from 'redux-thunk';
import { RootState } from './modules';
import { PositionAction, PositionState } from './modules/position';
import { getPositionThunk } from './modules/position/thunk';
import { WeatherAction, WeatherState } from './modules/weather';
import { getWeatherThunk } from './modules/weather/thunk';

function App () {
  const {weather, position}= useSelector((state:RootState) => state);
  const {longitude, latitude, sfGrid}=position; 
  const positionDispatch =useDispatch<ThunkDispatch<PositionState,unknown,PositionAction>>();
  const weatherDispatch =useDispatch<ThunkDispatch<WeatherState, unknown,WeatherAction>>();

  useEffect(()=>{
    console.log("position", position);
    if(position.state === "none"){
      positionDispatch(getPositionThunk());
    }else{
      console.log("position", position);
      if( weather.state === "none" && position.state =="success"){
        weatherDispatch(getWeatherThunk(position));
      }
    };
    console.log("weather", weather);
  },[position ,weather]);

  return (
    <div className="App">
    </div>
  );
}
    
export default App;
