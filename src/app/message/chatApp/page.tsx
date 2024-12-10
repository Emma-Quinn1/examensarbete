"use client";

import { useState } from "react";
import { Nav, Container, Row, Col } from "react-bootstrap";
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

  const userConversations =
    conversations?.filter((conversation) =>
      currentUserId ? conversation.participants.includes(currentUserId) : false
    ) || [];

  const uniqueConversations = Array.from(
    new Map(userConversations.map((conv) => [conv._id, conv])).values()
  );

  const handleSelectConversation = (recipientId: string) => {
    const recipientName = users[recipientId] || "Laddar...";
    setActiveConversation({ recipientId, recipientName });
  };

  return (
    <Container fluid className="chat-container">
      <Row className="align-items-center header-container p-3">
        <Col md={3} className="text-center">
          <h5>Mina Chattar</h5>
        </Col>
      </Row>

      <Row>
        <Col md={3} className="left-column">
          <Nav className="flex-column mt-3 mb-3">
            {loadingConversations ? (
              <Nav.Link className="chat-links" disabled>
                Laddar konversationer...
              </Nav.Link>
            ) : uniqueConversations.length ? (
              uniqueConversations.map((conversation) => {
                const recipientId = conversation.participants.find(
                  (id) => id !== currentUserId
                );

                if (!recipientId) return null;

                const recipientName = users[recipientId] || "Laddar...";
                return (
                  <Nav.Link
                    className="chat-links"
                    key={conversation._id}
                    onClick={() => handleSelectConversation(recipientId)}
                  >
                    {recipientName}
                  </Nav.Link>
                );
              })
            ) : (
              <Nav.Link disabled>Inga konversationer hittades</Nav.Link>
            )}
          </Nav>
        </Col>

        <Col md={9} className="bg-light p-3">
          {activeConversation && <MessageWindow {...activeConversation} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;
