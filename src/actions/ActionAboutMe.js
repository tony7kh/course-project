import actionPromise from "./ActionPromise";
import gql from "../utils/GQL";

const actionAboutMe = (_id) => {
  const queryPromise = gql(
    `query userfind($id: String){
        UserFindOne(query:$id){
    _id 
    createdAt
    login
    nick
    avatar{
      url
    }
  }
}`,
    { id: JSON.stringify([{ _id }]) }
  );
  return actionPromise("aboutMe", queryPromise);
};


export default actionAboutMe;
