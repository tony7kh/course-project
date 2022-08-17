import "./style/App.css";
import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { DefaultAppBar } from "./components/DefaultAppBar";
import { LoginedAppBar } from "./components/LoginedAppBar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { store } from "./redux/Store";
import {
  LOGIN_PAGE_PATH,
  REGISTER_PAGE_PATH,
  PROFILE_PAGE_PATH,
  HOME_PAGE_PATH,
  PUBLIC_PAGE_PATH,
  ADD_PLAYLIST_PAGE_PATH,
  CHANGE_AVATAR_PAGE_PATH,
} from "./Constants";
import { PublicPage } from "./pages/PublicPage";
import { AddPlaylistPage } from "./pages/AddPlaylistPage";
import { ChangeAvatarPage } from "./pages/ChangeAvatarPage";

const history = createBrowserHistory();

console.log(history);

const pages = [
  {
    path: LOGIN_PAGE_PATH,
    Component: LoginPage,
  },
  {
    path: REGISTER_PAGE_PATH,
    Component: RegisterPage,
  },
  {
    path: PROFILE_PAGE_PATH,
    Component: ProfilePage,
  },
  {
    path: HOME_PAGE_PATH,
    Component: HomePage,
  },
  {
    path: PUBLIC_PAGE_PATH,
    Component: PublicPage,
  },
  {
    path: ADD_PLAYLIST_PAGE_PATH,
    Component: AddPlaylistPage,
  },
  { path: CHANGE_AVATAR_PAGE_PATH, 
    Component: ChangeAvatarPage },
];

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      {localStorage.authToken ? <LoginedAppBar /> : <DefaultAppBar />}
      <div className="Wrapper">
        <Switch>
          {pages.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
        </Switch>
      </div>
    </Provider>
  </Router>
);

export default App;
