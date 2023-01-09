import http from "@packages/lib/http";
import { apiUrl } from "@packages/lib/config";

const signup = (endPoint, email, password) => {
  return http.post(`${apiUrl}/signup`, { body: { endPoint, email, password } });
};

const login = (email, password) => {
  return http.post(`${apiUrl}/login`, { body: { email, password } });
};

export const authService = {
  signup,
  login,
};
