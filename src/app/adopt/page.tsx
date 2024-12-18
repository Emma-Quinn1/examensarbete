"use client";

import useAuth from "@/hooks/useAuth";
import useGetPets from "@/hooks/useGetPets";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import { motion } from "framer-motion";
import useGetType from "@/hooks/useGetType";
import { MultiValue } from "react-select";
import { OptionType } from "@/types/Pet.types";
import Select from "react-select";
import { CustomPagination } from "@/components/Pagination";

const Adopt = () => {
  const { currentUser } = useAuth();
  const { data, loading } = useGetPets();
  const { data: animalTypes } = useGetType();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = 9;

  const goToPage = (pageNumber: number) => {
    try {
      router.push(`/adopt?page=${pageNumber}`);
    } catch {
      setGeneralError("Ett fel uppstod vid sidbyte. Försök igen senare.");
    }
  };
  const [selectedTypes, setSelectedTypes] = useState<OptionType[]>([]);

  const handleTypeChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedTypes(selectedOptions as OptionType[]);
  };

  const animalTypeOptions =
    animalTypes?.map((animal) => ({
      value: animal.type,
      label: animal.type,
    })) || [];

  const filteredData = data?.filter((animal) => {
    return selectedTypes.length > 0
      ? selectedTypes.some((type) => type.value === animal.type)
      : true;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData?.slice(startIndex, endIndex) || [];
  const totalPages = filteredData
    ? Math.ceil(filteredData.length / pageSize)
    : 0;

  useEffect(() => {
    if (!currentUser) {
      router.push("/logIn");
    }
  }, [currentUser, router]);

  return (
    <>
      <Container className="py-2 center-y">
        <h1 className="mt-2 mb-2 fs-1 fw-light">Adoptera</h1>

        {generalError && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-danger"
          >
            {generalError}
          </div>
        )}

        <div className="mb-4">
          <label className="mt-1 mb-2 fs-6 fw-light">
            Filtrera efter djurtyp
          </label>
          <Select
            classNamePrefix="my-select"
            isMulti
            value={selectedTypes}
            options={animalTypeOptions}
            onChange={handleTypeChange}
            placeholder="Välj djurtyper"
            className="fs-6 fw-lighter"
          />
        </div>

        {loading ? (
          <div id="loader">
            <MoonLoader color={"#888"} size={25} speedMultiplier={1.1} />
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : paginatedData && paginatedData.length > 0 ? (
          <Row>
            {paginatedData.map((pet) => {
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
                    <Card className="w-100 mt-4">
                      <Link
                        href={`/adopt/${pet._id}`}
                        className="text-decoration-none pets fw-light"
                      >
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
                        <Card.Body className="card-adopt-page">
                          <Card.Title className="fs-3 fw-light">
                            {pet.name}
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
          <p className="mt-2 mb-2 fs-1 fw-light">
            Inga djur tillgängliga för adoption just nu.
          </p>
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

export default Adopt;
