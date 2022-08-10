import "../style/ListOfTracks.css";
import { actionAllTracks } from "../redux/actions/ActionAllTracks";
import { actionTracksFromPlaylist } from "../redux/actions/ActionTracksFromPlaylist";
import { actionTrackByID } from "../redux/actions/ActionTrackByID";
import { store } from "../redux/Store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import {
  actionGetTrack,
  actionSetIndex,
} from "../redux/actions/playerActions/playerActions";
import { Typography } from "@mui/material";

store.dispatch(actionAllTracks());

const TrackItem = ({ track }) => {
  const { _id, originalFileName } = track;

  return (
    <ListItem className="items-list__item" disablePadding>
      <ListItemButton
        onClick={() => {
          store.dispatch(actionTrackByID(_id));
          store.dispatch(actionGetTrack(track));
        }}
      >
        <ListItemIcon>
          <AudiotrackIcon />
        </ListItemIcon>
        <ListItemText>
          <Link to={`/homepage/track/:${_id}`}>{originalFileName}</Link>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
const TrackList = ({ tracks = [], status, selectedID, playlistName }) => {
  useEffect(() => {
    if (selectedID) {
      console.log("selected ID", selectedID);
      const indexOfTrack = tracks.findIndex(
        (track) => track._id === selectedID
      );
      console.log("index", indexOfTrack);
      store.dispatch(actionSetIndex(indexOfTrack));
    }
  }, [tracks, selectedID]);
  return status === "PENDING" || !status ? (
    <>LOADING</>
  ) : (
    <Box className="Tracklist__items" sx={{ width: "100%", maxWidth: 360 }}>
      <Typography variant="h6">{playlistName}</Typography>
      <List className="Tracklist__items-list">
        {tracks.map((track) => (
          <TrackItem track={track} key={track._id} />
        ))}
      </List>
    </Box>
  );
};

export const CTrackList = connect((state) => ({
  tracks: state.promise?.tracksFromPlaylist?.payload?.tracks,
  status: state.promise.allTracks?.status,
  selectedID: state.promise?.trackByID?.payload?._id,
  playlistName: state.promise?.tracksFromPlaylist?.payload?.name,
}))(TrackList);
