import { ThunkAction } from "redux-thunk";
import { getAreaData } from "../api";
import { getPositionAsync } from "./actions";
import { PositionAction, PositionState } from "./types";

export const getPosition =():ThunkAction<void, PositionState,unknown,PositionAction>=>async(dispatch)=>{
  const {request, success, failure}= getPositionAsync ;
  dispatch(request());
  navigator.geolocation.getCurrentPosition(async(pos: GeolocationPosition)=>{
    const latitude =JSON.stringify(pos.coords.latitude) ;
    const longitude =JSON.stringify(pos.coords.longitude);
    const sfGrid = await getAreaData(latitude,longitude);
    if(sfGrid!==null){
      const position :PositionState={
        state:"loading",
        latitude:latitude,
        longitude:longitude,
        sfGrid:sfGrid
      }
      dispatch(success(position));
      
      //getData(sfGrd, longitude,latitude);
    }else{
      const error =new Error (`Can't find sfGrid:{latitude:${latitude}, logitude:${longitude}}`);
      dispatch(failure(error));
    }
      
  },(e)=>{
    const error =new Error (`position error: ${e}`)
    dispatch(failure(error))
  });
};

