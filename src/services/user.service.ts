import http from "../http-common";
import { User } from "../types/user.type";

const servicePath = "/user";

const getUser = (): Promise<User> => {
  return http.get(servicePath).then((res: any) => {
    return res.data;
  });
};

const userService = {
  getUser
};

export default userService;
