"use client";

import { useState } from "react";
import { Nav, Container, Row, Col } from "react-bootstrap";
import useGetConversations from "@/hooks/useGetConversations";
import useAuth from "@/hooks/useAuth";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const ChatApp = () => {
  const [generalError, setGeneralError] = useState<string | null>(null);

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

  const router = useRouter();

  const handleSelectConversation = (recipientId: string) => {
    try {
      const recipientName = users[recipientId] || "Laddar...";

      router.push(
        `/message?recipientId=${recipientId}&recipientName=${recipientName}`
      );
    } catch {
      setGeneralError("Något gick fel. Kunde inte ladda mottagare");
    }
  };

  return (
    <Container fluid className="chat-container">
      <Row className="align-items-center header-container p-3">
        {generalError && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-danger"
          >
            {generalError}
          </div>
        )}

        <Col md={3} className="text-center">
          <h5 className="fw-light fs-4">Mina Chattar</h5>
        </Col>
      </Row>

      <Row>
        <Col md={3} className="left-column border-end border-secondary-subtle">
          <button
            onClick={() => router.push("/adopt")}
            className="chat-btn p-2 rounded mt-4 mb-2 ms-3"
          >
            <FaArrowLeft className="me-2" />
            Till adoptivsidan
          </button>

          <Nav className="flex-column mt-3 mb-3">
            {loadingConversations ? (
              <div id="loader">
                <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : uniqueConversations.length ? (
              uniqueConversations.map((conversation) => {
                const recipientId = conversation.participants.find(
                  (id) => id !== currentUserId
                );

                if (!recipientId) return null;

                const recipientName = users[recipientId] || "Laddar...";
                return (
                  <Nav.Link
                    className="chat-links text-decoration-none text-center border-top border-secondary-subtle border-bottom fw-light fs-5"
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

        <Col
          md={9}
          className="chat-page d-flex align-items-center justify-content-center p-3"
        >
          <p className="fw-light fs-4">
            Välj en konversation för att börja chatta.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;
