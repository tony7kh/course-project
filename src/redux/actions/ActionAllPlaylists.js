import { gql } from "../../utils/GQL";
import { actionPromise } from "./ActionPromise";

export const actionAllPlaylists = () => {
  const queryPromise = gql(
    `query playlists{
  PlaylistFind(query:"[{}]"){
    _id name description tracks{
      _id url originalFileName
}
  }
}`,
    {}
  );
  return actionPromise("allPlaylists", queryPromise);
};
