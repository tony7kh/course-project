import "../style/ListOfTracks.css";
import {actionAllTracks} from "../redux/actions/ActionAllTracks"
import {store} from "../redux/Store";
import { connect } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

store.dispatch(actionAllTracks());

const TrackItem = ({ track: { _id, originalFileName } }) => (
  <ListItem className="items-list__item" disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <AudiotrackIcon />
      </ListItemIcon>
      <ListItemText>{originalFileName}</ListItemText>
    </ListItemButton>
  </ListItem>
);
const TrackList = ({ tracks = [], status }) =>
  status === "PENDING" || !status ? (
    <>LOADING</>
  ) : (
    <Box
      className="Tracklist__items"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <List className="Tracklist__items-list">
        {tracks.map((track) => (
          <TrackItem track={track} key={track._id} />
        ))}
      </List>
    </Box>
  );

export const CTrackList = connect((state) => ({
  tracks: state.promise.allTracks.payload,
  status: state.promise.allTracks?.status,
}))(TrackList);
