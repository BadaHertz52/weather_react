import { createSlice  ,PayloadAction} from "@reduxjs/toolkit";
import {  PositionSuccessData } from "../position";
import { toolkitWeather } from "./toolkit";
import { WeatherState } from "./types";

export const noneState_weather :WeatherState ={
  state:"none",
  error:null,
  nowWeather:null,
  tomorrowWeather:null,
  threeDay:null,
  week:null,
  nation:null,
  sunRiseAndSet:null
};
const initialState = noneState_weather;
export const weatherSlice =createSlice({
  name:"weather",
  initialState,
  reducers :{
    reset :(state)=>({
      ...noneState_weather
    }),
    request :(state , action:PayloadAction<PositionSuccessData>)=>({
        ...noneState_weather,
        state:"pending"
      }),
    success :(state, action:PayloadAction<WeatherState>) =>({
      ...action.payload,
      state:"success"
    }),
    failure : (state, action:PayloadAction< Error>)=>({
      ...noneState_weather,
      state:"failure",
      error:action.payload
    })
  },
  extraReducers(builder) {
    builder
    .addCase( toolkitWeather.pending , (state, action)=>{
      return {
        ...noneState_weather,
        state:"pending"
      }
    })
    .addCase(toolkitWeather.fulfilled , (state, action)=>{
      return{
        ...action.payload
      }
    })
    .addCase(toolkitWeather.rejected, (state, action)=>{
      return {
        ...noneState_weather,
        state:"failure",
        error:action.error as Error
      }
    })
  }
});

export const {reset,request, success, failure} = weatherSlice.actions ;
export default weatherSlice.reducer;