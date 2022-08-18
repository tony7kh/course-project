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
  actionSetDuration,
  actionSetCurrentTime,
} from "../redux/actions/playerActions/playerActions";
import { URL } from "../Constants";
import { isEmpty } from "lodash";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const Player = ({ track = {}, tracksFromPlaylist = [], trackCurrentIndex }) => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [duration, setDuration] = useState("00:00");
  const [ProgressBarValue, setProgressBarValue] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [volume, setVolume] = useState(100);
  let audioRef;
  let ProgressBarRef;

  useEffect(() => {
    if (trackCurrentIndex > -1 && trackCurrentIndex !== null) {
      const trackFromPlaylist = tracksFromPlaylist[Number(trackCurrentIndex)];
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
    setProgressBarValue(Math.floor(audioRef.currentTime));
    setCurrentTime(calcTrackLength(ProgressBarRef.value));
    store.dispatch(actionSetCurrentTime(Math.floor(audioRef.currentTime)));
  };

  const onLoadMetadata = () => {
    setDuration(calcTrackLength(audioRef.duration));
    store.dispatch(actionSetDuration(audioRef.duration));
    setProgressBarMax();
  };

  const setProgressBarMax = () => {
    ProgressBarRef.max = Math.floor(audioRef.duration);
  };

  const onProgressBarInput = () => {
    setCurrentTime(calcTrackLength(ProgressBarRef.value));
  };

  const onProgressBarChange = () => {
    audioRef.currentTime = ProgressBarRef.value;
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
    store.dispatch(actionSetVolume(volume / 100));
  };
  return !isEmpty(currentTrack) ? (
    <Box className="Player">
      <Box>
        {" "}
        <input
          ref={(e) => {
            ProgressBarRef = e;
          }}
          onInput={onProgressBarInput}
          onChange={onProgressBarChange}
          className="Player_progress_bar"
          type="range"
          max="100"
          value={ProgressBarValue}
        />
      </Box>
      {!isEmpty(currentTrack) ? (
        <>
          <audio
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadMetadata}
            onEnded={nextTrack}
            ref={(e) => {
              audioRef = e;
            }}
            src={URL + currentTrack.url}
          ></audio>
        </>
      ) : (
        ""
      )}
      <Box className="Player_title">
        <Typography>
          {" "}
          {currentTime} / {duration.toString()}
        </Typography>
        <Typography
          color={"primary"}
          variant="h6"
          component="span"
          className="Tittle-name"
        >
          {currentTrack.originalFileName}
        </Typography>
      </Box>

      <Box className="Player_buttons">
        <Button onClick={() => prevTrack()} disabled={isPrevButtonDisabled}>
          <SkipPreviousIcon />
        </Button>
        <Button onClick={() => playAudio()}>
          <PlayCircleFilledWhiteIcon />
        </Button>
        <Button onClick={() => pauseAudio()}>
          <PauseIcon />
        </Button>
        <Button onClick={() => nextTrack()} disabled={isNextButtonDisabled}>
          <SkipNextIcon />
        </Button>
        <Box className="Player__volume-bar">
          <VolumeDown />
          <Slider
            className="Player_volume_slider"
            onChange={onVolumeChange}
            type="range"
            max="100"
            value={volume}
          />
          <VolumeUp />
        </Box>
      </Box>
    </Box>
  ) : (
    ""
  );
};

export const CPlayer = connect((state) => ({
  track: state.promise?.trackByID?.payload,
  tracksFromPlaylist: state.player?.playlist?.tracks,
  trackCurrentIndex: state.player?.trackIndex,
}))(Player);
