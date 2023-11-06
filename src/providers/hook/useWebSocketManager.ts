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
import conversationService from "../../services/conversation.service";
import { RootState } from "../../store";
import { Message } from "../../types/message.type";
import { SocialRequest } from "../../types/social.type";
import {
  WebSocketCallPayload,
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
} from "../../types/websocket.type";

export const useWebSocketManager = (url: string) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  const userState = useSelector(
    (state: RootState) => state.users
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

  const startCall = async (userId: string) => {
    try {
      if(userState.actualUser){

      // Créez une instance de RTCPeerConnection
      const peerConnection = new RTCPeerConnection();

      // Ajoutez des flux (vidéo et audio)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Créez une offre
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      const callPayload: WebSocketCallPayload = {
        sender: userState.actualUser,
        receiverId: userId,
        webRTCMessage: {
          type: offer.type,
          sdp: offer.sdp ?? "",
        }
      };
      const webSocketMessage: WebSocketMessage = {
        actionType: "CALL",
        payload: callPayload,
        sender: userState.actualUser?.id ?? "",
        timestamp: new Date().toISOString(),
      };
      sendMessage(webSocketMessage)
    }
    } catch (error) {
      console.error("Erreur lors de la demande d'accès à la caméra et au microphone :", error);
    }
  }

  return {
    websocket,
    sendMessage,
    connect,
    startCall
  };
};
