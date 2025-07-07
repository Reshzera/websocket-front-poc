import React from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";

const ChatTemplate: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.pageWrapper}>
        <Outlet />
      </div>
    </main>
  );
};

export default ChatTemplate;
