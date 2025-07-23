// src/services/socket.ts
import { io, Socket } from "socket.io-client";

const AUTH_TOKENS = "token-auth";

const createSocketClient = () => {
  const socket: Socket = io("http://localhost:8081", {
    query: {
      token: AUTH_TOKENS,
    },
    transports: ["websocket"],
    reconnectionDelay: 5000,
  });

  return socket;
};

export default createSocketClient;
