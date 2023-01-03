import { ThunkAction } from "redux-thunk";
import { getWeatherData } from "../api";
import { PositionState } from "../position/types";
import { getWeatherAsync} from "./actions";
import { WeatherAction, WeatherState } from "./types";


export const getWeatherThunk =(position:PositionState):ThunkAction<void,WeatherState, unknown,WeatherAction>=>async(dispatch)=>{
  const {request,success,failure}=getWeatherAsync;
  const {longitude, latitude, sfGrid}=position;
  dispatch(request());
  if(sfGrid !==null && latitude !==null && longitude !==null){
    // weatherState 이거나 error message 를 담은 string 
    const data = await getWeatherData(sfGrid,longitude,latitude);
    if(typeof data === "string"){
      const error = new Error (`[Error : weather data]:${data}`);
      dispatch(failure(error));
    }else{
      dispatch(success(data));
    }
  }else{
    const error =new Error(`[Error] Is longitude null? ${longitude ===null} //   Is latitude null? ${latitude ===null} //   Is sfGrid null? ${sfGrid ===null} //  `);
    dispatch(failure(error)) ; 
  }
  
}