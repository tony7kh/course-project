import { connect } from "react-redux";

const Player = () => {
  return (
    <div>
      <h3>Now Playing</h3>
      <p>NAME OF TRACK</p>
      <button>PrevTrack</button>
      <button>Play/Pause</button>
      <button>NextTrack</button>
    </div>
  );
};

export const CPlayer = connect(null,{})(Player)
