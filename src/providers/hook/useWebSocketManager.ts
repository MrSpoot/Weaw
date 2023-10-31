import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  addNewMessage,
} from "../../reducer/slice/conversationSlice";
import {
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
} from "../../types/websocket.type";
import {
  addSocialRequest,
  processSocialRequestResponse,
} from "../../reducer/slice/userSlice";
import { SocialRequest } from "../../types/social.type";
import { Message } from "../../types/message.type";

export const useWebSocketManager = (url: string) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const connect = (token: string) => {
    const ws = new WebSocket(url + "?token=" + token);

    ws.onopen = (event) => {
      console.log("WebSocket ouvert:", event);
      setWebSocket(ws);
    };

    ws.onmessage = (event) => {
      const object: WebSocketMessage = JSON.parse(event.data);

      switch (object.actionType) {
        case "PRIVATE_MESSAGE":
          processPrivateMessageReception(object);
          break;
        case "FRIENDS_REQUEST":
          processFriendMessageReception(object);
          break;
        case "FRIENDS_REQUEST_RESPONSE":
          processFriendResponseMessageReception(object);
          break;
      }
    };
    setWebSocket(ws);
  };

  const processPrivateMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as Message;
    dispatch(addNewMessage(payload));
  };

  const processFriendMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as SocialRequest;
    dispatch(addSocialRequest(payload));
  };

  const processFriendResponseMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as WebSocketFriendRequestResponsePayload;
    dispatch(processSocialRequestResponse(payload));
  };

  const sendMessage = (message: WebSocketMessage) => {
    websocket?.send(JSON.stringify(message));
  };

  return {
    websocket,
    sendMessage,
    connect,
  };
};
