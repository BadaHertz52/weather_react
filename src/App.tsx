import "./assets/reset.css";
import "./assets/main.css";
import { AnyAction } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Location from "./component/Location";
import { RootState } from "./modules";
import {
  PositionAction,
  PositionState,
  PositionSuccessData,
  CurrentPosition,
} from "./modules/position";
import {
  SunRiseAndSet,
  WeatherAction,
  WeatherState,
  toolkitWeather,
} from "./modules/weather";
import { weatherSlice } from "./modules/weather/reducer";
import { getWeatherThunk } from "./modules/weather/thunk";
import Loading from "./component/Loading";
import Content from "./component/Content";
import Footer from "./component/Footer";
import NoneWeather from "./component/NoneWeather";
/**
 * hours 가 일몰,일출 시간을 기준을 낮 시간인지 밤 시간인지 확인하는 함수
 * @param hours
 * @param todaySunInform
 * @returns 낮 시간이라면 true를 밤시간이라면 false
 */
export const checkDayOrNight = (
  hours: number,
  todaySunInform: Error | SunRiseAndSet
): boolean => {
  const sunInformError = todaySunInform instanceof Error;
  const sunrise: number =
    sunInformError || todaySunInform.sunRise == null
      ? 6
      : Number(todaySunInform.sunRise.slice(0, 1));
  const sunset: number =
    sunInformError || todaySunInform.sunSet == null
      ? 18
      : Number(todaySunInform.sunSet?.slice(0, 2));
  const dayCondition = hours > sunrise && hours < sunset;
  /**
   * 현재 시간이 낮인지
   */
  const daytime: boolean = dayCondition ? true : false;
  return daytime;
};

function App() {
  const position = useSelector((state: RootState) => state.positionReducer);
  const weather = useSelector((state: RootState) => state.weatherReducer);

  const positionThunkDispatch =
    useDispatch<ThunkDispatch<PositionState, unknown, PositionAction>>();
  const weatherActions = weatherSlice.actions;
  const weatherThunkDispatch =
    useDispatch<ThunkDispatch<WeatherState, unknown, WeatherAction>>();
  const dispatch = useDispatch();
  const toolkitDispatch =
    useDispatch<
      ThunkDispatch<
        PositionState | WeatherState,
        CurrentPosition | PositionSuccessData,
        AnyAction
      >
    >();

  const startThunk = useRef<boolean>(false);
  const startSaga = useRef<boolean>(false);
  const startToolkit = useRef<boolean>(false);
  useEffect(() => {
    if (
      position.state === "success" &&
      weather.state !== "success" &&
      position.longitude !== null &&
      position.latitude !== null &&
      position.sfGrid !== null
    ) {
      const positionSuccessDate: PositionSuccessData = {
        longitude: position.longitude,
        latitude: position.latitude,
        sfGrid: position.sfGrid,
      };
      if (startThunk.current) {
        weatherThunkDispatch(getWeatherThunk(positionSuccessDate));
        startThunk.current = false;
      } else if (startSaga.current) {
        dispatch(weatherActions.request(positionSuccessDate));
        startSaga.current = false;
      } else {
        startToolkit.current = false;
        toolkitDispatch(toolkitWeather(positionSuccessDate));
      }
    }
  }, [position.state]);
  return (
    <div className="App">
      <header id="topBar">
        <div className="inner">
          <h1 className="logo">날씨</h1>
          <Location
            startSaga={startSaga}
            startThunk={startThunk}
            startToolkit={startToolkit}
            positionThunkDispatch={positionThunkDispatch}
            toolkitDispatch={toolkitDispatch}
          />
        </div>
      </header>
      <main id="container">
        {weather.state === "pending" ? (
          <Loading
            positionState={position.state}
            weatherState={weather.state}
          />
        ) : weather.state === "success" ? (
          <Content weather={weather} />
        ) : (
          <NoneWeather />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
