import "../style/ListOfTracks.css";
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
import { HOME_PAGE_PATH } from "../Constants";
import isEmpty from "lodash.isempty";

// store.dispatch(actionAllTracks());

const TrackItem = ({ track }) => {
  const { _id, originalFileName } = track;

  return (
    <ListItem className="Tracklist-item" disablePadding>
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
          <Link
            sx={{
              decoration: "none",
            }}
            to={`${HOME_PAGE_PATH}/track/${_id}`}
          >
            {originalFileName}
          </Link>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
const TrackList = ({ tracks = [], selectedID, playlistName }) => {
  useEffect(() => {
    if (selectedID && tracks !== null) {
      console.log("selected ID", selectedID);
      const indexOfTrack = tracks.findIndex(
        (track) => track._id === selectedID
      );
      console.log("index", indexOfTrack);
      store.dispatch(actionSetIndex(indexOfTrack));
    }
  }, [tracks, selectedID]);

  return (
    <Box>
      <Typography variant="h5">{playlistName}</Typography>
      {!isEmpty(tracks) && tracks !== null ? (
        <Box className="Tracklist">
          <List className="Tracklist-list">
            {tracks.map((track) => (
              <TrackItem track={track} key={track._id} />
            ))}
          </List>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export const CTrackList = connect((state) => ({
  tracks: state.player?.playlist?.tracks,
  selectedID: state.promise?.trackByID?.payload?._id,
  playlistName: state.player?.playlist?.name,
}))(TrackList);
