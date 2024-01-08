"use client";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import ErrorBanner from "../ErrorBanner";

interface MessageData {
  id: number | null; // ID is set to null, but is updated only before pushing the message into the conversation
  text: string;
  user: string;
}

const Chatbot = () => {
  const messageLimit = 1024;
  const [conversation, setConversation] = useState<MessageData[] | []>([]);
  const [isServerLoading, setIsServerLoading] = useState<boolean>(false);
  const [messageId, setMessageId] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const sendUserMessageToServer = (message: string) => {
    setIsServerLoading(true);
    setTimeout(() => {
      // A function to mimic server behaviour for demo purposes
      const serverResponseMessage: MessageData = {
        id: null,
        text: "Response", // "Response" will be replaced by the server response.
        user: "Bot",
      };
      updateConversation(serverResponseMessage);
      setIsServerLoading(false);
    }, 1000);
  };
  const updateConversation = (message: MessageData) => {
    if (message.user != "Bot") {
      sendUserMessageToServer(message.text);
    }
    setMessageId((prevMessageId) => {
      message.id = prevMessageId;
      //  messageId is set here to make sure we have the latest messageId, since "setMessageId" is an async function
      return prevMessageId + 1;
    });
    setConversation((prevConversation) => [...prevConversation, message]);
  };
  return (
    <div>
      {error != "" && <ErrorBanner message={error}></ErrorBanner>}

      <MessageList
        isServerLoading={isServerLoading}
        messages={conversation}
      ></MessageList>
      <ChatInput
        setError={setError}
        messageLimit={messageLimit}
        onSendMessage={updateConversation}
      ></ChatInput>
    </div>
  );
};

export default Chatbot;
