import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "../providers/websocket.provider";
import { setCall } from "../reducer/slice/callSlice.ts";
import {
  AppDispatch,
  addConversation,
  addNewMessage,
} from "../reducer/slice/conversationSlice";
import {
  addSocialRequest,
  processSocialRequestResponse,
  setSocial,
  setUser,
} from "../reducer/slice/userSlice";
import conversationService from "../services/conversation.service";
import { RootState } from "../store";
import { Message } from "../types/message.type";
import { SocialRequest } from "../types/social.type";
import {
  WebSocketCallPayload,
  WebSocketFriendRequestResponsePayload,
  WebSocketMessage,
  WebSocketUserStatusPayload,
} from "../types/websocket.type";

const WebsocketContainer: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { sendMessage } = useWebSocket();
  const messageQueue: WebSocketMessage[] = [];
  const conversationState = useSelector(
    (state: RootState) => state.conversations
  );
  const userState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const handleMessage = (data: any) => {
    processWebSocketMessage(data.data as WebSocketMessage);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const processQueue = () => {
    while (messageQueue.length > 0) {
      const message = messageQueue.shift(); // Prend le premier message de la file d'attente
      message && processWebSocketMessage(message);
    }
  };

  useEffect(() => {
    processQueue();
  }, [processQueue, userState.actualUser]);

  const processWebSocketMessage = (object: WebSocketMessage) => {
    if (userState.actualUser) {
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
        case "USER_STATUS":
          processUserStatusReception(object);
          break;
      }
    } else {
      messageQueue.push(object);
    }
  };

  const processUserStatusReception = (message: WebSocketMessage) => {
    const payload = message.payload as WebSocketUserStatusPayload;
    if (userState.actualUser?.id === payload.userId) {
      dispatch(
        setUser({
          ...userState.actualUser,
          userStatus: payload.status,
        })
      );
    } else {
      const updatedFriends = userState.social?.friends.map((friend) => {
        if (friend.id === payload.userId) {
          return {
            ...friend,
            userStatus: payload.status,
          };
        }
        return friend;
      });
      if (updatedFriends && userState.social) {
        dispatch(
          setSocial({
            ...userState.social,
            friends: updatedFriends,
          })
        );
      }
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
                  sender: userState.actualUser?.id ?? "",
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
