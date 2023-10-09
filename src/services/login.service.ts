import http from "../http-common";
import { Login } from "../types/login.type";
import { User } from "../types/user.type";

const servicePath = "/auth";

const login = (login: Login) => {
  return http.post(servicePath + "/signin", login).then((res: any) => {
    return res;
  });
};

const register = (user: User) => {
  return http.post(servicePath + "/signup", user).then((res: any) => {
    return res;
  });
};

const isSecured = () => {
  return http.get(servicePath).then((res: any) => {
    console.log(res);
  });
};

const loginService = {
  login,
  isSecured,
  register,
};

export default loginService;
