export const actionAuthLogin = (token) => (dispatch, getState) => {
  //попытаться отправить в редьюсер AUTH_LOGIN
  const oldState = getState().auth;
  dispatch({ type: "AUTH_LOGIN", token });
  const newState = getState().auth;
  //посмотреть, редьюсеру token зашел или нет
  //если зашел - сохранить токен в localStorage
  if (newState !== oldState) {
    localStorage.authToken = token;
  }
};
