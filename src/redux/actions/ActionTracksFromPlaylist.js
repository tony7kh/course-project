import { actionPromise } from "./ActionPromise";
import { gql } from "../../utils/GQL";

export const actionTracksFromPlaylist =(_id) =>{
    const queryPromise = gql(`query tracksFromPlaylist($query:String){
  PlaylistFindOne(query:$query){
    _id name tracks{
      _id url originalFileName
}
  }
}`, {query: JSON.stringify([{_id}])});
return actionPromise("tracksFromPlaylist", queryPromise)
}
