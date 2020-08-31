import { combineReducers } from "redux";
import { mainReducer } from "redux/main/reducers";

export default combineReducers({
  main: mainReducer,
});
