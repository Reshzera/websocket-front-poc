// src/services/socket.ts
import { Client } from "@stomp/stompjs";

const createStompClient = () => {
  const client = new Client({
    brokerURL: "ws://localhost:8080/ws",
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
