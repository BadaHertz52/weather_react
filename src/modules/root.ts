import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { positionReducer, positionSaga } from "./position";
import { weatherReducer, weatherSaga } from "./weather";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({ positionReducer, weatherReducer });

export default rootReducer;

export function* rootSaga() {
  yield all([positionSaga(), weatherSaga()]);
}
