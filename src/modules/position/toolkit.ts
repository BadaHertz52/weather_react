import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAreaData } from "../api";
import { PositionState } from "./types";

export type CurrentPosition = {
  longitude: string;
  latitude: string;
};

export const toolkitPosition = createAsyncThunk(
  "position/toolkitPosition",
  async (currentPosition: CurrentPosition, thunkAPI) => {
    const { latitude, longitude } = currentPosition;
    try {
      const sfGrid = await getAreaData(latitude, longitude);
      const error = new Error(
        `Can't find sfGrid:{latitude:${latitude}, longitude:${longitude}}`
      );
      const position: PositionState = {
        state: sfGrid instanceof Error ? "failure" : "success",
        error: sfGrid instanceof Error ? error : null,
        latitude: latitude,
        longitude: longitude,
        sfGrid: sfGrid instanceof Error ? null : sfGrid,
      };
      return position;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
