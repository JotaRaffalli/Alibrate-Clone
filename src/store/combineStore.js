import { combineReducers } from "redux";
import Login from "./../reducers/Login";
import Library from "./../reducers/Library";

export default combineReducers({
  login: Login,
  library: Library
});
