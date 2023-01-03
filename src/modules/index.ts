import { combineReducers } from "redux";
import weather from './weather/reducer';
import position from './position/reducer';
import { positionSaga, SFGridItem } from "./position";
import { weatherSaga } from "./weather";
import {all} from 'redux-saga/effects';

export type RootState =ReturnType<typeof rootReducer>;

const rootReducer =combineReducers({position, weather});

export default rootReducer;

export function* rootSaga(){
  yield all([positionSaga(), weatherSaga()])
}