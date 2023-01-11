import { getAreaData } from "../api";
import {  PositionState, SFGridItem } from "./types";
import {call, put, takeEvery} from 'redux-saga/effects';
import { request ,success, failure } from "./reducer";


function* getPositionSaga(action:ReturnType<typeof request>){
    const {longitude, latitude}= action.payload;
    try {
      const sfGrid :Error|SFGridItem = yield call(()=>getAreaData(latitude,longitude));
      if(!(sfGrid instanceof Error)){
        const position :PositionState={
          state:"success",
          error:null,
          latitude:latitude,
          longitude:longitude,
          sfGrid:sfGrid
        };
        yield put(success(position));
      }else{
        const e =new Error(`can't get sfGrid`);
      yield put(failure(e))
      }
  
    } catch (error) {
      const e =new Error(`can't get sfGrid ${error}`);
      yield put(failure(e))
    }
};

export function* positionSaga(){
  yield takeEvery(request, getPositionSaga)
};


