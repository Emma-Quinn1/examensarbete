"use client";

import UploadImage from "@/components/uploadImage";
import useBlog from "@/hooks/useBlog";
import { NewPost } from "@/types/blog.types";
import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

const CreateBlogPost = () => {
  const { addPost } = useBlog();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewPost>({
    mode: "onBlur",
  });

  const handleUpload = (files: File[]) => {
    if (!files.length) {
      setGeneralError("Du måste ladda upp minst en bild.");
      return;
    }
    setImageFiles(files);
    setGeneralError(null);
  };

  const onCreatePost: SubmitHandler<NewPost> = async (data) => {
    setIsSubmitting(true);
    setGeneralError(null);
    setSuccessMessage(null);
    try {
      await addPost(data, imageFiles);
      setSuccessMessage("Blogginlägg skapat!");
      setImageFiles([]);
      reset();
    } catch {
      setGeneralError("Ett fel uppstod. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="blog-page d-flex justify-content-center align-items-center">
      <Container className="py-3 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col>
            <Card className="mb-3 blog-card p-3">
              <Card.Body>
                <Card.Title className="mb-3 fs-3 fw-bold mt-2 border-bottom border-secondary-subtle pb-2">
                  Skapa blogginlägg
                </Card.Title>

                <Form
                  onSubmit={handleSubmit(onCreatePost)}
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

                  <Form.Group controlId="title" className="mb-3">
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Rubrik
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="fs-6 fw-lighter"
                      placeholder="Skriv in en rubrik till ditt blogginlägg"
                      {...register("title", {
                        required: "Du måste ange en rubrik",
                        minLength: {
                          message: "Det måste minst vara 2 tecken",
                          value: 2,
                        },
                      })}
                    />
                    {errors.title && (
                      <p className="invalid">
                        {errors.title.message || "Ogiltligt värde"}
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group controlId="text" className="mb-3">
                    <Form.Label className="fs-5 fw-lighter mt-2">
                      Brödtext
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className="fs-6 fw-lighter"
                      placeholder="Skriv in din brödtext"
                      {...register("text", {
                        required: "Du måste skriva en brödtext",
                        minLength: {
                          message: "Det måste minst vara 10 tecken",
                          value: 10,
                        },
                      })}
                    />
                    {errors.text && (
                      <p className="invalid">
                        {errors.text.message || "Ogiltligt värde"}
                      </p>
                    )}
                  </Form.Group>

                  <UploadImage onUpload={handleUpload} />

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="blog-btn p-2 mt-3"
                  >
                    {isSubmitting ? "Skapar inlägg" : "Skapa inlägg"}
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

export default CreateBlogPost;
