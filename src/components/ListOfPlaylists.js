import "../style/ListOfPlaylists.css";
import { store } from "../redux/Store";
import { connect } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { actionAllPlaylists } from "../redux/actions/ActionAllPlaylists";

store.dispatch(actionAllPlaylists());

function ActionAreaCard({ playlist: { _id, name, description } }) {
  return (
    <Card onClick={(e) => console.log("кликнул на плейлист", {_id})}>
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
}

const ListOfPlaylists = ({ playlists = [], status }) =>
  status === "PENDING" || !status ? (
    <>LOADING</>
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
