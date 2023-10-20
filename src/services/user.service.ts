import http from "../http-common";
import { Social } from "../types/social.type";
import { User } from "../types/user.type";

const servicePath = "/user";

const getUser = (): Promise<User> => {
  return http.get(servicePath).then((res: any) => {
    return res.data;
  });
};

const getUserSocial = (): Promise<Social> => {
  return http.get(servicePath + "/social").then((res: any) => {
    return res.data;
  });
};

const userService = {
  getUser,
  getUserSocial
};

export default userService;
