import { Conversation } from "./conversation.type";

export type WebSocketMessageActionType =
  | "PRIVATE_MESSAGE"
  | "FRIENDS_REQUEST"
  | "FRIENDS_REQUEST_RESPONSE"
  | "PRIVATE_RESPONSE"
  | "CALL";

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
  conversation: Conversation;
  webRTCInfo: WebRTCMessage;
};

export type WebRTCMessage = {
  type: string;
  sdp: string;
  iceCandidates?: { [key: string]: string };
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
