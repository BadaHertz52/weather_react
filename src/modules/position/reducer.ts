import { PositionState } from "./types";
import { createSlice , PayloadAction } from "@reduxjs/toolkit";

const initialState:PositionState ={
  state:"none",
  error:null,
  longitude: null,
  latitude:null,
  sfGrid: null
};
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
    request :(state ,action:PayloadAction<PositionState> )=>({
      ...action.payload,
      state:"loading"
    }),
    success:(state, action:PayloadAction<PositionState>)=>({
      ...action.payload
    }),
    failure :(state, action: PayloadAction<Error>)=>({
      ...state,
      state:"error",
      error:action.payload
    })
  }
});

export const {reset,request, success, failure} = positionSlice.actions ;

export default positionSlice.reducer;