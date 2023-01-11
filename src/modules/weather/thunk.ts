import { ThunkAction } from "redux-thunk";
import { getWeatherData } from "../api";
import { PositionState, PositionSuccessData, SFGridItem } from "../position/types";
import { WeatherAction, WeatherState } from "./types";
import { request, success, failure } from "./reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWeatherThunk =(positionSuccessData:PositionSuccessData):ThunkAction<void,WeatherState, unknown,WeatherAction>=>async(dispatch)=>{
  const {longitude, latitude, sfGrid}=positionSuccessData;
  dispatch(request(positionSuccessData));
  try{
    // weatherState 이거나 error message 를 담은 string 
    const data = await getWeatherData(sfGrid,longitude,latitude);
    if(typeof data === "string"){
      const error = new Error (`[Error : weather data]:${data}`);
      dispatch(failure(error));
    }else{
      dispatch(success(data));
    }
  }catch(e){
    const error =new Error ("Fail get weather data");
    dispatch(failure(error));
  }
  
};

export const toolkitWeather = createAsyncThunk (
  'weather/toolkitWeather',
  async ( positionSuccessData:PositionSuccessData,thunkAPI) => {
    const {longitude, latitude, sfGrid} = positionSuccessData;
    try {
      const data = await getWeatherData(sfGrid,longitude,latitude);
      if(typeof data === "string"){
        const error = new Error (`[Error : weather data]:${data}`);
        return thunkAPI.rejectWithValue(error);
      }else{
        return data
      }
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error);
    }
  }
)