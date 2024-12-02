"use client";

import Pagination from "@/components/pagination";
import useAuth from "@/hooks/useAuth";
import useGetPets from "@/hooks/useGetPets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import { motion } from "framer-motion";

const Adopt = () => {
  const { currentUser } = useAuth();
  const { data, loading } = useGetPets();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex) || [];
  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <>
      <Container className="py-2 center-y">
        <h1 className="mt-2 mb-4">Adoptera</h1>
        {loading ? (
          <div id="loader">
            <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : paginatedData && paginatedData.length > 0 ? (
          <Row>
            {paginatedData.map((pet) => {
              console.log("pet.imageUrls:", pet.imageUrls);

              return (
                <Col
                  md={4}
                  key={pet._id}
                  className="mb-4 d-flex align-items-stretch"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-100"
                  >
                    <Card className="w-100">
                      <Link href={`/adopt/${pet._id}`}>
                        <Card.Img
                          variant="top"
                          src={
                            Array.isArray(pet.imageUrls) &&
                            pet.imageUrls.length > 0
                              ? pet.imageUrls[0]
                              : "/placeholder.jpg"
                          }
                          alt={pet.name}
                        />
                        <Card.Body>
                          <Card.Title>{pet.name}</Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>Inga djur tillgängliga för adoption just nu.</p>
        )}
      </Container>

      {totalPages > 1 && (
        <Pagination
          hasPreviousPage={currentPage > 1}
          hasNextPage={currentPage < totalPages}
          onNextPage={() => setCurrentPage((prevPage) => prevPage + 1)}
          onPreviousPage={() => setCurrentPage((prevPage) => prevPage - 1)}
          page={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Adopt;
