import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../reducer/slice/conversationSlice';
import { WebSocketMessage } from '../../types/websocket.type';

export const useWebSocketManager = (url: string) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const connect = (token: string) => {
    const ws = new WebSocket(url+"?token="+token);

    ws.onopen = (event) => {
      console.log("WebSocket ouvert:", event);
      setWebSocket(ws);
    };

    ws.onmessage = (event) => {
      const object: WebSocketMessage = JSON.parse(event.data);

      switch (object.actionType){
        case "PRIVATE_MESSAGE":
          processPrivateMessageReception(object)
          break
      }
    };

    // Gérer d'autres événements du WebSocket selon vos besoins...

    setWebSocket(ws);
  }

  const processPrivateMessageReception = (message: WebSocketMessage) => {
    
    

  }

  const sendMessage = (message: WebSocketMessage) => {
    websocket?.send(JSON.stringify(message));
  };

  return {
    websocket,
    sendMessage,
    connect
  };
};
