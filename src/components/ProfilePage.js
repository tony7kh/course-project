import Box from "@mui/material/Box";
import store from "../utils/Store";
import { connect } from "react-redux";
import actionAboutMe from "../actions/ActionAboutMe";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

localStorage.authToken &&
  store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));

function Profile({ user = {} }) {
  return (
    <>
      <MyDropzone />
      <Box sx={{ flexGrow: 1 }}>
        <Typography>{user._id}</Typography>
        <Typography>{user.login}</Typography>
        <Typography>{Date(user.createdAt)}</Typography>
        <Typography></Typography>
      </Box>
    </>
  );
}

const CProfile = connect((state) => ({ user: state.promise.aboutMe.payload }))(
  Profile
);

export default CProfile;
