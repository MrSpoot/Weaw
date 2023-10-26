import http from "../http-common";
import { Conversation } from "../types/conversation.type";
import { User } from "../types/user.type";

const servicePath = "/conversations";

const getUserConversations = (): Promise<Conversation[]> => {
  return http.get(servicePath).then((res: any) => {
    return res.data;
  });
};

const createConversation = (users: User[]): Promise<Conversation> => {
  return http.post(servicePath, {users: users}).then((res: any) => {
    return res.data;
  });
}

const conversationService = {
  getUserConversations,
  createConversation
};

export default conversationService;
