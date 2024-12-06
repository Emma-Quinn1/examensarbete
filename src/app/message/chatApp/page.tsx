"use client";

import { useState } from "react";
import useGetConversations from "@/hooks/useGetConversations";
import useAuth from "@/hooks/useAuth";
import MessageWindow from "../page";

const ChatApp = () => {
  const [activeConversation, setActiveConversation] = useState<{
    recipientId: string;
    recipientName: string;
  } | null>(null);

  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  const { conversations, loadingConversations, users } = useGetConversations();

  const handleSelectConversation = (recipientId: string) => {
    const recipientName = users[recipientId] || "Laddar...";
    setActiveConversation({ recipientId, recipientName });
  };

  return (
    <div className="chatContainer">
      <div className="chatList">
        <h2>Mina chattar</h2>
        {loadingConversations ? (
          <p>Laddar konversationer...</p>
        ) : conversations?.length ? (
          conversations.map((conversation) => {
            const recipientId = conversation.participants.find(
              (id) => id !== currentUserId
            );

            if (!recipientId) return null;

            const recipientName = users[recipientId] || "Laddar...";
            return (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(recipientId)}
                className="chatItem"
              >
                {recipientName}
              </div>
            );
          })
        ) : (
          <p>Inga konversationer hittades.</p>
        )}
      </div>

      <div className="chatWindow">
        {activeConversation ? (
          <MessageWindow {...activeConversation} />
        ) : (
          <p>Välj en konversation från listan till vänster.</p>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
