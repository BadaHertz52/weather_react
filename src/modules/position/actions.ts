import { createAsyncAction } from "typesafe-actions/dist/create-async-action";
import { PositionState } from "./types";

export const GET_POSITION_REQUEST ="GET_POSITION_REQUEST";
export const GET_POSITION_SUCCESS ="GET_POSITION_SUCCESS";
export const GET_POSITION_FAILURE ="GET_POSITION_FAILURE";

export const getPositionAsync =createAsyncAction(
  GET_POSITION_REQUEST,
  GET_POSITION_SUCCESS,
  GET_POSITION_FAILURE
)<undefined, PositionState,Error>();