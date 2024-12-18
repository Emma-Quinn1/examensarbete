"use client";

import { Card, Col, Container, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import useGetPosts from "@/hooks/useGetPosts";
import { motion } from "framer-motion";
import Link from "next/link";
import placeholder from "@/img/thumb-medium.png";
import { CustomPagination } from "../../components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Blog = () => {
  const { data, loading } = useGetPosts();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = 9;

  const goToPage = (pageNumber: number) => {
    try {
      router.push(`/blog?page=${pageNumber}`);
    } catch {
      setGeneralError("Ett fel uppstod vid sidbyte. Försök igen senare.");
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex) || [];
  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

  return (
    <>
      <Container className="py-2">
        <h1 className="mt-3 mb-2 fs-1 fw-light">Blogginlägg</h1>
        <p className="mb-3 fs-4 fw-light">
          Läs gärna olika blogginlägg från våra medlemar
        </p>
        {generalError && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-danger"
          >
            {generalError}
          </div>
        )}

        {loading ? (
          <div id="loader">
            <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : paginatedData && paginatedData.length > 0 ? (
          <Row>
            {paginatedData.map((post) => {
              return (
                <Col
                  md={4}
                  key={post._id}
                  className="mb-4 d-flex align-items-stretch"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-100"
                  >
                    <Card className="w-100 mt-4">
                      <Link
                        href={`/blog/${post._id}`}
                        className="text-decoration-none blogposts fw-light"
                      >
                        <Card.Img
                          variant="top"
                          src={
                            Array.isArray(post.imageUrls) &&
                            post.imageUrls.length > 0
                              ? post.imageUrls[0]
                              : placeholder.src
                          }
                          alt={post.title}
                        />
                        <Card.Body className="card-blog-page">
                          <Card.Title className="fs-5 fw-light">
                            {post.title}
                          </Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>Det finns inga blogginlägg ännu</p>
        )}
      </Container>

      {totalPages > 1 && (
        <CustomPagination
          total={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
      )}
    </>
  );
};

export default Blog;
