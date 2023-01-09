import { ThunkAction } from "redux-thunk";
import { getAreaData  } from "../api";
import { getPositionAsync } from "./actions";
import { PositionAction, PositionState} from "./types";

export const getPositionThunk =(positionState:PositionState):ThunkAction<void, PositionState,unknown,PositionAction>=>async(dispatch)=>{
  const {request ,success, failure}= getPositionAsync ;
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

