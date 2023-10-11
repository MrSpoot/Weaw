import http from "../http-common";
import { Conversation } from "../types/conversation.type";
import { Login } from "../types/login.type";
import { User } from "../types/user.type";

const servicePath = "/conversations";

const getUserConversations = (): Promise<Conversation[]> => {
  return http.get(servicePath).then((res: any) => {
    return res.data;
  });
};

const conversationService = {
  getUserConversations
};

export default conversationService;
