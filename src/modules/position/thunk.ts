import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { getAreaData  } from "../api";
import { request, success,failure } from "./reducer";
import { PositionAction, PositionState} from "./types";

export const getPositionThunk =(currentPosition:CurrentPosition):ThunkAction<void, PositionState,unknown,PositionAction>=>async(dispatch)=>{
  const {latitude, longitude}=currentPosition; 
  dispatch(request(currentPosition));
  try {
    const sfGrid = await getAreaData(latitude,longitude);
    if(!(sfGrid instanceof Error)){
      const position :PositionState={
        state:"success",
        error:null,
        latitude:latitude,
        longitude:longitude,
        sfGrid:sfGrid
      };
      dispatch(success(position));
    }else{
      const error =new Error (`Can't find sfGrid:{latitude:${latitude}, logitude:${longitude}}`);
      dispatch(failure(error));
    }
  
  } catch (error) {
    const e = new Error ('Fail to get area data');
    dispatch(failure(e));
  }

};

export type CurrentPosition ={
  longitude:string,
  latitude:string
};


export const toolkitPosition = createAsyncThunk(
  'position/toolkitPosition',
  async (currentPosition:CurrentPosition , thunkAPI) => {
    const {latitude, longitude}=currentPosition;
    try {
      const sfGrid = await getAreaData(latitude,longitude);
      const error =new Error (`Can't find sfGrid:{latitude:${latitude}, logitude:${longitude}}`);
      const position :PositionState={
        state: sfGrid instanceof Error ? 'failure' :  "success",
        error: sfGrid instanceof Error ? error :null,
        latitude:latitude,
        longitude:longitude,
        sfGrid:sfGrid instanceof Error ? null : sfGrid
      };
      return position;
    } catch (err) {
      const error = err as Error
      return thunkAPI.rejectWithValue(error.message)
    };
  } 
)
