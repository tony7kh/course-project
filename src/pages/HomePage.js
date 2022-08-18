import React from "react";
import { Redirect } from "react-router-dom";
import { CTrackList } from "../components/ListOfTracks";
import { CListOfPlaylists } from "../components/ListOfPlaylists";
import { CPlayer } from "../components/Player";
import { actionAllPlaylists } from "../redux/actions/ActionAllPlaylists";
import { actionAllTracks } from "../redux/actions/ActionAllTracks";
import { store } from "../redux/Store";
import { PUBLIC_PAGE_PATH } from "../Constants";

store.dispatch(actionAllPlaylists());
store.dispatch(actionAllTracks());
export const HomePage = () => {
  return localStorage.authToken ? (
    <>
      <CListOfPlaylists />
      <CTrackList />
      <CPlayer />
    </>
  ) : (
    <Redirect to={PUBLIC_PAGE_PATH} />
  );
};
