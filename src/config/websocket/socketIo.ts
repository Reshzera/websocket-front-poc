// src/services/socket.ts
import { io, Socket } from "socket.io-client";

const createSocketClient = () => {
  const socket: Socket = io("http://localhost:8081", {
    transports: ["websocket"],
    reconnectionDelay: 5000,
  });

  return socket;
};

export default createSocketClient;
