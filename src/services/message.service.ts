import http from "../http-common";
import { MessageRequestDto } from "../types/message.request.dto.type";

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
