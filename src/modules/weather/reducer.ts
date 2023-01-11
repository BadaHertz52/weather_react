import { createSlice  ,PayloadAction} from "@reduxjs/toolkit";
import { PositionState } from "../position";
import { WeatherState } from "./types";


const initialState :WeatherState ={
  state:"none",
  error:null,
  nowWeather:null,
  threeDay:null,
  weekly:null,
  nation:null,
  sunRiseAndSet:null
};
const noneState :WeatherState ={
  state:"none",
  error:null,
  nowWeather:null,
  threeDay:null,
  weekly:null,
  nation:null,
  sunRiseAndSet:null
};

export const weatherSlice =createSlice({
  name:"weather",
  initialState,
  reducers :{
    reset :(state)=>({
      ...noneState
    }),
    request :(state , action:PayloadAction<PositionSuccessData>)=>({
        ...noneState,
        state:"loading"
      }),
    success :(state, action:PayloadAction<WeatherState>) =>({
      ...action.payload
    }),
    failure : (state, action:PayloadAction< Error>)=>({
      ...noneState,
      state:"failure",
      error:action.payload
    })
});

export const {reset,request, success, failure} = weatherSlice.actions ;

export default weatherSlice.reducer;