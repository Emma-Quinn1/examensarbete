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
import { UpdateProfileFormData } from "../../types/user.types";
import { FirebaseError } from "firebase/app";

const UpdateProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    setDisplayName,
    setEmail,
    setPassword,
    reloadUserData,
    userEmail,
    userName,
    userId,
  } = useAuth();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      email: userEmail ?? "",
      name: userName ?? "",
    },
  });

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (
    data
  ) => {
    if (!userId) {
      setGeneralError("Kunde inte hitta id");
    }
    try {
      setIsSubmitting(true);
      setGeneralError(null);
      setSuccessMessage(null);
      if (data.name !== (userName ?? "")) {
        await setDisplayName(data.name, userId!);
      }

      if (data.email !== (userEmail ?? "")) {
        await setEmail(data.email, userId!);
      }

      if (data.password) {
        await setPassword(data.password);
      }

      if (!reloadUserData()) {
        setGeneralError("Updated admin information could not be reloaded");
      }

      setSuccessMessage("Din profil har uppdaterats!");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setGeneralError(err.message);
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("Något gick fel. Försök att starta om och prova igen.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Update Profile</Card.Title>

              {generalError && (
                <div className="alert alert-danger" role="alert">
                  {generalError}
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <Form onSubmit={handleSubmit(onUpdateProfile)} className="mb-3">
                <Form.Group controlId="displayName" className="mb-3">
                  <Form.Label>Namn</Form.Label>
                  <Form.Control
                    placeholder="Namn"
                    type="text"
                    {...register("name", {
                      minLength: {
                        value: 2,
                        message: "Måste vara minst 2 tecken",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="invalid">
                      {errors.name.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

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
                      minLength: {
                        message: "Lösenordet måste bestå av minst 6 tecken",
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

                {watch("password") && (
                  <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Bekräfta lösenord</Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="off"
                      {...register("confirmPassword", {
                        minLength: {
                          message: "Lösenordet måste bestå av minst 6 tecken",
                          value: 6,
                        },
                        validate: (value) => {
                          return (
                            !passwordRef.current ||
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
                )}

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Updaterar profil" : "Spara"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
