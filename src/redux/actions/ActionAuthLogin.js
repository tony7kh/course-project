export const actionAuthLogin = (token) => (dispatch, getState) => {
  const oldState = getState().auth;
  dispatch({ type: "AUTH_LOGIN", token });
  const newState = getState().auth;
  if (newState !== oldState) {
    localStorage.authToken = token;
  }
};
