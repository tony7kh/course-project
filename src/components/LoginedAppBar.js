import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { DriveEtaOutlined } from "@mui/icons-material";
import { connect } from "react-redux";
import { actionAuthLogout } from "../redux/actions/ActionAuthLogout";
import { store } from "../redux/Store";

const CUserName = connect((state) => ({
  children: state.auth.payload?.sub.login || "",
  to: "/profile",
}))(Link);

export const LoginedAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="homepage">Audioplayer</Link>
          </Typography>
          <Typography color="primary" variant="contained">
            <Link to="/profile">
              <CUserName />
            </Link>
          </Typography>
          <Button
            onClick={() => store.dispatch(actionAuthLogout())}
            color="secondary"
            variant="outlined"
          >
            <Link to="/homepage">Log Out</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
