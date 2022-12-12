import { combineReducers } from "redux";
import weather from './weather';

export type RootState =ReturnType<typeof rootReducer>;

const rootReducer =combineReducers({weather});

export default rootReducer;