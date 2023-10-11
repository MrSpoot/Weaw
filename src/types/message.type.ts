import { User } from "./user.type";

export type Message = {
    id: string,
    conversationId: string,
    sender: User,
    content: string,
    created: number
  };
  