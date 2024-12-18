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
      router.replace("/login");
    };
    logoutUser();
  }, [logout, router]);

  return (
    <div className="logout-page">
      <Container className="py-3 center-y">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="mt-5 logout-card">
              <Card.Body>
                <Card.Title className="mb-3 fs-4 w-100 d-block text-center mt-3 fs-2 fw-bold">
                  Logga ut
                </Card.Title>

                <Card.Text className="fs-5 w-100 d-block text-center mt-3 fs-5 fw-light">
                  Vänta medans du blir utloggad
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogOut;
