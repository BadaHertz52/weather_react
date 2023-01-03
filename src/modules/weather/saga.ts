import { getWeatherAsync, getWeatherSagaAction, GET_WEATHER_REQUEST } from "./actions";
import {call, put, takeEvery} from 'redux-saga/effects';
import { getWeatherData } from "../api";
import { WeatherState } from "./types";


function* getWeatherSaga(action:ReturnType<typeof getWeatherSagaAction>){
  try {
        const position = action.meta ;
        const {longitude, latitude,sfGrid} = position ;
        if(longitude !==null && latitude !==null && sfGrid !==null){
          const data : string|WeatherState = yield call(()=>(getWeatherData(sfGrid, longitude, latitude)));
          if(typeof data === "string"){
            const error =new Error(data);
            console.log(error);
            yield put(getWeatherAsync.failure(error));
          }else{
            yield put(getWeatherAsync.success(data))
          };
        }else{
          const error =new Error(`Is longitude null? : ${longitude ===null}
          Is latitude null? : ${latitude ===null}
          Is sfGrid null? : ${sfGrid ===null}
          `);
          console.log(error);
          yield put(getWeatherAsync.failure(error));
          
        }



  } catch (error) {
    const e = new Error(`Can't get weather data ${error}`);
    console.log(error);
    yield put(getWeatherAsync.failure(e));
  }
};

export function* weatherSaga( ){
  yield takeEvery(GET_WEATHER_REQUEST, getWeatherSaga)
};