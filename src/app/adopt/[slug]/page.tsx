"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useStreamDocument from "../../../hooks/useStreamDocument";
import { petsCol } from "@/services/firebase";
import { Container, Card, Carousel, Button } from "react-bootstrap";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { MoonLoader } from "react-spinners";

const PetDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { currentUser } = useAuth();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { data, loading } = useStreamDocument(petsCol, slug);

  const handleSendMessage = async (
    recipientId: string | null,
    recipientName: string | null
  ) => {
    try {
      if (recipientId && recipientName) {
        router.push(
          `/message?recipientId=${recipientId}&recipientName=${encodeURIComponent(
            recipientName
          )}`
        );
      }
    } catch {
      setGeneralError("Ett fel uppstod. Försök igen senare.");
    }
  };

  useEffect(() => {
    if (!data && !loading) {
      router.push("/404");
    }
  }, [data, loading, router]);

  return (
    <Container className="py-2">
      {loading ? (
        <div id="loader">
          <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        data && (
          <Card className="mb-3 card-slug-page">
            <Card.Body>
              {generalError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="alert alert-danger"
                >
                  {generalError}
                </div>
              )}

              {data.imageUrls?.length > 0 && (
                <div className="adopt-container d-flex justify-content-center mt-5 mb-5">
                  <Carousel
                    indicators={data.imageUrls.length > 1}
                    controls={data.imageUrls.length > 1}
                  >
                    {data.imageUrls.map((imageUrl, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          className="adopt-image"
                          src={imageUrl}
                          alt={`Bild ${index + 1}`}
                          width={320}
                          height={350}
                          priority
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}

              <Card.Title className="mt-4 pet-name">{data.name}</Card.Title>
              <div className="mt-4 pet-info">
                <div className="mb-3">
                  <strong>Ras:</strong> {data.breed}
                </div>
                <div className="mb-3">
                  <strong>Ålder:</strong> {data.age} år
                </div>
                <div className="mb-3">
                  <strong>Befinner sig i:</strong> {data.location}
                </div>
                <p>
                  <strong>Beskrivning:</strong> {data.description}
                </p>
                <p>
                  <strong>Ägare: </strong>
                  {data.author.displayName || data.author.email}
                </p>
              </div>

              <Button
                disabled={currentUser?.uid === data.author.uid}
                variant="primary"
                onClick={() =>
                  handleSendMessage(
                    data.author.uid,
                    data.author.displayName || data.author.email
                  )
                }
              >
                Skicka meddelande till ägaren
              </Button>
            </Card.Body>
          </Card>
        )
      )}
    </Container>
  );
};

export default PetDetails;
