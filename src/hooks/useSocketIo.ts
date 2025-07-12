import { useCallback, useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import createSocketClient from "../config/websocket/socketIo";

interface MessageCallback<T = unknown> {
  (data: T): void;
}

export const useWebsocketSocketIo = () => {
  const socketRef = useRef<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | undefined>("");

  useEffect(() => {
    const socket = createSocketClient();
    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const subscribe = useCallback(
    <T = unknown>(event: string, callback: MessageCallback<T>) => {
      if (!socketRef.current) return;
      socketRef.current.on(event, callback);
    },
    []
  );

  const send = useCallback(<T = unknown>(event: string, data: T) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return {
    subscribe,
    send,
    socketId: socketId || "",
  };
};
