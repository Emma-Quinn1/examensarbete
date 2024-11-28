"use client";

import { useState } from "react";
import UploadImage from "../../components/uploadImage";
import usePet from "@/hooks/usePet";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPet } from "@/types/pet.types";

const Relocate = () => {
  const { addPet } = usePet();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewPet>({
    mode: "onBlur",
  });

  const animalTypes = ["Hund", "Katt", "Kanin", "Fågel", "Hamster", "Marsvin"];
  const locations = ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås"];

  const handleUpload = (file: File) => {
    setImageFile(file);
    setGeneralError(null);
  };

  const onAddPet: SubmitHandler<NewPet> = async (data) => {
    if (!imageFile) {
      setGeneralError("Du måste ladda upp en bild.");
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);
    setSuccessMessage(null);
    try {
      await addPet(data, imageFile);
      setSuccessMessage("Annons för omplacering skapad!");
      setImageFile(null);
      reset();
    } catch {
      setGeneralError("Ett fel uppstod. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Container className="py-3 center-y">
      <Row>
        <Col>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Omplacera</Card.Title>

              <Form
                onSubmit={handleSubmit(onAddPet)}
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

                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}

                <Form.Group controlId="type" className="mb-3">
                  <Form.Label>Vilket djur</Form.Label>
                  <Form.Select
                    {...register("type", {
                      required: "Du måste välja en typ av djur",
                    })}
                  >
                    <option value="">Välj typ av djur</option>
                    {animalTypes.map((animal) => (
                      <option key={animal} value={animal}>
                        {animal}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.type && (
                    <p className="invalid">
                      {errors.type.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Namn</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Skriv in djurets namn"
                    {...register("name", {
                      required: "Du måste ange djurets namn",
                      minLength: {
                        message: "Det måste minst vara 2 tecken",
                        value: 2,
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="invalid">
                      {errors.name.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="age" className="mb-3">
                  <Form.Label>Ålder</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Skriv in djurets ålder"
                    {...register("age", {
                      required: "Du måste ange ålder",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.age && (
                    <p className="invalid">
                      {errors.age.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Beskrivning</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Skriv en beskrivning"
                    {...register("description", {
                      required: "Du måste ange en beskrivning",
                    })}
                  />
                  {errors.description && (
                    <p className="invalid">
                      {errors.description.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="breed" className="mb-3">
                  <Form.Label>Ras</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vilken ras?"
                    {...register("breed", {
                      required: "Du måste ange en ras",
                    })}
                  />
                  {errors.breed && (
                    <p className="invalid">
                      {errors.breed.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="location" className="mb-3">
                  <Form.Label>Plats</Form.Label>
                  <Form.Select
                    {...register("location", {
                      required: "Du måste välja en plats",
                    })}
                  >
                    <option value="">Välj plats</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.location && (
                    <p className="invalid">
                      {errors.location.message || "Ogiltligt värde"}
                    </p>
                  )}
                </Form.Group>

                <UploadImage onUpload={handleUpload} />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Skapar" : "Lägg till djur"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Relocate;
