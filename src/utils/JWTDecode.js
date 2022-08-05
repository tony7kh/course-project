function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {}
}

export default jwtDecode;
