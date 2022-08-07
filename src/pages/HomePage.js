import React from "react";
import { CTrackList } from "../components/ListOfTracks";
import { CListOfPlaylists } from "../components/ListOfPlaylists";

export function HomePage() {
  return (
    <>
      <CTrackList />
      <CListOfPlaylists />
    </>
  );
}
