import { gql } from "../../utils/GQL";
import { actionPromise } from "./ActionPromise";
export const actionTrackByID = (_id) => {
  const queryPromise = gql(
    `query trackfind($query:String){
TrackFindOne(query:$query){
	_id url originalFileName id3{
      title artist album year genre trackNumber
    }
}
}`,
    { query: JSON.stringify([{ _id }]) }
  );
  return actionPromise("trackByID", queryPromise)
};
