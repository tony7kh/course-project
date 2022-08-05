import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actionFullRegister from "../actions/ActionFullRegister";

const RegisterForm = ({ onLogin }) => {
  const [login, setLogin] = useState("login");
  const [password, setPassword] = useState("password");
  const [repeatPassword, setRepeatPassword] = useState("repeat password");
  return (
    <div className="RegisterForm">
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
      <input
        type="password"
        placeholder={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <div>
        {password.length > 5 ? "Good password" : "Password is too short"}
      </div>
      <button
        onClick={() => onLogin(login, password)}
        disabled={
          (login.length > 3 ? false : true) ||
          (password.length > 5 ? false : true) ||
          (password === repeatPassword ? false : true)
        }
      >
        Sign Up
      </button>
    </div>
  );
};

const CRegisterForm = connect(null, { onLogin: actionFullRegister })(
  RegisterForm
);

export default CRegisterForm;
