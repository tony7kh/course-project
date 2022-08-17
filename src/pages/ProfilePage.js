import React, { useEffect } from "react";

import { store } from "../redux/Store";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { actionAboutMe } from "../redux/actions/ActionAboutMe";
import { isEmpty } from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { CHANGE_AVATAR_PAGE_PATH, URL } from "../Constants";
import { Triangle } from "react-loader-spinner";

localStorage.authToken &&
  store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));

const Profile = ({ user = {} }) => {
  useEffect(() => {
    store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!isEmpty(user) ? (
        <>
          <Link to={CHANGE_AVATAR_PAGE_PATH}>
            <EditIcon color="primary" />
          </Link>
          {user.avatar ? (
            <Avatar
              sx={{ width: 200, height: 200 }}
              alt={user.login}
              src={URL + user.avatar?.url}
            />
          ) : (
            <Typography>"Тут может быть ваше фото"</Typography>
          )}
          {/* <Typography>{user.avatar || "Тут может быть ваше фото"}</Typography> */}
          <Typography color={"primary"} variant="h3">
            {user.login}
          </Typography>
          <Typography color={"primary"} variant="h6">
            ID:{user._id}
          </Typography>
        </>
      ) : (
        <Triangle color="#1A76D2" height="100" width="100" />
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
