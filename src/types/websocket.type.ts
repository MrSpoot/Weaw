import { Conversation } from "./conversation.type";
import { UserStatus } from "./user.type";

export type WebSocketMessageActionType =
  | "PRIVATE_MESSAGE"
  | "FRIENDS_REQUEST"
  | "FRIENDS_REQUEST_RESPONSE"
  | "PRIVATE_RESPONSE"
  | "CALL"
  | "USER_STATUS"

// Création d'un type pour la fonction de rappel
export type MessageReceivedCallback = (data: any) => void;

// Création d'un type pour l'événement personnalisé
export type WebSocketMessageEvent = CustomEvent<MessageReceivedCallback>;

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

export type WebSocketUserStatusPayload = {
  userId: string
  status: UserStatus
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
