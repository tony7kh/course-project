import "../style/ListOfPlaylists.css";
import React from "react";
import { store } from "../redux/Store";
import { connect } from "react-redux";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { actionSetPlaylist } from "../redux/actions/playerActions/playerActions";

import { actionAllPlaylists } from "../redux/actions/ActionAllPlaylists";

import { Triangle } from "react-loader-spinner";
import { ADD_PLAYLIST_PAGE_PATH } from "../Constants";

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

const ListOfPlaylists = ({ playlists = [], status }) =>
  status === "PENDING" || !status ? (
    <Triangle color="#1A76D2" height="100" width="1 00" />
  ) : (
    <Box>
      <Link to={ADD_PLAYLIST_PAGE_PATH}>
        <Button>
          <PlaylistAddIcon />
          <Typography variant="h6">Add Playlist</Typography>
        </Button>
      </Link>
      <Box className="Playlists">
        {playlists.map((playlist) => (
          <ActionAreaCard playlist={playlist} key={playlist._id} />
        ))}
      </Box>
    </Box>
  );
export const CListOfPlaylists = connect((state) => ({
  playlists: state.promise.allPlaylists.payload,
  status: state.promise.allPlaylists?.status,
}))(ListOfPlaylists);
