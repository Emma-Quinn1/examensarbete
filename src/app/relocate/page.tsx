"use client";

import { useState } from "react";
import UploadImage from "../../components/uploadImage";
import usePet from "@/hooks/usePet";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Breed, NewPet } from "@/types/pet.types";
import useGetBreed from "@/hooks/useGetBreed";
import useGetType from "@/hooks/useGetType";
import useGetLocations from "@/hooks/useGetLocations";

const Relocate = () => {
  const { addPet } = usePet();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredBreeds, setFilteredBreeds] = useState<
    Breed[] | null | undefined
  >(null);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewPet>({
    mode: "onBlur",
  });

  const selectedType = watch("type");

  const { data: breeds } = useGetBreed();

  const { data: animalTypes } = useGetType();

  const { data: locations } = useGetLocations();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilteredBreeds = breeds?.filter(
      (breed) => breed.type === e.target.value
    );

    setFilteredBreeds(newFilteredBreeds);
  };

  const handleUpload = (files: File[]) => {
    if (!files.length) {
      setGeneralError("Du måste ladda upp minst en bild.");
      return;
    }
    setImageFiles(files);
    setGeneralError(null);
  };

  const onAddPet: SubmitHandler<NewPet> = async (data) => {
    if (data.type === "Annat") {
      data.breed = null;
    }

    if (!imageFiles.length) {
      setGeneralError("Du måste ladda upp minst en bild.");
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);
    setSuccessMessage(null);
    try {
      await addPet(data, imageFiles);
      setSuccessMessage("Annons för omplacering skapad!");
      setImageFiles([]);
      reset();
    } catch {
      setGeneralError("Ett fel uppstod. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relocate-page d-flex justify-content-center align-items-center">
      <Container className="py-3 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col>
            <Card className="mb-3 relocate-card">
              <Card.Body>
                <Card.Title className="mb-3 fs-2 fw-bold mt-2 border-bottom border-secondary-subtle pb-2">
                  Omplacera
                </Card.Title>

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
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Vilket djur
                    </Form.Label>
                    <Form.Select
                      {...register("type", {
                        required: "Du måste välja ett djur",
                      })}
                      onChange={handleTypeChange}
                      className="fs-6 fw-lighter"
                    >
                      <option value="">Välj typ av djur</option>
                      {animalTypes &&
                        animalTypes.map((animal) => (
                          <option
                            key={animal._id}
                            value={animal.type}
                            className="fs-6 fw-lighter"
                          >
                            {animal.type}
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
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Namn
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="fs-6 fw-lighter"
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
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Ålder
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="fs-6 fw-lighter"
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
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Beskrivning
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className="fs-6 fw-lighter"
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
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Ras
                    </Form.Label>
                    <Form.Select
                      className="fs-6 fw-lighter"
                      {...register("breed", {
                        required:
                          selectedType !== "Annat"
                            ? "Du måste välja en ras"
                            : false,
                      })}
                      disabled={
                        selectedType === "Annat" ||
                        !filteredBreeds ||
                        filteredBreeds.length === 0
                      }
                    >
                      <option value="">Välj ras</option>
                      {filteredBreeds &&
                        filteredBreeds.map((breed) => (
                          <option
                            key={breed._id}
                            value={breed.name}
                            className="fs-6 fw-lighter"
                          >
                            {breed.name}
                          </option>
                        ))}
                    </Form.Select>

                    {errors.breed && (
                      <p className="invalid">
                        {errors.breed.message || "Ogiltligt värde"}
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group controlId="location" className="mb-3">
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Plats
                    </Form.Label>
                    <Form.Select
                      className="fs-6 fw-lighter"
                      {...register("location", {
                        required: "Du måste välja en plats",
                      })}
                    >
                      <option value="">Välj plats</option>
                      {locations &&
                        locations.map((loc) => (
                          <option
                            key={loc._id}
                            value={loc.name}
                            className="fs-6 fw-lighter"
                          >
                            {loc.name}
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

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="relocate-btn p-3 mt-3"
                  >
                    {isSubmitting
                      ? "Skapar omplacering..."
                      : "Skapa omplacering"}
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

export default Relocate;
