export function playerReducer(
  state,
  {
    type,
    payload,
    // isPlaying,
    // isStopped,
    // duration,
    // track,
    // trackIndex,
    // playlist,
    // currentTime,
    // volume,
  }
) {
  if (state === undefined) {
    return {
      isPlaying: false,
      isStopped: true,
      duration: 0,
      track: {},
      playlist: {},
      currentTime: 0,
      volume: 1,
      prevButtonDisabled: false,
      nextButtonDisabled: false,
    };
  }
  if (type === "PLAYER_PLAY") {
    return {
      ...state,
      isPlaying: true,
      isStopped: false,
    };
  }
  if (type === "PLAYER_PAUSE") {
    return {
      ...state,
      isPlaying: false,
      isStopped: true,
    };
  }
  if (type === "PLAYER_GET_TRACK") {
    return {
      ...state,
      track: payload,
    };
  }
  if (type === "PLAYER_SET_INDEX") {
    return {
      ...state,
      trackIndex: payload,
    };
  }
  if (type === "PLAYER_PREV_TRACK") {
    return {
      ...state,
      trackIndex: state.trackIndex - 1,
    };
  }
  if (type === "PLAYER_NEXT_TRACK") {
    return {
      ...state,
      trackIndex: state.trackIndex + 1,
    };
  }
  if (type === "PLAYER_SET_VOLUME") {
    return {
      ...state,
      volume: payload,
    };
  }
  return state;
}
