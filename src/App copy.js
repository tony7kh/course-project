import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import {
  Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import ButtonAppBar from "./components/AppBar";
import LoginForm from "./components/LoginPage";
import RegisterForm from "./components/RegisterPage";
import HomePage from "./components/HomePage";

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

const actionPending = (name) => ({ type: "PROMISE", status: "PENDING", name });
const actionFulfilled = (name, payload) => ({
  type: "PROMISE",
  status: "FULFILLED",
  name,
  payload,
});
const actionRejected = (name, error) => ({
  type: "PROMISE",
  status: "REJECTED",
  name,
  error,
});

const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    let payload = await promise;
    dispatch(actionFulfilled(name, payload));
    return payload;
  } catch (err) {
    dispatch(actionRejected(name, err));
  }
};

const getGQL =
  (url) =>
  (query, variables = {}) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {}),
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          return Object.values(data.data)[0];
        } else throw new Error(JSON.stringify(data.errors));
      });

const URL = `http://player.node.ed.asmer.org.ua/`;

const gql = getGQL(`${URL}graphql`);

function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {}
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

const actionAuthLogin = (token) => (dispatch, getState) => {
  //попытаться отправить в редьюсер AUTH_LOGIN
  const oldState = getState().auth;
  dispatch({ type: "AUTH_LOGIN", token });
  const newState = getState().auth;
  //посмотреть, редьюсеру token зашел или нет
  //если зашел - сохранить токен в localStorage
  if (newState !== oldState) {
    localStorage.authToken = token;
  }
};

const actionAuthLogout = () => (dispatch) => {
  dispatch({ type: "AUTH_LOGOUT" });
  localStorage.removeItem("authToken");
};

const actionFullLogin = (login, password) => async (dispatch) => {
  //тут надо задиспатчить промис логина
  const gqlQuery = `query log($login:String!, $password:String!){
                          login(login:$login, password:$password)
                      }`;
  const gqlPromise = gql(gqlQuery, { login, password });
  const action = actionPromise("login", gqlPromise);
  console.log("ща будет PENDING");
  const result = await dispatch(action); //тут мы получаем токен
  console.log("ща был FULFILLED");

  dispatch(actionAuthLogin(result));
  console.log("ТОКА ШО ОТДАЛ В AUTH REDUCER");
};

const actionFullRegister = (login, password) => async (dispatch) => {
  const gqlQuery = `mutation register($login:String!, $password:String!){
      createUser(login: $login, password: $password){
        _id login
      }
    }`;
  const gqlPromise = gql(gqlQuery, { login, password });
  const action = actionPromise("register", gqlPromise);
  console.log("ща будет PENDING");
  const result = await dispatch(action);
  console.log("result==>", result);
  if (result) await dispatch(actionFullLogin(login, password));
};

const combinedReducers = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));
if (localStorage.authToken) {
  store.dispatch(actionAuthLogin(localStorage.authToken));
}
store.subscribe(() => console.log(store.getState()));

const history = createBrowserHistory();

console.log(history);

const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm);
const CRegisterForm = connect(null, { onLogin: actionFullRegister })(
  RegisterForm
);

const actionAllTracks = () => {
  const queryPromise = gql(
    `query tracks{
  TrackFind(query:"[{}]"){
    _id url originalFileName
  }
}`,
    {}
  );
  return actionPromise("allTracks", queryPromise);
};

store.dispatch(actionAllTracks());


const LeftMenuTrack = ({ track: [{ _id, originalFileName }] }) =>
  <li className="items-list__item">{originalFileName}</li>
;

// const LeftMenu = ({ tracks = [], status }) =>
//   status === "PENDING" || !status ? (
//     <>LOADING</>
//   ) : (
//     <aside className="LeftMenu">
//       <ul className="LeftMenu__items-list">
//         {tracks.map((track) => (
//           <LeftMenuTrack track={track} key={track._id} />
//         ))}
//       </ul>
//     </aside>
//   );

const LeftMenu = ({tracks = [], status}) =>{
  return (
    <div>
      <ul>
        {tracks.map((track) => (
          <LeftMenuTrack track={track} key={track._id} />
        ))}
      </ul>
    </div>
  );
}


const CLeftMenu = connect((state) => ({
  tracks: state.allTracks?.payload,
  status: state.allTracks?.status,
}))(LeftMenu);

const CUserName = connect((state) => ({
  children: state.auth.payload?.sub.login || "anon",
  to: "/dashboard",
}))(Link);
const CLogout = connect(
  (state) => ({ children: "Logout", disabled: !state.auth.token }),
  { onClick: actionAuthLogout }
)("button");

const Header = () => (
  <div>
    <CUserName />
    <CLogout />
  </div>
);

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <ButtonAppBar />
      {/* <ResponsiveAppBar /> */}
      <CLeftMenu />
      <Switch>
        <Route path="/login" component={CLoginForm} />
        <Route path="/signup" component={CRegisterForm} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Provider>
  </Router>
);

export default App;
