import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {actionFullLogin} from "../redux/actions/ActionFullLogin";

export const LoginPage = () => {
  const LoginForm = ({ onLogin }) => {
    const [login, setLogin] = useState("login");
    const [password, setPassword] = useState("password");
    return (
      <div className="LoginForm">
        <input
          type="text"
          placeholder={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          {password.length > 5 ? "Good password" : "Password is too short"}
        </div>
        <button
          onClick={() => onLogin(login, password)}
          disabled={
            (login.length > 3 ? false : true) ||
            (password.length > 5 ? false : true)
          }
        >
          Log In
        </button>
      </div>
    );
  };
  const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm);
  return (
    <div>
      <CLoginForm />
    </div>
  );
};
