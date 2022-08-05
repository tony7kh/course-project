import  gql  from "../utils/GQL";
import actionPromise from "./ActionPromise";
import actionFullLogin from "./ActionAuthLogin";

const actionFullRegister = (login, password) => async (dispatch) => {
  const gqlQuery = `mutation register($login:String!, $password:String!){
      createUser(login: $login, password: $password){
        _id login
      }
    }`;
  const gqlPromise = gql(gqlQuery, { login, password });
  const action = actionPromise("register", gqlPromise);
  console.log("ща будет PENDING");
  const result = await dispatch(action);
  console.log("result==>", result);
  if (result) await dispatch(actionFullLogin(login, password));
};

export default actionFullRegister ;
