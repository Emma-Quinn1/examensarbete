"use client";

import { useSearchParams } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import useGetMessages from "@/hooks/useGetMessages";
import useMessage from "@/hooks/useMessage";
import { NewMessage } from "@/types/message.types";
import useAuth from "@/hooks/useAuth";
import "./module.css";

const MessageWindow: React.FC<{
  recipientId?: string;
  recipientName?: string;
}> = ({ recipientId: propRecipientId, recipientName: propRecipientName }) => {
  const searchParams = useSearchParams();
  const recipientId = propRecipientId || searchParams.get("recipientId");
  const recipientName = propRecipientName || searchParams.get("recipientName");

  const { addMessage, generateConversationId } = useMessage();
  const { currentUser } = useAuth();

  const currentUserId = currentUser?.uid || null;
  const conversationId =
    currentUserId && recipientId
      ? generateConversationId(currentUserId, recipientId)
      : "";

  const { data: messages, loading } = useGetMessages(conversationId);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewMessage>();

  const onSendMessage: SubmitHandler<NewMessage> = async (data) => {
    if (!recipientId) {
      console.error("Mottagarens ID saknas.");
      return;
    }

    try {
      const newMessage: NewMessage = {
        ...data,
        recipientId: recipientId,
        conversationId,
      };

      await addMessage(newMessage);
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!currentUserId || !recipientId) {
    return (
      <p>Kan inte visa chatten. Inloggad användare eller mottagar-ID saknas.</p>
    );
  }

  return (
    <div className="chatContainer">
      <h1>Chatt med {recipientName}</h1>

      {loading ? (
        <p>Laddar meddelanden...</p>
      ) : (
        <div className="messages">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.senderId === currentUserId ? "sent" : "received"
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      <Form onSubmit={handleSubmit(onSendMessage)} className="messageForm">
        <Form.Control
          type="text"
          placeholder="Skriv ett meddelande..."
          {...register("message", { required: true })}
          isInvalid={!!errors.message}
        />
        <Button type="submit">Skicka</Button>
      </Form>
    </div>
  );
};

export default MessageWindow;
