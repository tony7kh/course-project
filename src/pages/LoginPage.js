import React, { useState } from "react";
import { connect } from "react-redux";
import { actionFullLogin } from "../redux/actions/ActionFullLogin";

import { Box, Card } from "@mui/material";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
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
                id="outlined-helperText"
                label="Login"
                helperText=" "
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography>
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
              }}
              disabled={
                (login.length > 3 ? false : true) ||
                (password.length > 5 ? false : true)
              }
              sx={{
                mt: 4,
                height: 40,
              }}
              variant="contained"
            >
              Log In
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm);

export const LoginPage = () => {
  return <CLoginForm />;
};
