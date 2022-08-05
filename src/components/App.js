import "../style/App.css";
import React from "react"; // , { useState, useEffect }
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  Provider,
  // , connect
} from "react-redux";
import {
  Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import ButtonAppBar from "./AppBar";
import MenuAppBar from "./LoginedAppBar";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";

import store from "../utils/Store";

const history = createBrowserHistory();

console.log(history);

// const Header = () => (
//   <div>
//     <CUserName />
//     <CLogout />
//   </div>
// );

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      {localStorage.authToken ? <MenuAppBar /> : <ButtonAppBar />}
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/homepage" component={HomePage} />
      </Switch>
    </Provider>
  </Router>
);

export default App;
