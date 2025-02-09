import { AnyAction } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../modules";
import {
  CurrentPosition,
  getPositionThunk,
  PositionAction,
  PositionState,
  PositionSuccessData,
  toolkitPosition,
  positionSlice,
  weatherSlice,
  WeatherState,
} from "../../modules";

import LocationArea from "./LocationArea";
import DropDown from "./DropDown";

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

  const dispatchAction = useCallback(
    (middleware: "thunk" | "saga" | "toolkit") => {
      dispatch(positionActions.reset());
      dispatch(weatherActions.reset());

      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          const latitude = JSON.stringify(pos.coords.latitude);
          const longitude = JSON.stringify(pos.coords.longitude);
          const currentPosition: CurrentPosition = {
            longitude: longitude,
            latitude: latitude,
          };

          try {
            switch (middleware) {
              case "thunk":
                startThunk.current = true;
                positionThunkDispatch(getPositionThunk(currentPosition));
                break;
              case "saga":
                startSaga.current = true;
                dispatch(positionActions.request(currentPosition));
                break;
              case "toolkit":
                startToolkit.current = true;
                toolkitDispatch(toolkitPosition(currentPosition));
                break;
              default:
                break;
            }
          } catch (error) {
            const e = new Error(`can't find sfGrid\n${error}`);

            dispatch(positionActions.failure(e));
          }
        },
        error => {
          const e = new Error(`can't find current position\n ${error}`);

          dispatch(positionActions.failure(e));
        }
      );
    },
    [
      dispatch,
      positionActions,
      positionThunkDispatch,
      startSaga,
      startThunk,
      startToolkit,
      toolkitDispatch,
    ]
  );

  return (
    <div className="location">
      <LocationArea position={position} />
      <DropDown position={position} dispatchAction={dispatchAction} />
    </div>
  );
};

export default React.memo(Location);
