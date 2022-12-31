import { combineReducers } from "redux";
import weather from './actions';

export type RootState =ReturnType<typeof rootReducer>;

const rootReducer =combineReducers({weather});

export default rootReducer;