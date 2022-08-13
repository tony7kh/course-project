export const actionPlay = () => (dispatch) => {
  dispatch({ type: "PLAYER_PLAY" });
};

export const actionPause = () => (dispatch) => {
  dispatch({ type: "PLAYER_PAUSE" });
};

export const actionPrevTrack = () => (dispatch) => {
  dispatch({ type: "PLAYER_PREV_TRACK" });
};

export const actionNextTrack = () => (dispatch) => {
  dispatch({ type: "PLAYER_NEXT_TRACK" });
};

export const actionGetTrack = (track) => (dispatch) => {
  dispatch({ type: "PLAYER_GET_TRACK", payload: track });
};

export const actionSetIndex = (index) => (dispatch) => {
  dispatch({ type: "PLAYER_SET_INDEX", payload: index });
};

export const actionSetVolume = (volume) => (dispatch) => {
  dispatch({ type: "PLAYER_SET_VOLUME", payload: volume });
};

export const actionSetPlaylist = (playlist) => (dispatch) => {
  dispatch({ type: "PLAYER_SET_PLAYLIST", payload: playlist });
};

export const actionSetDuration = (duration) => (dispatch) => {
  dispatch({ type: "PLAYER_SET_DURATION", payload: duration });
};

export const actionSetCurrentTime = (currentTime) => (dispatch) => {
  dispatch({ type: "PLAYER_SET_CURRENT_TIME", payload: currentTime });
};
