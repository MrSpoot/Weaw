import { Conversation } from "../../types/conversation.type";
import { Message } from "../../types/message.type";

export interface ConversationsState {
    conversation: Conversation,
    messages: Message[];
}