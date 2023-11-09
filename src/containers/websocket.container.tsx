import { useEffect } from "react";
import { useRoute } from "../providers/route.provider";
import { useWebSocket } from "../providers/websocket.provider";
import {
  WebRTCMessage,
  WebSocketCallPayload,
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
  WebSocketMessageEvent,
} from "../types/websocket.type";
import { useDispatch, useSelector } from "react-redux";
import { setCall } from "../reducer/slice/callSlice.ts";
import {
  AppDispatch,
  addConversation,
  addNewMessage,
} from "../reducer/slice/conversationSlice";
import {
  addSocialRequest,
  processSocialRequestResponse,
} from "../reducer/slice/userSlice";
import conversationService from "../services/conversation.service";
import { RootState } from "../store";
import { SocialRequest } from "../types/social.type";
import { Message } from "../types/message.type";
import { Conversation } from "../types/conversation.type";

const WebsocketContainer: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { sendMessage } = useWebSocket();

  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  const actualUser = useSelector((state: RootState) => state.users.actualUser);
  const dispatch = useDispatch<AppDispatch>();

  const handleMessage = (data: any) => {
    processWebSocketMessage(data.data as WebSocketMessage);
  };

  const processWebSocketMessage = (object: WebSocketMessage) => {
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

  const processPrivateMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as Message;

    if (
      conversationState.filter(
        (cst) => cst.conversation.id === payload.conversationId
      ).length <= 0
    ) {
      conversationService
        .getUserConversation(payload.conversationId)
        .then((c) => {
          if (c) {
            dispatch(addConversation(c));
            dispatch(addNewMessage(payload));
          }
        });
    } else {
      dispatch(addNewMessage(payload));
    }
  };

  const processFriendMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as SocialRequest;
    dispatch(addSocialRequest(payload));
  };

  const processCallRequestReception = (message: WebSocketMessage) => {
    const payload = message.payload as WebSocketCallPayload;
    console.log(actualUser);
    if (actualUser) {
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

        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((s) => {
            s.getTracks().forEach((track) => {
              peerConnection.setRemoteDescription(sessionDescription);
              peerConnection.addTrack(track, s);
              peerConnection.createAnswer().then((a) => {
                peerConnection.setLocalDescription(a);

                const callPayload: WebSocketCallPayload = {
                  conversation: payload.conversation,
                  webRTCInfo: {
                    type: a.type,
                    sdp: a.sdp ?? "",
                  },
                };
                const webSocketMessage: WebSocketMessage = {
                  actionType: "CALL",
                  payload: callPayload,
                  sender: actualUser?.id ?? "",
                  timestamp: new Date().toISOString(),
                };
                sendMessage(webSocketMessage);
              });
            });
          });
      } else {
      }
    }
  };

  const processFriendResponseMessageReception = (message: WebSocketMessage) => {
    const payload = message.payload as WebSocketFriendRequestResponsePayload;
    dispatch(processSocialRequestResponse(payload));
  };

  useEffect(() => {
    window.addEventListener("websocketMessage", handleMessage);
    return () => {
      // Nettoyage lorsque le composant est démonté
      window.removeEventListener("websocketMessage", handleMessage);
    };
  }, []);

  return <>{children}</>;
};

export default WebsocketContainer;
