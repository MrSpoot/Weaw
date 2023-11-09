import { ContainerProps } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Conversation } from "../types/conversation.type";
import { User } from "../types/user.type";
import {
  WebRTCMessage,
  WebSocketCallPayload,
  WebSocketMessage,
} from "../types/websocket.type";
import { useWebSocket } from "./websocket.provider";

type CallProvider = {
  startCall: (
    actualUser: User,
    conversation: Conversation
  ) => Promise<WebRTCMessage> | undefined;
};

const CallContext = React.createContext({} as CallProvider);

export const CallProviderComponent = (children: ContainerProps) => {
  const { sendMessage } = useWebSocket();

  const value: CallProvider = {
    startCall: (actualUser: User, conversation: Conversation) => {
      try {
        if (actualUser) {
          const peerConnection = new RTCPeerConnection();

          const promises: Promise<any>[] = [];

          promises.push(
            navigator.mediaDevices
              .getUserMedia({
                video: false,
                audio: true,
              })
              .then((s) => {
                s.getTracks().forEach((track) => {
                  peerConnection.addTrack(track, s);
                });
              })
          );

          promises.push(
            peerConnection.createOffer().then((offer) => {
              peerConnection.setLocalDescription(offer);
              return offer;
            })
          );

          return Promise.all(promises).then((res) => {
            const _offer = res[1] as unknown as RTCSessionDescriptionInit;

            const webRtcInfo: WebRTCMessage = {
              type: _offer.type,
              sdp: _offer.sdp ?? "",
            };

            const callPayload: WebSocketCallPayload = {
              conversation: conversation,
              webRTCInfo: webRtcInfo,
            };
            const webSocketMessage: WebSocketMessage = {
              actionType: "CALL",
              payload: callPayload,
              sender: actualUser?.id ?? "",
              timestamp: new Date().toISOString(),
            };
            sendMessage(webSocketMessage);
            return webRtcInfo;
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de la demande d'accès à la caméra et au microphone :",
          error
        );
      }
    },
  };

  return (
    <CallContext.Provider value={value}>
      {children.children}
    </CallContext.Provider>
  );
};

export const useCall = () => React.useContext(CallContext);
