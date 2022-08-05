import gql from "../utils/GQL";
import actionPromise from "../actions/ActionPromise";
import store from "../utils/Store";
import { connect } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const actionAllPlaylists = () => {
  const queryPromise = gql(
    `query playlists{
  PlaylistFind(query:"[{}]"){
    _id name description
  }
}`,
    {}
  );
  return actionPromise("allPlaylists", queryPromise);
};

store.dispatch(actionAllPlaylists());


function ActionAreaCard({ playlist: { _id, name, description } }) {
  return (
    <Card  sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="src/img/playlist-cover.png"
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
      <div className="Playlists_list">
        {playlists.map((playlist) => (
          <ActionAreaCard  playlist={playlist} key={playlist._id} />
        ))}
      </div>
    </div>
  );
const CListOfPlaylists = connect((state) => ({
  playlists: state.promise.allPlaylists.payload,
  status: state.promise.allPlaylists?.status,
}))(ListOfPlaylists);

export default CListOfPlaylists;
