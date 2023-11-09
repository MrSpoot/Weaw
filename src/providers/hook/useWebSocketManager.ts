import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reducer/slice/conversationSlice";
import { setWebSocketConnectionState } from "../../reducer/slice/appSlice";

export const useWebSocketManager = (url: string) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const connect = (token: string) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      return;
    }
    const ws = new WebSocket(url + "?token=" + token);

    ws.onopen = () => {
      dispatch(setWebSocketConnectionState(true));
      setWebSocket(ws);
    };

    ws.onclose = () => {
      dispatch(setWebSocketConnectionState(false));
      setTimeout(() => connect(token), 5000);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Créer un événement personnalisé pour propager les données
      const messageEvent = new MessageEvent("websocketMessage", {
        data: data,
      });

      window.dispatchEvent(messageEvent);
    };

    setWebSocket(ws);
  };

  return {
    websocket,
    connect,
  };
};
