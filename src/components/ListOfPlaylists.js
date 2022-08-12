import "../style/ListOfPlaylists.css";
import React from "react";
import { store } from "../redux/Store";
import { connect } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { actionAllPlaylists } from "../redux/actions/ActionAllPlaylists";
import { actionTracksFromPlaylist } from "../redux/actions/ActionTracksFromPlaylist";

import { Triangle } from "react-loader-spinner";


store.dispatch(actionAllPlaylists("[{}]"));

const ActionAreaCard = ({ playlist: { _id, name, description } }) => {
  return (
    <Card onClick={() => store.dispatch(actionTracksFromPlaylist(_id))}>
      <CardActionArea>
        <CardMedia
          className="Playlist-item"
          component="img"
          image="https://img.freepik.com/free-vector/musical-notes-pattern-on-black-background_1017-32303.jpg?w=2000&t=st=1659974772~exp=1659975372~hmac=d023aca47a64bad02c6dcb61f7557f22e788632df6eae440ff32615068104cbe"
          alt="playlist-cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {!name ? "no name" : name}
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
    <Triangle color="#00BFFF" height={80} width={80} />
  ) : (
    <div className="Playlists">
      {playlists.map((playlist) => (
        <ActionAreaCard playlist={playlist} key={playlist._id} />
      ))}
    </div>
  );
export const CListOfPlaylists = connect((state) => ({
  playlists: state.promise.allPlaylists.payload,
  status: state.promise.allPlaylists?.status,
}))(ListOfPlaylists);
