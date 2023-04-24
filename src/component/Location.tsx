import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import styled from "styled-components";
import { RootState } from "../modules";
import {
  CurrentPosition,
  getPositionThunk,
  PositionAction,
  PositionState,
  PositionSuccessData,
  toolkitPosition,
} from "../modules/position";
import { positionSlice } from "../modules/position/reducer";
import { WeatherState } from "../modules/weather";
import { weatherSlice } from "../modules/weather/reducer";
import {
  MdLocationSearching,
  MdShareLocation,
  MdMyLocation,
  MdLocationDisabled,
} from "react-icons/md";
import None from "./None";

const StyledBtn = styled.button`
  width: 30%;
  font-size: 1rem;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ebebeb 25%, #dad9d9e9 100%);
  background-color: #ededed;
  border-radius: 6px;
  border: 1px solid #cacaca;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    background: linear-gradient(to bottom, #c6c5c5e9, 25%, #ebebeb 100%);
    background-color: #c6c5c5e9;
  }
`;

type LocationProperty = {
  startThunk: React.MutableRefObject<boolean>;
  startSaga: React.MutableRefObject<boolean>;
  startToolkit: React.MutableRefObject<boolean>;
  positionThunkDispatch: ThunkDispatch<PositionState, unknown, PositionAction>;
  toolkitDispatch: ThunkDispatch<
    PositionState | WeatherState,
    CurrentPosition | PositionSuccessData,
    AnyAction
  >;
};
const Location = ({
  startThunk,
  startSaga,
  startToolkit,
  positionThunkDispatch,
  toolkitDispatch,
}: LocationProperty) => {
  const position = useSelector((state: RootState) => state.positionReducer);
  const positionActions = positionSlice.actions;
  const weatherActions = weatherSlice.actions;

  const dispatch = useDispatch();

  const thunk = "thunk";
  const saga = "saga";
  const toolkit = "toolkit";

  type Middleware = typeof thunk | typeof saga | typeof toolkit;

  function dispatchAction(middleware: Middleware) {
    position.state !== "none" && dispatch(positionActions.reset());
    position.state !== "none" && dispatch(weatherActions.reset());

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const latitude = JSON.stringify(pos.coords.latitude);
        const longitude = JSON.stringify(pos.coords.longitude);
        const currentPosition: CurrentPosition = {
          longitude: longitude,
          latitude: latitude,
        };
        try {
          if (middleware === thunk) {
            startThunk.current = true;
            positionThunkDispatch(getPositionThunk(currentPosition));
          } else if (middleware === saga) {
            startSaga.current = true;
            dispatch(positionActions.request(currentPosition));
          } else {
            startToolkit.current = true;
            toolkitDispatch(toolkitPosition(currentPosition));
          }
        } catch (error) {
          const e = new Error(`can't find sfGrid`);
          dispatch(positionActions.failure(e));
        }
      },
      (error) => {
        const e = new Error(`can't find current position`);
        dispatch(positionActions.failure(e));
      }
    );
  }
  function onClickThunk() {
    dispatchAction(thunk);
  }

  function onClickSaga() {
    dispatchAction(saga);
  }

  function onClickToolkitThunk() {
    dispatchAction(toolkit);
  }

  return (
    <div className="location">
      <div className="Location_area">
        {(position.state === "failure" || position.state === "none") && (
          <None target="현재 위치" />
        )}
        {position.state === "pending" && "위치 찾는 중"}
        {position.state === "success" &&
          (position.sfGrid !== null ? (
            position.sfGrid.arePt2 !== null ? (
              position.sfGrid.arePt3 !== null ? (
                `${position.sfGrid.arePt2}

                    ${position.sfGrid.arePt3}`
              ) : (
                position.sfGrid.arePt2
              )
            ) : (
              position.sfGrid.arePt1
            )
          ) : (
            <None target="현재 위치" />
          ))}
      </div>
      <div className="location_dropdown">
        <div className="dropBtn">
          {position.state === "none" && <MdLocationSearching />}
          {position.state === "pending" && <MdShareLocation />}
          {position.state === "success" && <MdMyLocation />}
          {position.state === "failure" && <MdLocationDisabled />}
        </div>
        <div className="dropdown-content">
          <div className="header">
            <p>어떤 방식으로 날씨 정보를 불러올까요?</p>
            <p>원하는 방식을 선택해주세요.</p>
          </div>
          <div className="btn-group">
            <StyledBtn
              className="toolkitBtn"
              onClick={onClickToolkitThunk}
              title="use redux-toolkit"
            >
              toolkit
            </StyledBtn>
            <StyledBtn
              className="thunkBtn"
              onClick={onClickThunk}
              title="use redux-thunk"
            >
              thunk
            </StyledBtn>
            <StyledBtn
              className="sagaBtn"
              onClick={onClickSaga}
              title="use redux-saga"
            >
              saga
            </StyledBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Location);
