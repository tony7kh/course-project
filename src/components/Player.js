import "../style/Player.css";
import { connect } from "react-redux";
import { store } from "../redux/Store";
import {
  actionPause,
  actionPlay,
} from "../redux/actions/playerActions/playerActions";

const Player = ({ track = {} }) => {
  return (
    <div className="Player">
      <div className="Player_title">
        <h3>Now Playing</h3>
        <div>{track.originalFileName}</div>
        <div>{track._id}</div>
        <div>{track.url}</div>
      </div>
      <div className="Player_buttons">
        <button>PrevTrack</button>
        <button onClick={() => store.dispatch(actionPlay())}>Play</button>
        <button onClick={() => store.dispatch(actionPause())}>Pause</button>
        <button>NextTrack</button>
      </div>
    </div>
  );
};

export const CPlayer = connect((state) => ({
  track: state.promise?.trackByID?.payload,
}))(Player);
