import { createStore, applyMiddleware } from "redux";
import {combinedReducers} from "../redux/reducers";
import thunk from "redux-thunk";
import {actionAuthLogin} from "../redux/actions/ActionAuthLogin";

export const store = createStore(combinedReducers, applyMiddleware(thunk));
if (localStorage.authToken) {
  store.dispatch(actionAuthLogin(localStorage.authToken));
}


store.subscribe(() => console.log(store.getState()));
