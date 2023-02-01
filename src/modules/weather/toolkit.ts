import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherData } from "../api";
import { PositionSuccessData } from "../position";
import { noneState_weather } from "./reducer";
import { WeatherState } from "./types";


export const toolkitWeather = createAsyncThunk (
  'weather/toolkitWeather',
  async ( positionSuccessData:PositionSuccessData,thunkAPI) => {
    const {longitude, latitude, sfGrid} = positionSuccessData;
    try {
      const data = await getWeatherData(sfGrid,longitude,latitude);
        const error = new Error (`[Error]:${data}`);
        const weatherState : WeatherState =
        (typeof data === "string")?
        {
          ...noneState_weather,
          state:"failure",
          error:error,
        }
        :{
          ...data
        }
        return weatherState
      
    } catch (err) {
      const error = err as Error ;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)