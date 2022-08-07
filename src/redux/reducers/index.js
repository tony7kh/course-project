import { combineReducers } from "redux";
import { promiseReducer } from "./promiseReducer";
import { authReducer } from "./authReducer";

export const combinedReducers = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
});

