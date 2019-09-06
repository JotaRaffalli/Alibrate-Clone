import { combineReducers } from "redux";
import Login from "./Login";
import Library from "./Library";

export default combineReducers({
  login: Login,
  library: Library
});
