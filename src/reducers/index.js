import jwtDecode from "../utils/JWTDecode";
import { combineReducers } from "redux";

function promiseReducer(state, { type, status, name, payload, error }) {
  if (state === undefined) {
    return {};
  }
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

function authReducer(state = {}, { type, token }) {
  if (type === "AUTH_LOGIN") {
    const payload = jwtDecode(token);
    if (payload) return { token, payload };
  }
  if (type === "AUTH_LOGOUT") {
    return {};
  }
  return state;
}

const combinedReducers = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
});

export default combinedReducers;
