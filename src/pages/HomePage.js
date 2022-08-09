import React from "react";
import { CTrackList } from "../components/ListOfTracks";
import { CListOfPlaylists } from "../components/ListOfPlaylists";
import { CPlayer } from "../components/Player";

export const HomePage = () => {
  return (
    <>
      <CListOfPlaylists />
      <CTrackList />
      <CPlayer />
    </>
  );
}
