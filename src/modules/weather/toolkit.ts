import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherData } from "../api";
import { PositionSuccessData } from "../position";
import { WeatherState } from "./types";
import { noneState_weather } from "./reducer";

export const toolkitWeather = createAsyncThunk(
  "weather/toolkitWeather",
  async (positionSuccessData: PositionSuccessData, thunkAPI) => {
    const { longitude, latitude, sfGrid } = positionSuccessData;
    try {
      const data = await getWeatherData({ sfGrid, longitude, latitude });
      const weatherState: WeatherState =
        data instanceof Error
          ? {
              ...noneState_weather,
              state: "failure",
              error: data,
            }
          : {
              ...data,
            };
      return weatherState;
    } catch (err) {
      const error = new Error("Fail get weather data");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
