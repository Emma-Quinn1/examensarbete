"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useStreamDocument from "../../../hooks/useStreamDocument";
import { blogCol } from "@/services/firebase";
import { Container, Card, Carousel, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

const BlogDetails = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { data, loading } = useStreamDocument(blogCol, slug);

  useEffect(() => {
    if (!loading) {
      if (!data) {
        setGeneralError("Artikeln hittades inte. Försök igen senare.");
      }
    }
  }, [data, loading]);

  return (
    <Container fluid className="py-3">
      {loading ? (
        <div id="loader" className="text-center">
          <MoonLoader color={"#888"} size={50} speedMultiplier={1.1} />
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        data && (
          <Card className="shadow border-0 login-card mt-3 mb-3 mx-lg-4 mx-xl-4 pe-lg-2 slug-blog-page">
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
                <h2 className="fw-bold mb-3 fs-2 mt-5 ps-lg-0 ps-xl-0">
                  {data.title}
                </h2>
                <p className="mb-3 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaCalendarAlt className="me-2 text-secondary" />
                  <strong>Datum:</strong>&nbsp;
                  {data.created_at instanceof Timestamp
                    ? data.created_at.toDate().toLocaleString("sv-SE")
                    : "Okänt datum"}
                </p>

                <p className="mb-5 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  <FaUser className="me-2 text-secondary" />
                  <strong>Författare:</strong> {data.author}
                </p>

                <p className="mb-5 mt-2 fs-5 ps-3 ps-lg-0 ps-xl-0">
                  {data.text}
                </p>

                <div className="d-flex justify-content-center mb-5 mt-5">
                  <Link
                    href="/blog"
                    className="signUp-btn text-decoration-none btn mb-5 fw-semibold p-2 mt-5"
                    role="button"
                  >
                    Tillbaka till bloggen
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        )
      )}
    </Container>
  );
};

export default BlogDetails;
