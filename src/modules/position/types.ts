import { DataState } from "../weather/types";
import { reset,request, success,failure } from "./reducer";

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

export type PositionSuccessData ={
  longitude:string,
  latitude:string,
  sfGrid:SFGridItem,
};
export type PositionAction = ReturnType<typeof reset> |
ReturnType<typeof request> |
ReturnType<typeof success> |
ReturnType<typeof failure>  ;
