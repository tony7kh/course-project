import Box from "@mui/material/Box";
import {store} from "../redux/Store";
import { connect } from "react-redux";
import {actionAboutMe} from "../redux/actions/ActionAboutMe";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";

const Profile = ({ user = {} }) => {
  localStorage.authToken &&
    store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>{user._id}</Typography>
        <Typography>{user.login}</Typography>
        <Typography>{Date(user.createdAt)}</Typography>
        <Typography></Typography>
      </Box>
    </>
  );
};
const CProfile = connect((state) => ({
  user: state.promise.aboutMe.payload,
}))(Profile);

export const ProfilePage = () => {
  return (
    <div>
      <CProfile />
    </div>
  );
};
