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
import URL from "../Constants";
import { isEmpty } from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

const ContinuousSlider = () => {
  const [volume, setVolume] = useState(100);

  const handleChange = (event, newVolume) => {
    setVolume(newVolume);
    store.dispatch(actionSetVolume(newVolume / 100));
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={volume} onChange={handleChange} />
        <VolumeUp />
      </Stack>
    </Box>
  );
};

const Player = ({
  track = {},
  tracksFromPlaylist = [],
  trackCurrentIndex,
  volume,
}) => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

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
    myAudio.volume = volume;
  }, [volume]);

  let myAudio = new Audio();
  useEffect(() => {
    if (!isEmpty(currentTrack)) {
      myAudio.src = URL + currentTrack.url;
      myAudio.play();
    }
  }, [currentTrack]);

  const playAudio = () => {
    myAudio.play();
    store.dispatch(actionPlay());
  };
  const pauseAudio = () => {
    myAudio.pause();
    store.dispatch(actionPause());
  };
  const prevTrack = () => {
    myAudio.pause();
    myAudio.removeAttribute("src");
    store.dispatch(actionPrevTrack());
  };

  const nextTrack = () => {
    myAudio.pause();
    myAudio.removeAttribute("src");
    store.dispatch(actionNextTrack());
  };

  return (
    <Box className="Player">
      {!isEmpty(currentTrack) ? (
        <>
          <audio src={URL + currentTrack.url} volume={volume}></audio>
        </>
      ) : (
        "Please, choose a track"
      )}

      <Box className="Player_title">
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
        <ContinuousSlider />
      </Box>
    </Box>
  );
};

export const CPlayer = connect((state) => ({
  track: state.promise?.trackByID?.payload,
  tracksFromPlaylist: state.promise?.tracksFromPlaylist?.payload?.tracks,
  trackCurrentIndex: state.player?.trackIndex,
  volume: state.player?.volume,
}))(Player);
