"use client";

import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { ForgotPasswordCredentials } from "../../../types/user.types";

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordCredentials>();
  const { resetPassword } = useAuth();

  const onForgotPassword: SubmitHandler<ForgotPasswordCredentials> = async (
    data
  ) => {
    setIsSubmitting(true);
    try {
      await resetPassword(data.email);
      setResetPasswordSent(true);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setGeneralError(
          err.code === "auth/invalid-credential"
            ? "E-posten eller lösenordet är fel"
            : "Ett fel uppstod. Försök igen senare."
        );
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="forgot-password-page d-flex justify-content-center align-items-center">
      <Container className="py-3 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="mb-3 forgot-password-card p-4 text-center">
              <Card.Body>
                <Card.Title className="mb-3 fs-4 fw-bold mt-2">
                  Glömt ditt lösenord?
                </Card.Title>

                {generalError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="alert alert-danger"
                  >
                    {generalError}
                  </div>
                )}

                {resetPasswordSent && (
                  <Alert variant="success">
                    <p>
                      Vi har skickar en länk för att återställa ditt lösenord
                      till den angivna epostadressen. Kolla gärna i skäpposten
                      om du inte fått ett email inom några minuter.
                    </p>
                  </Alert>
                )}

                <p className="mt-2 w-100 d-block text-center fs-6">
                  Skriv in din epostadress för att få en återställningslänk
                </p>

                <Form
                  onSubmit={handleSubmit(onForgotPassword)}
                  className="mb-3"
                >
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Control
                      className="form-control-login"
                      placeholder="Exempel@email.com"
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

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="forgot-password-btn p-2 mt-3"
                  >
                    {isSubmitting ? "Skickar länk" : "Skicka länk"}
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
