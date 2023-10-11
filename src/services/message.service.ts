import http from "../http-common";
import { Conversation } from "../types/conversation.type";
import { Login } from "../types/login.type";
import { MessageRequestDto } from "../types/message.request.dto.type";
import { Message } from "../types/message.type";
import { User } from "../types/user.type";

const servicePath = "/message";

const getConversationMessages = (conversationId: string, page: number): Promise<MessageRequestDto> => {
  return http.get(servicePath + "/channel/" + conversationId + "?page="+page).then((res: any) => {
    return res.data;
  });
};

const messageService = {
  getConversationMessages
};

export default messageService;
