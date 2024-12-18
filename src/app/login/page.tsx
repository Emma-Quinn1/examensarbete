"use client";

import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials } from "../../types/User.types";
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
      router.replace("/dashboard");
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
    <div className="login-page d-flex justify-content-center align-items-center">
      <Container className="py-3 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={{ span: 4, offset: 4 }}>
            <Card className="text-center p-4 login-card">
              <Card.Body>
                <Card.Title className="mb-3 fs-2 fw-bold mt-2">
                  Logga in
                </Card.Title>
                <Form onSubmit={handleSubmit(onLogin)} noValidate>
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
                    <Form.Control
                      autoComplete="email"
                      placeholder="exempel@email.com"
                      type="email"
                      className="mt-4 form-control-login fs-6 fw-lighter"
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
                    <Form.Control
                      className="form-control-login fs-6 fw-lighter"
                      type="password"
                      placeholder="lösenord"
                      autoComplete="new-password"
                      {...register("password", {
                        required:
                          "Du måste ange ditt lösenord för att logga in",
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

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="login-btn p-2 mt-3 fs-6 fw-light"
                  >
                    {isSubmitting ? "Loggar in..." : "Logga in"}
                  </button>
                </Form>

                <div className="text-center mt-5">
                  <Link
                    href="login/forgotPassword"
                    className="forgot-password-link fs-6 fw-lighter"
                  >
                    Glömt ditt lösenord?
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
