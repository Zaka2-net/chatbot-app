import React from "react";
import {
  Container,
  Paper,
  List,
  ListItem,
  Divider,
  Typography,
} from "@mui/material";
import Message from "./Message";
import LoadingSpinner from "../LoadingSpinner";

interface MessageData {
  id: number | null;
  text: string;
  user: string;
  isCurrentUser?: boolean;
}

interface MessageListProps {
  messages: MessageData[] | [];
  isServerLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isServerLoading,
}) => {
  return (
    <Container
      maxWidth="md"
      style={{
        padding: "20px",
        overflowY: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <Paper elevation={0}>
        <List>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem style={{ display: "block" }}>
                <Message {...message} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {isServerLoading && (
            <ListItem style={{ display: "block" }}>
              <LoadingSpinner></LoadingSpinner>
            </ListItem>
          )}
        </List>
        {messages.length == 0 && (
          <Typography
            variant="subtitle2"
            style={{ padding: "16px", textAlign: "center" }}
          >
            Send a message to start the conversation
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default MessageList;
