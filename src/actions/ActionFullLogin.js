import  gql  from "../utils/GQL";
import actionPromise from "./ActionPromise";
import actionAuthLogin from "./ActionAuthLogin";

const actionFullLogin = (login, password) => async (dispatch) => {
  //тут надо задиспатчить промис логина
  const gqlQuery = `query log($login:String!, $password:String!){
                          login(login:$login, password:$password)
                      }`;
  const gqlPromise = gql(gqlQuery, { login, password });
  const action = actionPromise("login", gqlPromise);
  console.log("ща будет PENDING");
  const result = await dispatch(action); //тут мы получаем токен
  console.log("ща был FULFILLED");

  dispatch(actionAuthLogin(result));
  console.log("ТОКА ШО ОТДАЛ В AUTH REDUCER");
};

export default actionFullLogin;
