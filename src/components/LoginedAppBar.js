import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionAuthLogout } from "../redux/actions/ActionAuthLogout";
import { store } from "../redux/Store";
import {
  HOME_PAGE_PATH,
  PUBLIC_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "../Constants";

const CUserName = connect((state) => ({
  children: state.auth.payload?.sub.login || "",
  to: PROFILE_PAGE_PATH,
}))(Link);

export const LoginedAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={HOME_PAGE_PATH}>Audioplayer</Link>
          </Typography>
          <Typography color="primary" variant="contained">
            <Link to={PROFILE_PAGE_PATH}>
              <CUserName />
            </Link>
          </Typography>
          <Button
            onClick={() => {
              store.dispatch(actionAuthLogout());
              window.location.replace("/");
            }}
            color="primary"
            variant="outlined"
            sx={{
              ml: 2,
            }}
          >
            <Link to={PUBLIC_PAGE_PATH}>Log Out</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
