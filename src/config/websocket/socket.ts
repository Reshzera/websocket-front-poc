// src/services/socket.ts
import { Client } from "@stomp/stompjs";

const AUTH_TOKENS = "token-auth";

const createStompClient = () => {
  const client = new Client({
    webSocketFactory: () =>
      new WebSocket(`ws://localhost:8080/ws?token=${AUTH_TOKENS}`),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (str) => {
      console.log("[STOMP DEBUG]", str);
    },
  });

  return client;
};

export default createStompClient;
