import React, { useState } from "react";
import { connect } from "react-redux";
import { actionFullRegister } from "../redux/actions/ActionFullRegister";
import { HOME_PAGE_PATH } from "../Constants";

import { Box, Card } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const RegisterForm = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 1200 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: "800px",
              mt: 10,
              p: 4,
              boxShadow: 6,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <TextField
                sx={{
                  mt: 1,
                }}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                sx={{
                  mt: 1,
                }}
                label="Repeat password"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <Typography
                sx={{
                  mt: 1,
                }}
              >
                {password.length !== 0
                  ? password.length > 5
                    ? "Good password"
                    : "Password is too short"
                  : "Enter the password"}
              </Typography>
            </Box>
            <Button
              onClick={() => {
                onLogin(login, password);
                setInterval(() => {
                  window.location.href = HOME_PAGE_PATH;
                }, 1);
              }}
              sx={{
                mt: 2,
                height: 30,
              }}
              disabled={
                (login.length > 3 ? false : true) ||
                (password.length > 5 ? false : true) ||
                (password === repeatPassword ? false : true)
              }
              variant="contained"
            >
              <h3>Sign up</h3>
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
const CRegisterForm = connect(null, { onLogin: actionFullRegister })(
  RegisterForm
);

export const RegisterPage = () => {
  return <CRegisterForm />;
};
