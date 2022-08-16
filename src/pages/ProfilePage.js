import React from "react";

import { store } from "../redux/Store";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { actionAboutMe } from "../redux/actions/ActionAboutMe";
import { isEmpty } from "lodash";

localStorage.authToken &&
  store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));

const Profile = ({ user = {} }) => {
  console.log(user.avatar);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!isEmpty(user) ? (
        <>
          <Typography>{user.avatar || "Тут может быть ваше фото"}</Typography>
          <Typography variant="h3">{user.login}</Typography>
          <Typography variant="h6">ID:{user._id}</Typography>
        </>
      ) : (
        "LOADING"
      )}
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
