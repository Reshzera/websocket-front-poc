// src/hooks/useWebsocketStomp.ts
import { Client, type IMessage } from "@stomp/stompjs";
import { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import createStompClient from "../config/websocket/socket";

type SubscriptionCallback = (message: IMessage) => void;

export const useWebsocketStomp = () => {
  const clientRef = useRef<Client | null>(null);
  const clientId = useRef<string>(uuidv4());
  const subscriptionsRef = useRef<{ [topic: string]: SubscriptionCallback }>(
    {}
  );

  useEffect(() => {
    const client = createStompClient();
    clientRef.current = client;

    client.onConnect = () => {
      Object.entries(subscriptionsRef.current).forEach(([topic, callback]) => {
        client.subscribe(topic, callback);
      });
    };

    client.onDisconnect = () => {
      console.log("Disconnected from STOMP server");
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const subscribe = useCallback(
    (topic: string, callback: SubscriptionCallback) => {
      if (clientRef.current?.connected) {
        clientRef.current.subscribe(topic, callback);
      }
      subscriptionsRef.current[topic] = callback;
    },
    []
  );

  const send = useCallback(
    (destination: string, body: string, headers?: Record<string, string>) => {
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination,
          body,
          headers,
        });
      }
    },
    []
  );

  return {
    subscribe,
    send,
    clientId: clientId.current,
  };
};
