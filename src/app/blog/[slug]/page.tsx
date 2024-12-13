"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useStreamDocument from "../../../hooks/useStreamDocument";
import { blogCol } from "@/services/firebase";
import { Container, Card, Carousel } from "react-bootstrap";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import { MoonLoader } from "react-spinners";

const BlogDetails = () => {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, loading } = useStreamDocument(blogCol, slug);

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
          <Card.Body>
            <Card.Title className="mt-4 pet-name">{data.title}</Card.Title>

            <div className="mt-4 pet-info">
              <div className="mb-3">{data.text}</div>
              <div>{data.author}</div>
              <p>
                {data.created_at instanceof Timestamp
                  ? data.created_at.toDate().toLocaleString("sv-SE")
                  : "Okänt datum"}
              </p>
            </div>

            {data.imageUrls?.length > 0 && (
              <div className="adopt-container d-flex justify-content-center mt-5">
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
          </Card.Body>
        )
      )}
    </Container>
  );
};

export default BlogDetails;
