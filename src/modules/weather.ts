import React from "react";
import { GET_POSITION, GET_WHEATHER, WeatherAction, WeatherState } from "./types";

//initialState
const initialState :WeatherState ={
  nx:null,
  ny:null,
  nowWeather:null,
  hourly:null,
  weekly: null,
  nation: null,
  sunRiseAndSet:null
};

const weather =(state:WeatherState=initialState, action:WeatherAction):WeatherState=>{
  switch (action.type) {
    case GET_POSITION:
      const nx =60;
      const ny= 128;
    return {
      ...state,
      nx:nx,
      ny:ny
      };
    default:
      return state;
  }
};

export default weather;