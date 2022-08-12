import React from "react";
import { CTrackList } from "../components/ListOfTracks";
import { CListOfPlaylists } from "../components/ListOfPlaylists";
import { CPlayer } from "../components/Player";
import { actionAllPlaylists } from "../redux/actions/ActionAllPlaylists";
import { actionAllTracks } from "../redux/actions/ActionAllTracks";
import { store } from "../redux/Store";

store.dispatch(actionAllPlaylists());
store.dispatch(actionAllTracks());
export const HomePage = () => {
  return (
    <>
      <CListOfPlaylists />
      <CTrackList />
      <CPlayer />
    </>
  );
};
