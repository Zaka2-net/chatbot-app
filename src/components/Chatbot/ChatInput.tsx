import React, { ChangeEvent, useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";

interface Props {
  onSendMessage: Function;
}

interface MessageData {
  id: number | null;
  text: string;
  user: string;
}

const ChatInput: React.FC<Props> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      const fullMessage: MessageData = {
        id: null,
        text: message,
        user: "User",
      };
      onSendMessage(fullMessage);
      setMessage("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default newline behavior
      handleMessageSend();
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Box display="flex">
        <TextField
          variant="outlined"
          label="Type your message"
          fullWidth
          size="small"
          style={{ marginRight: "10px" }}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" color="primary" onClick={handleMessageSend}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatInput;
