import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { getAreaData  } from "../api";
import { request, success,failure } from "./reducer";
import { PositionAction, PositionState} from "./types";

export const getPositionThunk =(positionState:PositionState):ThunkAction<void, PositionState,unknown,PositionAction>=>async(dispatch)=>{
  const {latitude, longitude}=positionState; 
  dispatch(request(positionState));
  if (latitude !==null && longitude !==null) {
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
  }else{
    const error = new Error(`latidue or longitude is null : {type of latitude : ${typeof latitude} , typeof longitude :${typeof longitude}  }`);
    dispatch(failure(error));
  }

};

type CurrentPosition ={
  longitude:string,
  latitude:string
};


export const toolkitPosition = createAsyncThunk(
  'position/toolkitPosition',
  async (currentPosition:CurrentPosition , {rejectWithValue}) => {
    const {latitude, longitude}=currentPosition;
    try {
      const sfGrid = await getAreaData(latitude,longitude);
    const error =new Error (`Can't find sfGrid:{latitude:${latitude}, logitude:${longitude}}`);
    const position :PositionState={
      state: sfGrid instanceof Error ? "error" :  "success",
      error: sfGrid instanceof Error ? error :null,
      latitude:latitude,
      longitude:longitude,
      sfGrid:sfGrid instanceof Error ? null : sfGrid
    };
    return position;
    } catch (err) {
      return rejectWithValue(err)
    } 
    
  }
)
