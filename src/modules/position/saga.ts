import { getAreaData } from "../api";
import { getPositionAsync, GET_POSITION_REQUEST } from "./actions";
import {  PositionState, SFGridItem } from "./types";
import {call, put, takeEvery} from 'redux-saga/effects';

function* getPositionSaga(action:ReturnType<typeof getPositionAsync.request>){
    const {longitude, latitude}= action.payload;
    if(longitude !==null && latitude !==null){
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
          yield put(getPositionAsync.success(position));
        }else{
          const e =new Error(`can't get sfGrid`);
        yield put(getPositionAsync.failure(e))
        }
    
      } catch (error) {
        const e =new Error(`can't get sfGrid ${error}`);
        yield put(getPositionAsync.failure(e))
      }
    }

};

export function* positionSaga(){
  yield takeEvery(GET_POSITION_REQUEST, getPositionSaga)
};


