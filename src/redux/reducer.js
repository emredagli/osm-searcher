import { combineReducers } from "redux";
import mapReducer from "./reducer-map";
import searchReducer from "./reducer-search";
import appReducer from "./reducer-app";

const rootReducer = combineReducers({
  app: appReducer,
  map: mapReducer,
  search: searchReducer,
});

export default rootReducer;


