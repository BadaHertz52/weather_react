import { call, put, takeEvery } from "redux-saga/effects";
import { getWeatherData } from "../api";
import { WeatherState } from "./types";
import { weatherActions } from "./reducer";

const { request, success, failure } = weatherActions;

function* getWeatherSaga(action: ReturnType<typeof request>) {
  const { longitude, latitude, sfGrid } = action.payload;
  try {
    const data: Error | WeatherState = yield call(() =>
      getWeatherData(sfGrid, longitude, latitude)
    );
    if (data instanceof Error) {
      yield put(failure(data));
    } else {
      yield put(success(data));
    }
  } catch (error) {
    const e = new Error(`Can't get weather data ${error}`);
    yield put(failure(e));
  }
}

export function* weatherSaga() {
  yield takeEvery(request, getWeatherSaga);
}
