export function playerReducer(
  state,
  { type, isPlaying, isStopped, duration, track, playlist, currentTime, volume }
) {
  if (state === undefined) {
    return {
      isPlaying: false,
      isStopped: true,
      duration: 0,
      track: {},
      playlist: {},
      currentTime: 0,
      volume: 0,
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
    };
  }
  return state;
}
