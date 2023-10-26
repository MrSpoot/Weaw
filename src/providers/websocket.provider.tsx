import React from "react";
import { WebSocketMessage } from "../types/websocket.type";
import { useWebSocketManager } from "./hook/useWebSocketManager";

type ContainerProps = {
  children: React.ReactNode;
};

type WebSocketProvider = {
  sendMessage: (msg: WebSocketMessage) => void;
  connect: (token: string) => void;
};

const WebSocketContext = React.createContext({} as WebSocketProvider);

export const WebSocketProvider = (children: ContainerProps) => {
  const ws = useWebSocketManager(
    `wss://${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/rest/ws`
  );

  const value: WebSocketProvider = {
    sendMessage: (msg: WebSocketMessage) => {
      ws.sendMessage(msg);
    },
    connect: (token: string) => {
      ws.connect(token);
    },
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children.children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => React.useContext(WebSocketContext);
