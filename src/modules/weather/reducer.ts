import { createReducer } from "typesafe-actions";
import { GET_WEATHER_FAILURE, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS } from "./actions";
import { WeatherAction, WeatherState } from "./types";

const initialState :WeatherState ={
  state:"none",
  error:null,
  nowWeather:null,
  threeDay:null,
  weekly:null,
  nation:null,
  sunRiseAndSet:null
};

const weather = createReducer<WeatherState, WeatherAction>(initialState)
.handleType(GET_WEATHER_REQUEST, ()=>({
  ...initialState,
  state:"loading"
}))
.handleType(GET_WEATHER_SUCCESS, (state,action)=>({
  ...action.payload
}))
.handleType(GET_WEATHER_FAILURE, (state, action)=>({
  ...state,
  state:"error",
  error:action.payload
}))
export default weather;