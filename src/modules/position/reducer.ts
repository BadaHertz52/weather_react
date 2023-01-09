import { PositionAction, PositionState } from "./types";
import {createReducer} from 'typesafe-actions';
import { GET_POSITION_FAILURE, GET_POSITION_REQUEST, GET_POSITION_SUCCESS } from "./actions";

const initialState:PositionState ={
  state:"none",
  error:null,
  longitude: null,
  latitude:null,
  sfGrid: null
};

const position =createReducer<PositionState ,PositionAction>(initialState)
.handleType(GET_POSITION_REQUEST, (state, action)=>({
  ...action.payload,
  state:"loading"
}))
.handleType(GET_POSITION_SUCCESS, (state, action) =>({
  ...action.payload
}))
.handleType(GET_POSITION_FAILURE, (state, action)=>({
  ...state,
  state:"error",
  error:action.payload
}));

export default position ;
