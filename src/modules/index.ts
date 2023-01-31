import { combineReducers } from "redux";
import { positionSaga } from "./position";
import { weatherSaga } from "./weather";
import {all} from 'redux-saga/effects';
import positionReducer from './position/reducer';
import weatherReducer from './weather/reducer';

export type RootState =ReturnType<typeof rootReducer>;

const rootReducer =combineReducers({positionReducer, weatherReducer});

export default rootReducer;

export function* rootSaga(){
  yield all([positionSaga(), weatherSaga()])
}