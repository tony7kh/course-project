import { actionPromise } from "./ActionPromise";
import { gql } from "../../utils/GQL";

export const actionAllTracks = () => {
  const queryPromise = gql(
    `query tracks($query:String){
  TrackFind(query:$query){
    _id url originalFileName
  }
}`,
    { query: "[{}]" }
  );
  return actionPromise("allTracks", queryPromise);
};
