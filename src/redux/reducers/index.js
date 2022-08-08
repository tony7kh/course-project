import { combineReducers } from "redux";
import { promiseReducer } from "./promiseReducer";
import { authReducer } from "./authReducer";
import { playerReducer } from "./playerReducer";

export const combinedReducers = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
  player : playerReducer
});

