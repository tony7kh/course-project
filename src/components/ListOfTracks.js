import actionAllTracks from "../actions/ActionAllTracks";
import store from "../utils/Store";
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

const LeftMenuTrack = ({ track: { _id, originalFileName } }) => (
  <ListItem className="items-list__item" disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <AudiotrackIcon />
      </ListItemIcon>
      <ListItemText>{originalFileName}</ListItemText>
    </ListItemButton>
  </ListItem>
);
const LeftMenu = ({ tracks = [], status }) =>
  status === "PENDING" || !status ? (
    <>LOADING</>
  ) : (
    <Box
      className="LeftMenu"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <List className="LeftMenu__items-list">
        {tracks.map((track) => (
          <LeftMenuTrack track={track} key={track._id} />
        ))}
      </List>
    </Box>
  );

const CLeftMenu = connect((state) => ({
  tracks: state.promise.allTracks.payload,
  status: state.promise.allTracks?.status,
}))(LeftMenu);

export default CLeftMenu;
