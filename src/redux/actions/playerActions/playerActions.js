export const actionPlay = () => (dispatch) => {
  dispatch({ type: "PLAYER_PLAY" });
};

export const actionPause = () => (dispatch) => {
  dispatch({ type: "PLAYER_PAUSE" });
};

export const actionGetTrack = (dispatch) => {
  dispatch({ type: "PLAYER_GET_TRACK" });
};
