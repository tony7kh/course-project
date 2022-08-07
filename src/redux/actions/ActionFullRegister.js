import { gql } from "../../utils/GQL";
import { actionPromise } from "./ActionPromise";
import { actionFullLogin } from "./ActionFullLogin";

export const actionFullRegister = (login, password) => async (dispatch) => {
  const gqlQuery = `mutation register($login:String!, $password:String!){
      createUser(login: $login, password: $password){
        _id login
      }
    }`;
  const gqlPromise = gql(gqlQuery, { login, password });
  const action = actionPromise("register", gqlPromise);
  console.log("ща будет PENDING");
  const result = await dispatch(action);

  if (result) await dispatch(actionFullLogin(login, password));
};
