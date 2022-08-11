import "../style/Player.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { store } from "../redux/Store";
import {
  actionPause,
  actionPlay,
  actionPrevTrack,
  actionNextTrack,
  actionSetVolume,
} from "../redux/actions/playerActions/playerActions";
import { URL } from "../Constants";
import { isEmpty } from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

const Player = ({ track = {}, tracksFromPlaylist = [], trackCurrentIndex }) => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [duration, setDuration] = useState("00:00");
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [volume, setVolume] = useState(100);
  let audioRef;
  let sliderRef;

  useEffect(() => {
    if (trackCurrentIndex > -1) {
      const trackFromPlaylist =
        tracksFromPlaylist[new Number(trackCurrentIndex)];
      setCurrentTrack(trackFromPlaylist);
    }
  }, [tracksFromPlaylist, trackCurrentIndex]);

  useEffect(() => {
    if (!isEmpty(tracksFromPlaylist)) {
      const index = tracksFromPlaylist.indexOf(currentTrack);
      if (index === 0) {
        setPrevButtonDisabled(true);
      } else {
        setPrevButtonDisabled(false);
      }
      if (index === tracksFromPlaylist.length - 1) {
        setNextButtonDisabled(true);
      } else {
        setNextButtonDisabled(false);
      }
    }
  }, [tracksFromPlaylist, currentTrack]);

  useEffect(() => {
    if (!isEmpty(currentTrack)) {
      audioRef.src = URL + currentTrack.url;
      audioRef.play();
    }
  }, [currentTrack]);

  const calcTrackLength = (s) => {
    const minutes = Math.floor(s / 60);
    const seconds = Math.floor(s % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const onTimeUpdate = () => {
    setSliderValue(Math.floor(audioRef.currentTime));
    setCurrentTime(calcTrackLength(sliderRef.value));
  };

  const onLoadMetadata = () => {
    setDuration(calcTrackLength(audioRef.duration));
    setSliderMax();
  };

  const setSliderMax = () => {
    sliderRef.max = Math.floor(audioRef.duration);
  };

  const onSliderInput = () => {
    setCurrentTime(calcTrackLength(sliderRef.value));
  };

  const onSliderChange = () => {
    audioRef.currentTime = sliderRef.value;
  };

  const playAudio = () => {
    audioRef.play();
    store.dispatch(actionPlay());
  };
  const pauseAudio = () => {
    audioRef.pause();
    store.dispatch(actionPause());
  };
  const prevTrack = () => {
    audioRef.pause();
    audioRef.removeAttribute("src");
    store.dispatch(actionPrevTrack());
  };

  const nextTrack = () => {
    audioRef.pause();
    audioRef.removeAttribute("src");
    store.dispatch(actionNextTrack());
  };

  const onVolumeChange = (event) => {
    const volume = event.target.value;
    setVolume(volume);
    audioRef.volume = volume / 100;
    store.dispatch(actionSetVolume(volume));
  };
  const toggleMute = (event) => {
    const volume = audioRef.volume;
    volume > 0 ? (audioRef.volume = 0) : (audioRef.volume = volume);
  };
  return (
    <Box className="Player">
      <Box>
        {" "}
        <input
          ref={(e) => {
            sliderRef = e;
          }}
          onInput={onSliderInput}
          onChange={onSliderChange}
          className="Player_progress_bar"
          type="range"
          max="100"
          value={sliderValue}
        />
      </Box>
      {!isEmpty(currentTrack) ? (
        <>
          <audio
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadMetadata}
            ref={(e) => {
              audioRef = e;
            }}
            src={URL + currentTrack.url}
          ></audio>
        </>
      ) : (
        "Please, choose a track"
      )}
      <Box className="Player_title">
        {currentTime} / {duration.toString()}
        <Typography variant="h3" component="div">
          {currentTrack.originalFileName}
        </Typography>
      </Box>

      <Box className="Player_buttons">
        <Button onClick={() => prevTrack()} disabled={isPrevButtonDisabled}>
          PrevTrack
        </Button>
        <Button onClick={() => playAudio()}>Play</Button>
        <Button onClick={() => pauseAudio()}>Pause</Button>
        <Button onClick={() => nextTrack()} disabled={isNextButtonDisabled}>
          NextTrack
        </Button>
        <VolumeDown />
        <Slider
          className="Player_volume_slider"
          onChange={onVolumeChange}
          type="range"
          max="100"
          value={volume}
        />
        <VolumeUp />
        <Button onClick={toggleMute}>Mute</Button>
      </Box>
    </Box>
  );
};

export const CPlayer = connect((state) => ({
  track: state.promise?.trackByID?.payload,
  tracksFromPlaylist: state.promise?.tracksFromPlaylist?.payload?.tracks,
  trackCurrentIndex: state.player?.trackIndex,
}))(Player);
