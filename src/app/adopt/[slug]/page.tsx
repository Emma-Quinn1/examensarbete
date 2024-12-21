"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useGetDocument from "../../../hooks/useGetDocument";
import { petsCol } from "@/services/firebase";
import { Container, Card, Carousel, Row, Col } from "react-bootstrap";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { MoonLoader } from "react-spinners";
import { FaPaw, FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const PetDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { currentUser } = useAuth();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { data, loading } = useGetDocument(petsCol, slug);

  const handleSendMessage = async (
    recipientId: string | null,
    recipientName: string | null | undefined
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
    <Container fluid className="py-3">
      {loading ? (
        <div id="loader" className="text-center">
          <MoonLoader color={"#888"} size={50} speedMultiplier={1.1} />
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        data && (
          <Card className="shadow border-0 login-card mt-3 mb-3 mx-lg-4 mx-xl-4 pe-lg-4 pe-xl-4 slug-adopt-page">
            <Row className="align-items-center">
              <Col lg={5} className="text-center">
                {data.imageUrls?.length > 0 && (
                  <Carousel
                    indicators={data.imageUrls.length > 1}
                    controls={data.imageUrls.length > 1}
                    className="mt-5 mt-lg-0 mt-xl-0"
                  >
                    {data.imageUrls.map((imageUrl, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          className="adopt-image"
                          src={imageUrl}
                          alt={`Bild ${index + 1}`}
                          width={400}
                          height={450}
                          priority
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </Col>

              <Col lg={7}>
                {generalError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="alert alert-danger"
                  >
                    {generalError}
                  </div>
                )}
                <h2 className="fw-bold mb-3 fs-2 mt-5 ps-3 ps-lg-0 ps-xl-0">
                  {data.name}
                </h2>
                <p className="mb-3 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaPaw className="me-2 text-secondary" />
                  <strong>Djur:</strong> {data.type}
                </p>
                <p className="mb-3 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaPaw className="me-2 text-secondary" />
                  <strong>Ras:</strong> {data.breed}
                </p>
                <p className="mb-3 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaCalendarAlt className="me-2 text-secondary" />
                  <strong>Ålder:</strong> {data.age} år
                </p>
                <p className="mb-3 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaMapMarkerAlt className="me-2 text-secondary" />
                  <strong>Befinner sig i:</strong> {data.location}
                </p>
                <p className="mb-5 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaUser className="me-2 text-secondary" />
                  <strong>Ägare:</strong>{" "}
                  {data.author.displayName || data.author.email}
                </p>
                <p className="mb-2 mt-2 fs-5 lh-base ps-3 ps-lg-0 ps-xl-0">
                  <strong>Beskrivning:</strong> {data.description}
                </p>

                <button
                  disabled={currentUser?.uid === data.author.uid}
                  className="p-2 mt-3 fs-5 msg-to-author-btn mb-5 d-block mx-auto d-sm-inline-block"
                  onClick={() =>
                    handleSendMessage(
                      data.author.uid,
                      data.author.displayName || data.author.email
                    )
                  }
                >
                  Skicka meddelande till ägaren
                </button>
              </Col>
            </Row>
          </Card>
        )
      )}
    </Container>
  );
};

export default PetDetails;
