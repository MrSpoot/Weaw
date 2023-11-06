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
import { Conversation } from "../../types/conversation.type";
import { Message } from "../../types/message.type";
import { SocialRequest } from "../../types/social.type";
import {
  WebSocketCallPayload,
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
} from "../../types/websocket.type";
import { setCall } from "../../reducer/slice/callSlice.ts";

export const useWebSocketManager = (url: string) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  const userState = useSelector((state: RootState) => state.users);
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
        case "CALL":
          processCallRequestReception(object);
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

  const processCallRequestReception = async (message: WebSocketMessage) => {
    const payload = message.payload as WebSocketCallPayload;
    if (userState.actualUser) {
      if (payload.webRTCInfo.type === "offer") {
        dispatch(
          setCall({
            conversation: payload.conversation,
            isCalling: true,
            direction: "RECEIVER",
            webRTCInfo: {
              type: payload.webRTCInfo.type,
              sdp: payload.webRTCInfo.sdp ?? "",
              iceCandidates: undefined,
            },
          })
        );

        const sessionDescription = new RTCSessionDescription({
          type: payload.webRTCInfo.type as RTCSdpType,
          sdp: payload.webRTCInfo.sdp,
        });

        const peerConnection = new RTCPeerConnection();

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        // Définissez l'offre sur la connexion
        await peerConnection.setRemoteDescription(sessionDescription);

        // Créez une réponse
        const answer = await peerConnection.createAnswer();

        // Définissez la réponse localement
        await peerConnection.setLocalDescription(answer);

        const callPayload: WebSocketCallPayload = {
          conversation: payload.conversation,
          webRTCInfo: {
            type: answer.type,
            sdp: answer.sdp ?? "",
          },
        };
        const webSocketMessage: WebSocketMessage = {
          actionType: "CALL",
          payload: callPayload,
          sender: userState.actualUser?.id ?? "",
          timestamp: new Date().toISOString(),
        };
        sendMessage(webSocketMessage);
      } else {
      }
    }
  };

  const processFriendResponseMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as WebSocketFriendRequestResponsePayload;
    dispatch(processSocialRequestResponse(payload));
  };

  const sendMessage = (message: WebSocketMessage) => {
    websocket?.send(JSON.stringify(message));
  };

  const startCall = async (conversation: Conversation) => {
    try {
      if (userState.actualUser) {
        // Créez une instance de RTCPeerConnection
        const peerConnection = new RTCPeerConnection();

        // Ajoutez des flux (vidéo et audio)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        // Créez une offre
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        const callPayload: WebSocketCallPayload = {
          conversation: conversation,
          webRTCInfo: {
            type: offer.type,
            sdp: offer.sdp ?? "",
          },
        };
        const webSocketMessage: WebSocketMessage = {
          actionType: "CALL",
          payload: callPayload,
          sender: userState.actualUser?.id ?? "",
          timestamp: new Date().toISOString(),
        };
        sendMessage(webSocketMessage);
        dispatch(
          setCall({
            conversation: conversation,
            isCalling: true,
            direction: "EMITTER",
            webRTCInfo: {
              type: offer.type,
              sdp: offer.sdp ?? "",
            },
          })
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la demande d'accès à la caméra et au microphone :",
        error
      );
    }
  };

  return {
    websocket,
    sendMessage,
    connect,
    startCall,
  };
};
