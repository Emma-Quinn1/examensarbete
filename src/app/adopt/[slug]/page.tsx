"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useStreamDocument from "../../../hooks/useStreamDocument";
import { petsCol } from "@/services/firebase";
import { Container, Card, Carousel } from "react-bootstrap";
import Image from "next/image";

const PetDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, loading } = useStreamDocument(petsCol, slug);

  useEffect(() => {
    if (!data && !loading) {
      router.push("/404");
    }
  }, [data, loading, router]);

  return (
    <Container className="py-2">
      {data && (
        <Card.Body>
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
          </div>

          {data.imageUrls?.length > 0 && (
            <div className="container d-flex justify-content-center mt-5">
              <Carousel>
                {data.imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={imageUrl}
                      alt={`Bild ${index + 1}`}
                      width={320}
                      height={350}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          )}
        </Card.Body>
      )}
    </Container>
  );
};

export default PetDetails;
