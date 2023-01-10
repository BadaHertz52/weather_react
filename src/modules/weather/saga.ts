import {call, put, takeEvery} from 'redux-saga/effects';
import { getWeatherData } from "../api";
import { WeatherState } from "./types";
import { request, success, failure } from "./reducer";

function* getWeatherSaga(action:ReturnType<typeof  request>){
  if(action.payload !==null){
    try {
      const {longitude, latitude,sfGrid} =action.payload ;
      if(longitude !==null && latitude !==null && sfGrid !==null){
        const data : string|WeatherState = yield call(()=>(getWeatherData(sfGrid, longitude, latitude)));
        if(typeof data === "string"){
          const error =new Error(data);
          yield put(failure(error));
        }else{
          yield put(success(data))
        };
      }else{
        const error =new Error(`Is longitude null? : ${longitude ===null}
        Is latitude null? : ${latitude ===null}
        Is sfGrid null? : ${sfGrid ===null}
        `);
        yield put(failure(error));
        
      }
  } catch (error) {
    const e = new Error(`Can't get weather data ${error}`);
    yield put(failure(e));
  }
  } 
};
export function* weatherSaga( ){
  yield takeEvery(request, getWeatherSaga)
};