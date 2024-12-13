"use client";

import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { SignupCredentials } from "../../types/user.types";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignupCredentials>({
    mode: "onBlur",
  });
  const { signup } = useAuth();
  const router = useRouter();

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<SignupCredentials> = async (data) => {
    setIsSubmitting(true);
    setGeneralError(null);

    try {
      await signup(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setGeneralError(
          err.code === "auth/email-already-in-use"
            ? "E-posten används redan. Vänligen använd en annan."
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
              <Card.Title className="mb-3">Bli medlem</Card.Title>

              <Form
                onSubmit={handleSubmit(onSignup)}
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
                      required:
                        "Du måste ange ett lösenord för att kunna skapa ett konto",
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

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Bekräfta ditt lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    {...register("confirmPassword", {
                      required: "Skriv in samma lösenord för att bekräfta det",
                      minLength: {
                        message: "Det måste minst vara 6 tecken",
                        value: 6,
                      },
                      validate: (value) => {
                        return (
                          value === passwordRef.current ||
                          "Lösenorden matchar inte"
                        );
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="invalid">
                      {errors.confirmPassword.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Skapar konto" : "Skapa konto"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
