"use client";

import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      await logout();
      await new Promise((r) => setTimeout(r, 1500));
      router.replace("/logIn");
    };
    logoutUser();
  }, [logout, router]);

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Logga ut</Card.Title>

              <Card.Text>Vänta medans du blir utloggad</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogOut;
