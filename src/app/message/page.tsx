"use client";

import { useSearchParams } from "next/navigation";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import useGetMessages from "@/hooks/useGetMessages";
import useMessage from "@/hooks/useMessage";
import { NewMessage } from "@/types/message.types";
import useAuth from "@/hooks/useAuth";
import "./module.css";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

const MessageWindow: React.FC<{
  recipientId?: string;
  recipientName?: string;
}> = ({ recipientId: propRecipientId, recipientName: propRecipientName }) => {
  const searchParams = useSearchParams();
  const recipientId = propRecipientId || searchParams.get("recipientId");
  const recipientName = propRecipientName || searchParams.get("recipientName");
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { addMessage, generateConversationId } = useMessage();
  const { currentUser } = useAuth();

  const currentUserId = currentUser?.uid || null;
  const conversationId =
    currentUserId && recipientId
      ? generateConversationId(currentUserId, recipientId)
      : "";

  const { data: messages, loading } = useGetMessages();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewMessage>();

  const onSendMessage: SubmitHandler<NewMessage> = async (data) => {
    if (!recipientId) {
      setGeneralError("Mottagarens ID saknas.");
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
    } catch {
      setGeneralError("Något gick fel. Försök igen");
    }
  };

  if (!currentUserId || !recipientId) {
    return (
      <p>Kan inte visa chatten. Inloggad användare eller mottagar-ID saknas.</p>
    );
  }

  return (
    <Container fluid className="chat-container">
      {generalError && (
        <div role="alert" aria-live="assertive" className="alert alert-danger">
          {generalError}
        </div>
      )}

      <h3>Chatt med {recipientName}</h3>

      <Row>
        <Col className="content-container p-3">
          {loading ? (
            <div id="loader">
              <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="messages">
              {messages
                ?.filter((msg) => msg.conversationId === conversationId)
                .map((msg) => (
                  <div
                    key={msg._id}
                    className={`message mb-4 d-flex ${
                      msg.senderId === currentUserId
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`message-bubble mb-1 p-3 ${
                        msg.senderId === currentUserId ? "sent" : "received"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <Form
            onSubmit={handleSubmit(onSendMessage)}
            className="messageForm d-flex p-3 gap-3"
          >
            <Form.Control
              type="text"
              placeholder="Skriv ett meddelande..."
              {...register("message", { required: true })}
              isInvalid={!!errors.message}
            />

            <button type="submit" className="chat-btn">
              Skicka
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MessageWindow;
