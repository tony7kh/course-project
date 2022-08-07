import {jwtDecode} from "../../utils/JWTDecode";

export function authReducer(state = {}, { type, token }) {
  if (type === "AUTH_LOGIN") {
    const payload = jwtDecode(token);
    if (payload) return { token, payload };
  }
  if (type === "AUTH_LOGOUT") {
    return {};
  }
  return state;
}
