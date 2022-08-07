import { gql } from "../../utils/GQL";
import { actionPromise } from "./ActionPromise";

export const actionAllPlaylists = () => {
  const queryPromise = gql(
    `query playlists{
  PlaylistFind(query:"[{}]"){
    _id name description
  }
}`,
    {}
  );
  return actionPromise("allPlaylists", queryPromise);
};
