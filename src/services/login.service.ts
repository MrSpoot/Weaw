import http from "../http-common";
import { Login } from "../types/login.type";
import { User } from "../types/user.type";
import Cookies from "js-cookie";

const servicePath = "/auth";

const login = (login: Login): Promise<string> => {
  return http.post(servicePath + "/signin", login).then((res: any) => {
    http.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
    return res.data;
  });
};

const verifyAccount = (token: string): Promise<boolean> => {
  return http.get(servicePath + "/verify/" + token).then((res: any) => {
    return res.data;
  });
};

const register = (user: User) => {
  return http.post(servicePath + "/signup", user).then((res: any) => {
    return res;
  });
};

const loginService = {
  login,
  register,
  verifyAccount,
};

export default loginService;
