import "../style/Player.css";
import { connect } from "react-redux";

const Player = () => {
  return (
    <div className="Player">
      <div className="Player_title">
        <h3>Now Playing</h3>
        <p>NAME OF TRACK</p>
      </div>
      <div className="Player_buttons">
        <button>PrevTrack</button>
        <button>Play/Pause</button>
        <button>NextTrack</button>
      </div>
    </div>
  );
};

export const CPlayer = connect(null, {})(Player);
