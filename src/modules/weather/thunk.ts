import { ThunkAction } from "redux-thunk";
import { getWeatherData } from "../api";
import { PositionSuccessData } from "../position/";
import { WeatherAction, WeatherState } from "./types";
import { weatherActions } from "./reducer";

const { request, success, failure } = weatherActions;

export const getWeatherThunk =
  (
    positionSuccessData: PositionSuccessData
  ): ThunkAction<void, WeatherState, unknown, WeatherAction> =>
  async (dispatch) => {
    const { longitude, latitude, sfGrid } = positionSuccessData;
    dispatch(request(positionSuccessData));
    try {
      // weatherState 이거나 error message 를 담은 string
      const data = await getWeatherData(sfGrid, longitude, latitude);
      if (data instanceof Error) {
        dispatch(failure(data));
      } else {
        dispatch(success(data));
      }
    } catch (e) {
      const error = new Error("Fail get weather data");
      dispatch(failure(error));
    }
  };
