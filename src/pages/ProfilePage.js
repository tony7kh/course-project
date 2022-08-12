import Box from "@mui/material/Box";
import { store } from "../redux/Store";
import { connect } from "react-redux";
import { actionAboutMe } from "../redux/actions/ActionAboutMe";
import Typography from "@mui/material/Typography";
import React from "react";
import { isEmpty } from "lodash";

import Drop from "../utils/DropZone";
import { gql } from "../utils/GQL";
import { Card } from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState, useSyncExternalStore } from "react";
import {HOME_PAGE_PATH} from "../Constants"

localStorage.authToken &&
  store.dispatch(actionAboutMe(store.getState().auth.payload.sub.id));

const actionUnloadFile = async (file) => {
  const uploadFile = async (file) => {
    const url = `http://player.node.ed.asmer.org.ua/track`;
    let formData = await new FormData();
    formData.append("track", file);
    return fetch(url, {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };
  return await Promise.all(file.map((file) => uploadFile(file))).then(
    (values) => {
      return values;
    }
  );
};

const actionNewPlaylist = async (name, description) => {
  const gqlQuery = `mutation newPlaylist($name:String, $description:String){
        PlaylistUpsert(playlist:{name: $name, description : $description}){
            _id, name, description
        }
    }`;
  const gqlPromise = gql(gqlQuery, { name, description });
  const action = await gqlPromise;
  return action;
};

const actionNewPlaylistWithTracks = async (name, description, tracks) => {
  const gqlQuery = `mutation newPlaylist($name:String, $description:String, $tracks:[TrackInput]){
        PlaylistUpsert(playlist:{name: $name, description :$description, tracks: $tracks }){
            _id, name, description tracks{url}
        }
    }`;
  const gqlPromise = gql(gqlQuery, { name, description, tracks });
  const action = await gqlPromise;
  return action;
};
const UploadBlock = ({
  _id,
  defaultImaages = [],
  valueOfLoadingPicture,
  actionBackToStart,
}) => {
  const [tracks, ChangeTracks] = useState(defaultImaages);
  const [tracksIds, ChangeTracksIds] = useState(defaultImaages);

  const [name, ChangeName] = useState("");
  const [description, ChangeDescription] = useState("");

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  return (
    <Card sx={{ textAlign: "left", padding: "40px", marginBottom: "20px" }}>
      <form>
        <Input
          sx={{ width: "100%", marginBottom: "10px" }}
          placeholder="Name"
          onChange={(e) => ChangeName((name) => (name = e.target.value))}
          value={name}
        />
        <TextField
          sx={{ width: "100%", margin: "20px 0" }}
          id="standard-multiline-static"
          multiline
          rows={3}
          variant="standard"
          placeholder="Playlist description"
          onChange={(e) =>
            ChangeDescription((description) => (description = e.target.value))
          }
          value={description}
        />
        <Drop
          imageData={(image) => {
            console.log("!!!!!", image);
            ChangeTracks((prevArray) =>
              prevArray.concat(
                image.map((img) => {
                  return { url: `${URL}${img.url}` };
                })
              )
            );
            ChangeTracksIds((prevArray) =>
              prevArray.concat(
                image.map((img) => {
                  return { _id: img._id };
                })
              )
            );
          }}
          onUpload={actionUnloadFile}
        />
        <div style={{ display: "flex" }}>
          {Array.isArray(tracks)
            ? tracks.map((image, index) => (
                <CardMedia
                  // onClick={ChangeImagesIds(images => images.filter())}
                  component="img"
                  height="50px"
                  width="50px"
                  image={image.url}
                  sx={{ width: "10%" }}
                />
              ))
            : ""}
        </div>
        {/* Select images: {images.length}{console.log('imagesssss',images, imagesIds)} */}
        {/* <Button onClick={()=>{}}><h3>Drop to start values</h3></Button> */}
        <Button
          onClick={() => {
            tracks.length = 0
              ? actionNewPlaylist(name, description)
              : actionNewPlaylistWithTracks(name, description, tracksIds);
            ;
          }}
        >
          <h3>Add playlist</h3>
        </Button>
      </form>
    </Card>
  );
};

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
      <UploadBlock />
      <CProfile />
    </div>
  );
};
