import { createStore, applyMiddleware } from "redux";
import combinedReducers from "../reducers";
import thunk from "redux-thunk";
import actionAuthLogin from "../actions/ActionAuthLogin";


const store = createStore(combinedReducers, applyMiddleware(thunk));
if (localStorage.authToken) {
  store.dispatch(actionAuthLogin(localStorage.authToken));
}
store.subscribe(() => console.log(store.getState()));

export default store;
