import { Message } from "./message.type";

export type MessageRequestDto = {
    messages: Message[],
    totalPages: number,
    totalMessagesCount: number;
}