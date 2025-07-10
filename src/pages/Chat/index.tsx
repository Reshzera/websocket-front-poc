import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useWebsocketStomp } from "../../hooks/useWebsocketStomp";

type Message = {
  senderId: string;
  text: string;
};

const Chat: React.FC = () => {
  const { send, subscribe, clientId } = useWebsocketStomp();
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!inputRef.current) return;

    const value = inputRef.current?.value.trim();

    if (value) {
      const msg: Message = {
        senderId: clientId,
        text: value,
      };

      send("/app/chat", JSON.stringify(msg));

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    subscribe("/topic/messages", (message) => {
      if (message.body) {
        const received: Message = JSON.parse(message.body);
        setMessages((prev) => [...prev, received]);
      }
    });
  }, [subscribe]);

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>Chat</div>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${
              msg.senderId === clientId
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

export default Chat;
