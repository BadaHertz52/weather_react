import { WeatherState } from "./types";

const initialState :WeatherState ={
  state:"none",
  nowWeather:null,
  threeDay:null,
  weekly:null,
  nation:null,
  sunRiseAndSet:null
};

const weather =(state:WeatherState=initialState, action:WeatherAction):WeatherState=>{
  switch (action.type) {
    case GET_POSITION:
      return {
        ...state,
        latitude:action.latitude,
        longitude:action.longitude,
        sfGrid:action.sfGrid
      };
    case GET_WHEATHER :
      return {
        longitude:action.longitude,
        latitude:action.latitude,
        sfGrid:action.sfGrid,
        ...action.weatherData
      };
    default:
      return state;
  }
};

export default weather;