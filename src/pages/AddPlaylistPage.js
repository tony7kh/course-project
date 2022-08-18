import React, { useEffect, useState } from "react";

import Drop from "../utils/DropZoneForTracks";
import { gql } from "../utils/GQL";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Card } from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";

const actionUploadTrack = async (file) => {
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
const UploadBox = ({ defaultTracks = [] }) => {
  const [tracks, ChangeTracks] = useState(defaultTracks);
  const [tracksIds, ChangeTracksIds] = useState(defaultTracks);

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
          variant="standard"
          placeholder="Playlist description"
          onChange={(e) =>
            ChangeDescription((description) => (description = e.target.value))
          }
          value={description}
        />
        <Drop
          trackData={(track) => {
            ChangeTracks((prevArray) =>
              prevArray.concat(
                track.map((img) => {
                  return { url: `${URL}${img.url}` };
                })
              )
            );
            ChangeTracksIds((prevArray) =>
              prevArray.concat(
                track.map((img) => {
                  return { _id: img._id };
                })
              )
            );
          }}
          onUpload={actionUploadTrack}
        />
        <div style={{ display: "flex" }}>
          {Array.isArray(tracks)
            ? tracks.map((track) => (
                <CardMedia key={track.url} track={track.url}>
                  <LibraryMusicIcon />
                </CardMedia>
              ))
            : ""}
        </div>
        <Button
          onClick={() => {
            tracks.length = 0
              ? actionNewPlaylist(name, description)
              : actionNewPlaylistWithTracks(name, description, tracksIds);
          }}
          disabled={name.length < 5}
        >
          <h3>Add playlist</h3>
        </Button>
      </form>
    </Card>
  );
};

export const AddPlaylistPage = () => {
  return <UploadBox />;
};
