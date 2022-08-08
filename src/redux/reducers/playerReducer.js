export function playerReducer(
  state,
  {
    type,
    isPlaying,
    isStopped,
    duration,
    track,
    playlist,
    playlistIndex,
    currentTime,
    volume,
  }
) {
  if (state === undefined) {
    return {};
  }
  return state;
}
