import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { createSocket } from "../../config/websocket/socket";

type Message = {
  senderId: string;
  text: string;
};

const Chat: React.FC = () => {
  const socket = createSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!inputRef.current) return;

    const value = inputRef.current?.value.trim();

    if (value) {
      socket.emit("message", {
        senderId: socket.id,
        text: value,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: socket.id ?? "",
          text: value,
        },
      ]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>Chat</div>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${
              msg.senderId === socket.id
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
