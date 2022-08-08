import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../redux/Store";
import { actionAllTracks } from "../redux/actions/ActionAllTracks";
import {
  Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";

store.dispatch(actionAllTracks());
const pageURL = "example-page-for-vanya/";
const Track = ({ track: { _id, originalFileName } }) => (
  <li>
    <Link to={_id}>{originalFileName}</Link>
  </li>
);

const ListOfTracks = ({ tracks = [] }) => (
  <ul>
    {tracks.map((track) => (
      <Track track={track} key={track._id} />
    ))}
  </ul>
);

const CListOfTrack = connect((state) => ({
  tracks: state.promise.allTracks.payload,
}))(ListOfTracks);

export const ExamplePageForVanya = () => <CListOfTrack />;
