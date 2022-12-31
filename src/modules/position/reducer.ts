import { PositionAction, PositionState } from "./types";
import {createReducer} from 'typesafe-actions';
import { GET_POSITION_FAILURE, GET_POSITION_REQUEST, GET_POSITION_SUCCESS } from "./actions";

const initialState:PositionState ={
  state:"none",
  longitude: null,
  latitude:null,
  sfGrid: null
};

const position =createReducer<PositionState ,PositionAction>(initialState)
.handleType(GET_POSITION_REQUEST, (state)=>({
  ...state,
  state:"loading"
}))
.handleType(GET_POSITION_SUCCESS, (state, action) =>({
  ...action.payload
}))
.handleType(GET_POSITION_FAILURE, ()=>({
  ...initialState,
  state:"error"
}));

export default position ;
