import "./style/App.css";
import React from "react";
import { Provider } from "react-redux";
import {
  Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { DefaultAppBar } from "./components/DefaultAppBar";
import { LoginedAppBar } from "./components/LoginedAppBar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { store } from "./redux/Store";

const history = createBrowserHistory();

console.log(history);

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      {localStorage.authToken ? <LoginedAppBar /> : <DefaultAppBar />}
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
