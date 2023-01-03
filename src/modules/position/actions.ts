import { createAsyncAction, } from "typesafe-actions";
import { CurrentPositon, PositionState } from "./types";

export const GET_POSITION_REQUEST ="GET_POSITION_REQUEST";
export const GET_POSITION_SUCCESS ="GET_POSITION_SUCCESS";
export const GET_POSITION_FAILURE ="GET_POSITION_FAILURE";

export const getPositionAsync =createAsyncAction(
  GET_POSITION_REQUEST,
  GET_POSITION_SUCCESS,
  GET_POSITION_FAILURE
)<undefined, PositionState,Error>();

export const getPositionSagaAction =(currentPsotion:CurrentPositon)=>({
  type:GET_POSITION_REQUEST,
  meta:currentPsotion
})
