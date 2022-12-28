import React from "react";
import { GET_POSITION, GET_WHEATHER, WeatherAction, WeatherState } from "./weatherTypeAndFn";

//initialState
const initialState :WeatherState ={
  nX:null,
  nY:null,
  nowWeather:null,
  hourly:null,
  weekly: null,
  nation: null,
  sunRiseAndSet:null
};

const weather =(state:WeatherState=initialState, action:WeatherAction):WeatherState=>{
  switch (action.type) {
    case GET_POSITION:
      const nX =60;
      const nY= 128;
    return {
      ...state,
      nX:nX,
      nY:nY
      };
    default:
      return state;
  }
};

export default weather;