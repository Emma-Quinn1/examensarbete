"use client";

import { Card, Col, Container, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import useGetPosts from "@/hooks/useGetPosts";
import { motion } from "framer-motion";
import Link from "next/link";
import placeholder from "@/img/thumb-medium.png";
import { CustomPagination } from "../../components/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const Blog = () => {
  const { data, loading } = useGetPosts();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = 9;

  const goToPage = (pageNumber: number) => {
    router.push(`/blog?page=${pageNumber}`);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex) || [];
  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

  return (
    <>
      <Container className="py-2">
        <h1 className="mt-2 mb-4">Blogginlägg</h1>
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
                    <Card className="w-100">
                      <Link href={`/blog/${post._id}`}>
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
                        <Card.Body>
                          <Card.Title>{post.title}</Card.Title>
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
