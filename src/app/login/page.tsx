"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials } from "../../types/user.types";
import useAuth from "../../hooks/useAuth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>({
    mode: "onBlur",
  });
  const { login } = useAuth();
  const router = useRouter();

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
    setIsSubmitting(true);
    setGeneralError(null);

    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setGeneralError(
          err.code === "auth/invalid-credential"
            ? "E-posten eller lösenordet är fel"
            : "Ett fel uppstod. Försök igen senare."
        );
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Logga In</Card.Title>

              <Form
                onSubmit={handleSubmit(onLogin)}
                noValidate
                className="mb-3"
              >
                {generalError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="alert alert-danger"
                  >
                    {generalError}
                  </div>
                )}

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Epost</Form.Label>
                  <Form.Control
                    placeholder="exempel@email.com"
                    type="email"
                    {...register("email", {
                      required: "Du måste ange en epost adress",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Skriv in en gitligt epost-adress",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="invalid">
                      {errors.email.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Du måste ange ditt lösenord för att logga in",
                      minLength: {
                        message: "Det måste minst vara 6 tecken",
                        value: 6,
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="invalid">
                      {errors.password.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Loggar in" : "Logga in"}
                </Button>
              </Form>

              <div className="text-center">
                <Link href="logIn/forgotPassword">Glömt lösenord?</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
