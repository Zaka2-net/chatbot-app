import React from "react";
import styles from "./Message.module.css"; // Import the CSS module

import { Avatar, Paper, Typography } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner";

interface MessageProps {
  text: string;
  user: string;
  isCurrentUser?: boolean;
}

const Message: React.FC<MessageProps> = ({
  text,
  user,
  isCurrentUser = false,
}) => {
  return (
    <Paper
      className={styles.messageContainer}
      elevation={0}
      style={{
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
        display: "flex",
      }}
    >
      <Avatar className={styles.avatar}>{user.charAt(0)}</Avatar>
      <div className={styles.textContainer}>
        <Typography variant="body1">{text}</Typography>
      </div>
    </Paper>
  );
};

export default Message;
