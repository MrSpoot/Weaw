import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWebSocketConnectionState } from "../../reducer/slice/appSlice";
import {
  AppDispatch,
  addConversation,
  addNewMessage,
} from "../../reducer/slice/conversationSlice";
import {
  addSocialRequest,
  processSocialRequestResponse,
} from "../../reducer/slice/userSlice";
import { Message } from "../../types/message.type";
import { SocialRequest } from "../../types/social.type";
import {
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
} from "../../types/websocket.type";
import { RootState } from "../../store";
import conversationService from "../../services/conversation.service";

export const useWebSocketManager = (url: string) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  const connect = (token: string) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      return;
    }
    const ws = new WebSocket(url + "?token=" + token);

    ws.onopen = (event) => {
      console.log("WebSocket ouvert:", event);
      dispatch(setWebSocketConnectionState(true));
      setWebSocket(ws);
    };

    ws.onclose = () => {
      console.log("Websocket fermé, tentative de reconnexion");
      dispatch(setWebSocketConnectionState(false));
      setTimeout(() => connect(token), 5000);
    };

    ws.onmessage = (event) => {
      const object: WebSocketMessage = JSON.parse(event.data);
      console.log(object);
      switch (object.actionType) {
        case "PRIVATE_RESPONSE":
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

  const processPrivateMessageReception = async (message: WebSocketMessage) => {
    const payload = message.payload as Message;

    if (
      conversationState.filter(
        (cst) => cst.conversation.id === payload.conversationId
      ).length <= 0
    ) {
      const c = await conversationService.getUserConversation(
        payload.conversationId
      );
      if (c) {
        dispatch(addConversation(c));
        dispatch(addNewMessage(payload));
      }
    } else {
      dispatch(addNewMessage(payload));
    }
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
