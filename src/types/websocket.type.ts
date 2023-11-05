import { User } from "./user.type";

export type WebSocketMessageActionType =
  | "PRIVATE_MESSAGE"
  | "FRIENDS_REQUEST"
  | "FRIENDS_REQUEST_RESPONSE"
  | "PRIVATE_RESPONSE";

export type WebSocketMessage = {
  actionType: WebSocketMessageActionType;
  payload: Object;
  sender: string;
  timestamp: string;
};

export type WebSocketPrivateMessagePayload = {
  senderId: string;
  conversationId: string;
  messageId?: string;
  message: string;
};

export type WebSocketCallPayload = {
  sender: User;
  receiverId: string;
};

export type WebSocketCallResponsePayload = {
  response: ResponseType;
};

export type WebSocketFriendRequestPayload = {
  inviteSenderId: string;
  receiverNickname: string;
};

export type ResponseType = "ACCEPTED" | "REJECTED";

export type WebSocketFriendRequestResponsePayload = {
  socialRequestId: string;
  response: ResponseType;
};
