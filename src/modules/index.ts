import { combineReducers } from "redux";
import weather from './weather/reducer';
import position from './position/reducer';

export type RootState =ReturnType<typeof rootReducer>;

const rootReducer =combineReducers({position, weather});

export default rootReducer;