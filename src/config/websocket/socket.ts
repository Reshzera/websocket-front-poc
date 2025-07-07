import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const createSocket = () => {
  const socket = io(SOCKET_URL);
  return socket;
};

export { createSocket, SOCKET_URL };
