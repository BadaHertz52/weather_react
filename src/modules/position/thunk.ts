import { ThunkAction } from "redux-thunk";
import { getAreaData } from "../api";
import { CurrentPosition } from "./toolkit";
import { PositionAction, PositionState } from "./types";
import { positionActions } from "./reducer";

const { request, success, failure } = positionActions;

export const getPositionThunk =
  (
    currentPosition: CurrentPosition
  ): ThunkAction<void, PositionState, unknown, PositionAction> =>
  async (dispatch) => {
    const { latitude, longitude } = currentPosition;
    dispatch(request(currentPosition));
    try {
      const sfGrid = await getAreaData(latitude, longitude);
      if (!(sfGrid instanceof Error)) {
        const position: PositionState = {
          state: "success",
          error: null,
          latitude: latitude,
          longitude: longitude,
          sfGrid: sfGrid,
        };
        dispatch(success(position));
      } else {
        const error = new Error(
          `Can't find sfGrid:{latitude:${latitude}, longitude:${longitude}}`
        );
        dispatch(failure(error));
      }
    } catch (error) {
      const e = new Error("Fail to get area data");
      dispatch(failure(e));
    }
  };
