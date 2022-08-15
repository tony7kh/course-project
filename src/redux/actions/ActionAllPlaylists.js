import { gql } from "../../utils/GQL";
import { actionPromise } from "./ActionPromise";

export const actionAllPlaylists = () => {
  const queryPromise = gql(
    `query playlists($query:String){
  PlaylistFind(query:$query){
    _id name description tracks{
      _id url originalFileName
}
  }
}`,
    { query: JSON.stringify([{}, { sort: [{ _id: -1 }], limit: [50] }]) }
  );
  return actionPromise("allPlaylists", queryPromise);
};
