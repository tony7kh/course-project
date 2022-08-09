import "../style/Player.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { store } from "../redux/Store";
import {
  actionPause,
  actionPlay,
  actionPrevTrack,
  actionNextTrack,
} from "../redux/actions/playerActions/playerActions";
import URL from "../Constants";
import { isEmpty } from "lodash";

const Player = ({ track = {}, tracksFromPlaylist, trackCurrentIndex }) => {
  const [currentTrack, setCurrentTrack] = useState({});
  useEffect(() => {
    if (trackCurrentIndex > -1) {
      const test = tracksFromPlaylist[new Number(trackCurrentIndex)];
      setCurrentTrack(test);
    }
  }, [tracksFromPlaylist, trackCurrentIndex]);

  let myAudio = new Audio();
  myAudio.src = URL + currentTrack.url;

  const playAudio = () => {
    myAudio.play();
    store.dispatch(actionPlay());
  };
  const pauseAudio = () => {
    myAudio.pause();
    store.dispatch(actionPlay());
  };
  const prevTrack = () => {
    store.dispatch(actionPrevTrack());
  };

  const nextTrack = () => {
    store.dispatch(actionNextTrack());
  };
  console.log(track);

  return (
    <div className="Player">
      {!isEmpty(currentTrack) ? (
        <audio src={URL + currentTrack.url}></audio>
      ) : (
        "LOADING"
      )}
      <div className="Player_title">
        <h3>Now Playing</h3>
        <div>{currentTrack.originalFileName}</div>
      </div>
      <div className="Player_buttons">
        <button onClick={() => prevTrack()}>PrevTrack</button>
        <button onClick={() => playAudio()}>Play</button>
        <button onClick={() => pauseAudio()}>Pause</button>
        <button onClick={() => nextTrack()}>NextTrack</button>
      </div>
    </div>
  );
};

export const CPlayer = connect((state) => ({
  track: state.promise?.trackByID?.payload,
  tracksFromPlaylist: state.promise?.tracksFromPlaylist?.payload?.tracks,
  trackCurrentIndex: state.player?.trackIndex,
}))(Player);
