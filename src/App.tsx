import "./assets/reset.css";
import "./assets/main.scss";
import { AnyAction } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Location, Loading } from "./component";
import {
  CurrentPosition,
  getWeatherThunk,
  PositionAction,
  PositionState,
  PositionSuccessData,
  RootState,
  toolkitWeather,
  WeatherAction,
  WeatherState,
  weatherSlice,
} from "./modules";

import Content from "./component/Content";
import Footer from "./component/Footer";
import NoneWeather from "./component/weatherContents/NoneWeather";

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
      weather.state === "none" &&
      position.longitude &&
      position.latitude &&
      position.sfGrid
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
  }, [
    position.state,
    dispatch,
    position.latitude,
    position.longitude,
    position.sfGrid,
    toolkitDispatch,
    weather.state,
    weatherActions,
    weatherThunkDispatch,
  ]);
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
