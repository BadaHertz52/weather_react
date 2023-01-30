import { createSlice  ,PayloadAction} from "@reduxjs/toolkit";
import {  PositionSuccessData } from "../position";
import { toolkitWeather } from "./thunk";
import { WeatherState } from "./types";

export const noneState :WeatherState ={
  state:"none",
  error:null,
  nowWeather:null,
  tomrrowWeather:null,
  threeDay:null,
  week:null,
  nation:null,
  sunRiseAndSet:null
};
const initialState = noneState;
export const weatherSlice =createSlice({
  name:"weather",
  initialState,
  reducers :{
    reset :(state)=>({
      ...noneState
    }),
    request :(state , action:PayloadAction<PositionSuccessData>)=>({
        ...noneState,
        state:"pending"
      }),
    success :(state, action:PayloadAction<WeatherState>) =>({
      ...action.payload,
      state:"success"
    }),
    failure : (state, action:PayloadAction< Error>)=>({
      ...noneState,
      state:"failure",
      error:action.payload
    })
  },
  extraReducers(builder) {
    builder
    .addCase( toolkitWeather.pending , (state, action)=>{
      return {
        ...noneState,
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
        ...noneState,
        state:"failure",
        error:action.error as Error
      }
    })
  }
});

export const {reset,request, success, failure} = weatherSlice.actions ;
export default weatherSlice.reducer;