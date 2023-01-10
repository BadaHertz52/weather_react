import { PositionState } from "./types";
import {  createSlice , PayloadAction } from "@reduxjs/toolkit";
import { toolkitPosition} from "./thunk";

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
  },
  extraReducers(builder) {
    builder
    .addCase(toolkitPosition.pending ,(state, actoin)=>{
      return {
        state :"loading",
        error :null,
        longitude:null,
        latitude:null,
        sfGrid:null
      }
    })
    .addCase(toolkitPosition.fulfilled ,(state, action)=>{
      return {...action.payload}
    })
    .addCase(toolkitPosition.rejected, (state, action)=>{
      const error = new Error (`Rejected get sfGrid`);
     return {
        state:"error",
        error :error,
        longitude:null,
        latitude:null,
        sfGrid:null
      }
    })
  },
});

export const {reset,request, success, failure} = positionSlice.actions ;

export default positionSlice.reducer;