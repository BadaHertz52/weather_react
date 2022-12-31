import { WeatherState } from "./types";
import {createAsyncAction} from 'typesafe-actions';

export const GET_WEATHER_REQUEST="GET_WEATHER_REQUEST";
export const GET_WEATHER_SUCCESS="GET_WEATHER_SUCCESS";
export const GET_WEATHER_FAILURE="GET_WEATHER_FAILURE";

export const getWeatherAsynce =createAsyncAction(
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
)<undefined, WeatherState, Error>();
