import {actionPromise} from "./ActionPromise";
import { gql } from "../../utils/GQL";

export const actionAllTracks = () => {
  const queryPromise = gql(
    `query tracks{
  TrackFind(query:"[{}]"){
    _id url originalFileName
  }
}`,
    {}
  );
  return actionPromise("allTracks", queryPromise);
};

