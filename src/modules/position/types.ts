import { DataState } from "../weather/types";
import * as actions from './actions';
import { ActionType } from "typesafe-actions";

export type SFGridItem ={
  areaCode: string|number,
  arePt1: string,
  arePt2: string |null,
  arePt3: string |null,
  nX: string|number,
  nY: string|number,
  longitude: string|number,
  latitude: string|number
};

export type PositionState ={
  state:DataState,
  error:Error|null,
  longitude:string|null,
  latitude:string|null,
  sfGrid:SFGridItem |null,
};

export type PositionAction = ActionType<typeof actions>;