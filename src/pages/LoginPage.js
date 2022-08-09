import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { actionFullLogin } from "../redux/actions/ActionFullLogin";

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="LoginForm">
      <input
        type="text"
        value={login}
        placeholder="Введите логин"
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Введите пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        {password.length !== 0
          ? password.length > 5
            ? "Good password"
            : "Password is too short"
          : "Enter the password"}
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

export const LoginPage = () => {
  return <CLoginForm />;
};
