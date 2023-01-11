import { PositionState } from "./types";
import {  createSlice , PayloadAction } from "@reduxjs/toolkit";
import { CurrentPosition, toolkitPosition} from "./thunk";
import { positionSample } from "../sample";

// const initialState:PositionState ={
//   state:"none",
//   error:null,
//   longitude: null,
//   latitude:null,
//   sfGrid: null
// };
const initialState = positionSample;
const noneState:PositionState ={
  state:"none",
  error:null,
  longitude: null,
  latitude:null,
  sfGrid: null
};

export const positionSlice =createSlice({
  name:'position',
  initialState,
  reducers :{
    reset :(state)=>({
      ...noneState
    }),
    request :(state ,action:PayloadAction<CurrentPosition> )=>({
      state:"pending",
      error:null,
      longitude:action.payload.longitude,
      latitude:action.payload.latitude,
      sfGrid:null
    }),
    success:(state, action:PayloadAction<PositionState>)=>({
      ...action.payload,
      state:"success"
    }),
    failure :(state, action: PayloadAction<Error>)=>({
      ...state,
      state:"failure",
      error:action.payload
    })
  },
  extraReducers(builder) {
    builder
    .addCase(toolkitPosition.pending ,(state, action)=>{
      return {
        state :"pending",
        error :null,
        longitude: action.meta.arg.longitude,
        latitude:action.meta.arg.latitude,
        sfGrid:null
      }
    })
    .addCase(toolkitPosition.fulfilled ,(state, action)=>{
      return {
        ...action.payload,
        state:'success'
      }
    })
    .addCase(toolkitPosition.rejected, (state, action)=>{
      const err = action.error as Error 
      return {
        state:"failure",
        error :err,
        longitude:action.meta.arg.longitude,
        latitude:action.meta.arg.latitude,
        sfGrid:null
      }
    })
  },
});

export const {reset,request, success, failure} = positionSlice.actions ;

export default positionSlice.reducer;