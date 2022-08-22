import "../style/ListOfPlaylists.css";
import React, { useState } from "react";
import { store } from "../redux/Store";
import { connect } from "react-redux";
import { ADD_PLAYLIST_PAGE_PATH } from "../Constants";
import { Link } from "react-router-dom";

import { actionSetPlaylist } from "../redux/actions/playerActions/playerActions";
import { actionAllPlaylists } from "../redux/actions/ActionAllPlaylists";

import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { CardActionArea } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { Triangle } from "react-loader-spinner";

store.dispatch(actionAllPlaylists("[{}]"));

const ActionAreaCard = ({ playlist = {} }) => {
  const { name, description } = playlist;

  return (
    <Card
      className="Playlist-item"
      onClick={() => {
        store.dispatch(actionSetPlaylist(playlist));
      }}
    >
      <CardActionArea>
        <CardMedia
          className="Playlist-cover"
          component="img"
          image="https://www.colorhexa.com/1a76d2.png"
          alt="playlist-cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name || "no name"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ListOfPlaylists = ({ playlists = [], status }) => {
  const [value, setValue] = useState("");

  const filtredPlaylists = playlists.filter((playlist) => {
    return playlist?.name?.toLowerCase()?.includes(value.toLowerCase());
  });
  return status === "PENDING" || !status ? (
    <Triangle color="#1A76D2" height="100" width="100" />
  ) : (
    <Box>
      <Link to={ADD_PLAYLIST_PAGE_PATH}>
        <Button>
          <PlaylistAddIcon />
          <Typography variant="h6">Add Playlist</Typography>
        </Button>
      </Link>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, minWidth: "400px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Search a playlist"
          color="primary"
          focused
          type="text"
          className="search_input"
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
      <Box className="Playlists">
        {filtredPlaylists.map((playlist) => (
          <ActionAreaCard playlist={playlist} key={playlist._id} />
        ))}
      </Box>
    </Box>
  );
};
export const CListOfPlaylists = connect((state) => ({
  playlists: state.promise.allPlaylists.payload,
  status: state.promise.allPlaylists?.status,
}))(ListOfPlaylists);
