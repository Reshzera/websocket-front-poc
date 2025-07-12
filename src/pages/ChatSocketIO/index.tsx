import React, { useEffect, useRef, useState } from "react";
import { useWebsocketSocketIo } from "../../hooks/useSocketIo";
import styles from "./styles.module.scss";

type Message = {
  senderId: string;
  text: string;
};

const ChatSocketIo: React.FC = () => {
  const { send, subscribe, socketId } = useWebsocketSocketIo();
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!inputRef.current) return;

    const value = inputRef.current?.value.trim();

    if (value) {
      const msg: Message = {
        senderId: socketId,
        text: value,
      };

      send<Message>("message", msg);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    send("join", "messages");

    subscribe<Message>("chat", (message) => {
      if (message) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [subscribe, send]);

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>Chat</div>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${
              msg.senderId === socketId
                ? styles.yourMessage
                : styles.otherMessage
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatSocketIo;
