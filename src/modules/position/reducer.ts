import { PositionState } from "./types";
import {  createSlice , PayloadAction } from "@reduxjs/toolkit";
import { CurrentPosition, toolkitPosition} from "./toolkit";

const initialState :PositionState ={
  state:"success",
  error:null,
  latitude: "37.6462313",
  longitude: "127.0132763",
  sfGrid:{
    areaCode: "1111000000",
    arePt1: "서울특별시",
    arePt2: "종로구",
    arePt3: null,
    nX: "60",
    nY: "127",
    longitude: "126.98164166666668",
    latitude: "37.57037777777778"
  },
};
const noneState_position:PositionState ={
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
      ...noneState_position
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