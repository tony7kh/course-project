import Box from "@mui/material/Box";
import { store } from "../redux/Store";
import { connect } from "react-redux";
import { actionAboutMe } from "../redux/actions/ActionAboutMe";
import Typography from "@mui/material/Typography";
import React from "react";
import { isEmpty } from "lodash";


localStorage.authToken &&
  store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));

const Profile = ({ user = {} }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>

      {!isEmpty(user) ? (
        <>
          <Typography>{user._id}</Typography>
          <Typography>{user.login}</Typography>
          <Typography>{Date(user.createdAt)}</Typography>
          <Typography></Typography>
        </>
      ): "LOADING"}
    </Box>
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
